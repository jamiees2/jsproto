import {Writer, util} from 'protobufjs';
import type {BinaryWriter, Message} from 'google-protobuf';

import * as BinaryConstants from './constants';
import type {
  ByteSource,
  AnyFieldType,
  SplitReverseConverter,
  BinaryWriteCallback,
  BinaryWriteValue,
  SplitType,
} from './types';
import {byteSourceToUint8Array} from './util';

const writeSerialized = (
  bytes: Uint8Array,
  buf: Uint8Array,
  pos: number
): void => {
  for (let i = 0; i < bytes.length; i++) {
    buf[pos++] = bytes[i];
  }
};

declare module 'protobufjs' {
  interface Writer {
    _push<T>(
      fn: (val: T, buf: Uint8Array, pos: number) => void,
      len: number,
      val: T
    ): Writer;
  }
}

export default class ProtoWriter implements BinaryWriter {
  private writer: Writer;
  private finishedWrite: Uint8Array | null;

  constructor() {
    this.writer = Writer.create();
    this.finishedWrite = null;
  }

  writeSerializedMessage(bytes: Uint8Array, start: number, end: number): void {
    const bytesSub = bytes.subarray(start, end);
    this.writer._push(writeSerialized, bytesSub.length, bytesSub);
  }

  maybeWriteSerializedMessage(
    bytes?: Uint8Array,
    start?: number,
    end?: number
  ): void {
    if (bytes && start && end) {
      this.writeSerializedMessage(bytes, start, end);
    }
  }

  reset(): void {
    this.writer = Writer.create();
  }

  getResultBuffer(): Uint8Array {
    if (this.finishedWrite === null) {
      this.finishedWrite = this.writer.finish();
      this.writer = Writer.create();
    }
    return this.finishedWrite;
  }

  getResultBase64String(): string {
    const buf = this.getResultBuffer();
    return util.base64.encode(buf, 0, buf.length);
  }

  beginSubMessage(field: number): void {
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
  }

  endSubMessage(): void {
    this.writer.ldelim();
  }

  writeFieldHeader_(field: number, wireType: BinaryConstants.WireType): void {
    const x = (field << 3) | wireType;
    this.writer.uint32(x);
  }

  writeAny(
    fieldType: BinaryConstants.FieldType,
    field: number,
    value: AnyFieldType
  ): void {
    const fieldTypes = BinaryConstants.FieldType;
    switch (fieldType) {
      case fieldTypes.DOUBLE:
        this.writeDouble(field, value as number);
        return;
      case fieldTypes.FLOAT:
        this.writeFloat(field, value as number);
        return;
      case fieldTypes.INT64:
        this.writeInt64(field, value as number);
        return;
      case fieldTypes.UINT64:
        this.writeUint64(field, value as number);
        return;
      case fieldTypes.INT32:
        this.writeInt32(field, value as number);
        return;
      case fieldTypes.FIXED64:
        this.writeFixed64(field, value as number);
        return;
      case fieldTypes.FIXED32:
        this.writeFixed32(field, value as number);
        return;
      case fieldTypes.BOOL:
        this.writeBool(field, value as boolean);
        return;
      case fieldTypes.STRING:
        this.writeString(field, value as string);
        return;
      case fieldTypes.GROUP:
        throw new Error('Group field type not supported in writeAny()');
      case fieldTypes.MESSAGE:
        throw new Error('Message field type not supported in writeAny()');
      case fieldTypes.BYTES:
        this.writeBytes(field, value as Uint8Array);
        return;
      case fieldTypes.UINT32:
        this.writeUint32(field, value as number);
        return;
      case fieldTypes.ENUM:
        this.writeEnum(field, value as number);
        return;
      case fieldTypes.SFIXED32:
        this.writeSfixed32(field, value as number);
        return;
      case fieldTypes.SFIXED64:
        this.writeSfixed64(field, value as number);
        return;
      case fieldTypes.SINT32:
        this.writeSint32(field, value as number);
        return;
      case fieldTypes.SINT64:
        this.writeSint64(field, value as number);
        return;
      case fieldTypes.FHASH64:
        this.writeFixedHash64(field, value as string);
        return;
      case fieldTypes.VHASH64:
        this.writeVarintHash64(field, value as string);
        return;
      default:
        throw new Error('Invalid field type in writeAny()');
    }
  }

  writeUnsignedVarint32_(field: number, value?: number): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this.writer.uint32(value);
  }

  writeSignedVarint32_(field: number, value?: number): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this.writer.int32(value);
  }

  writeUnsignedVarint64_(field: number, value?: number): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this.writer.uint64(value);
  }

  writeSignedVarint64_(field: number, value?: number): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this.writer.int64(value);
  }

  writeZigzagVarint32_(field: number, value?: number): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this.writer.sint32(value);
  }

  writeZigzagVarint64_(field: number, value?: number): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this.writer.sint64(value);
  }

  writeZigzagVarint64String_(field: number, value?: string): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this.writer.sint64(value);
  }

  writeZigzagVarintHash64_(field: number, value?: string): void {
    if (!value) return;
    const long = util.longFromHash(value);
    this.writer.sint64(long);
  }

  writeInt32(field: number, value?: number): void {
    if (!value) return;
    this.writeSignedVarint32_(field, value);
  }

  writeInt32String(field: number, value?: string): void {
    if (!value) return;
    const intValue = parseInt(value, 10);
    this.writeSignedVarint32_(field, intValue);
  }

  writeInt64(field: number, value?: number): void {
    if (!value) return;
    this.writeSignedVarint64_(field, value);
  }

  writeInt64String(field: number, value?: string): void {
    if (!value) return;
    const intValue = parseInt(value, 10);
    this.writeSignedVarint64_(field, intValue);
  }

  writeUint32(field: number, value?: number): void {
    if (!value) return;
    this.writeUnsignedVarint32_(field, value);
  }

  writeUint32String(field: number, value?: string): void {
    if (!value) return;
    const intValue = parseInt(value, 10);
    this.writeUnsignedVarint32_(field, intValue);
  }

  writeUint64(field: number, value?: number): void {
    if (!value) return;
    this.writeUnsignedVarint64_(field, value);
  }

  writeUint64String(field: number, value?: string): void {
    if (!value) return;
    const intValue = parseInt(value, 10);
    this.writeSignedVarint64_(field, intValue);
  }

  writeSint32(field: number, value?: number): void {
    if (!value) return;
    this.writeZigzagVarint32_(field, value);
  }

  writeSint64(field: number, value?: number): void {
    if (!value) return;
    this.writeZigzagVarint64_(field, value);
  }

  writeSintHash64(field: number, value?: string): void {
    if (!value) return;
    this.writeZigzagVarintHash64_(field, value);
  }

  writeSint64String(field: number, value?: string): void {
    if (!value) return;
    this.writeZigzagVarint64String_(field, value);
  }

  writeFixed32(field: number, value?: number): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED32);
    this.writer.fixed32(value);
  }

  writeFixed64(field: number, value?: number): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
    this.writer.fixed64(value);
  }

  writeFixed64String(field: number, value?: string): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
    this.writer.fixed64(value);
  }

  writeSfixed32(field: number, value?: number): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED32);
    this.writer.sfixed32(value);
  }

  writeSfixed64(field: number, value?: number): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
    this.writer.sfixed64(value);
  }

  writeSfixed64String(field: number, value?: string): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
    this.writer.sfixed64(value);
  }

  writeFloat(field: number, value?: number): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED32);
    this.writer.float(value);
  }

  writeDouble(field: number, value?: number): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
    this.writer.double(value);
  }

  writeBool(field: number, value?: boolean): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this.writer.bool(value);
  }

  writeEnum(field: number, value?: number): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this.writer.int32(value);
  }

  writeString(field: number, value?: string): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.string(value);
  }

  writeBytes(field: number, value?: ByteSource): void {
    if (!value) return;
    const bytes = byteSourceToUint8Array(value);
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.bytes(bytes);
  }

  writeMessage(
    field: number,
    value: BinaryWriteValue,
    writerCallback: BinaryWriteCallback
  ): void {
    if (!value) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    writerCallback(value, this);
    this.writer.ldelim();
  }

  writeMessageSet(
    _field: number,
    _value: BinaryWriteValue,
    _writerCallback: BinaryWriteCallback
  ): void {
    // Deprecated since proto1
    throw new Error('not supported');
  }

  writeGroup(
    _field: number,
    _value: BinaryWriteValue,
    _writerCallback: BinaryWriteCallback
  ): void {
    // Deprecated since proto1
    throw new Error('not supported');
  }

  writeFixedHash64(field: number, value?: string): void {
    if (!value) return;
    const long = util.longFromHash(value);
    this.writer.fixed64(long);
  }

  writeVarintHash64(field: number, value?: string): void {
    if (!value) return;
    const long = util.longFromHash(value);
    this.writer.uint64(long);
  }

  writeSplitFixed64(field: number, lowBits: number, highBits: number): void {
    const long = new util.LongBits(lowBits, highBits);
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
    this.writer.fixed64(long.toLong());
  }

  writeSplitVarint64(field: number, lowBits: number, highBits: number): void {
    const long = new util.LongBits(lowBits, highBits);
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this.writer.uint64(long.toLong());
  }

  writeSplitZigzagVarint64(
    field: number,
    lowBits: number,
    highBits: number
  ): void {
    const long = new util.LongBits(lowBits, highBits);
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this.writer.sint64(long.toLong());
  }

  writeRepeatedInt32(field: number, value?: number[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeSignedVarint32_(field, value[i]);
  }

  writeRepeatedInt32String(field: number, value?: string[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeInt32String(field, value[i]);
  }

  writeRepeatedInt64(field: number, value?: number[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeSignedVarint64_(field, value[i]);
  }

  writeRepeatedSplitFixed64(
    field: number,
    value: SplitType[],
    lo: SplitReverseConverter,
    hi: SplitReverseConverter
  ): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeSplitFixed64(field, lo(value[i]), hi(value[i]));
  }

  writeRepeatedSplitVarint64(
    field: number,
    value: SplitType[],
    lo: SplitReverseConverter,
    hi: SplitReverseConverter
  ): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeSplitVarint64(field, lo(value[i]), hi(value[i]));
  }

  writeRepeatedSplitZigzagVarint64(
    field: number,
    value: SplitType[],
    lo: SplitReverseConverter,
    hi: SplitReverseConverter
  ): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeSplitZigzagVarint64(field, lo(value[i]), hi(value[i]));
  }

  writeRepeatedInt64String(field: number, value?: string[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeInt64String(field, value[i]);
  }

  writeRepeatedUint32(field: number, value?: number[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeUnsignedVarint32_(field, value[i]);
  }

  writeRepeatedUint32String(field: number, value?: string[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeUint32String(field, value[i]);
  }

  writeRepeatedUint64(field: number, value?: number[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeUnsignedVarint64_(field, value[i]);
  }

  writeRepeatedUint64String(field: number, value?: string[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeUint64String(field, value[i]);
  }

  writeRepeatedSint32(field: number, value?: number[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeZigzagVarint32_(field, value[i]);
  }

  writeRepeatedSint64(field: number, value?: number[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeZigzagVarint64_(field, value[i]);
  }

  writeRepeatedSint64String(field: number, value?: string[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeZigzagVarint64String_(field, value[i]);
  }

  writeRepeatedSintHash64(field: number, value?: string[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeZigzagVarintHash64_(field, value[i]);
  }

  writeRepeatedFixed32(field: number, value?: number[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++) this.writeFixed32(field, value[i]);
  }

  writeRepeatedFixed64(field: number, value?: number[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++) this.writeFixed64(field, value[i]);
  }

  writeRepeatedFixed64String(field: number, value?: string[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeFixed64String(field, value[i]);
  }

  writeRepeatedSfixed32(field: number, value?: number[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++) this.writeSfixed32(field, value[i]);
  }

  writeRepeatedSfixed64(field: number, value?: number[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++) this.writeSfixed64(field, value[i]);
  }

  writeRepeatedSfixed64String(field: number, value?: string[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeSfixed64String(field, value[i]);
  }

  writeRepeatedFloat(field: number, value?: number[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++) this.writeFloat(field, value[i]);
  }

  writeRepeatedDouble(field: number, value?: number[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++) this.writeDouble(field, value[i]);
  }

  writeRepeatedBool(field: number, value?: boolean[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++) this.writeBool(field, value[i]);
  }

  writeRepeatedEnum(field: number, value?: number[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++) this.writeEnum(field, value[i]);
  }

  writeRepeatedString(field: number, value?: string[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++) this.writeString(field, value[i]);
  }

  writeRepeatedBytes(field: number, value?: ByteSource[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++) this.writeBytes(field, value[i]);
  }

  writeRepeatedMessage(
    field: number,
    value: Message[],
    writerCallback: BinaryWriteCallback
  ): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++) {
      this.writeMessage(field, value[i], writerCallback);
    }
  }

  writeRepeatedGroup(
    _field: number,
    _value: Message[],
    _writerCallback: BinaryWriteCallback
  ): void {
    // Deprecated since proto1
    throw new Error('not supported');
  }

  writeRepeatedFixedHash64(field: number, value?: string[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeFixedHash64(field, value[i]);
  }

  writeRepeatedVarintHash64(field: number, value?: string[]): void {
    if (!value) return;
    for (let i = 0; i < value.length; i++)
      this.writeVarintHash64(field, value[i]);
  }

  writePackedInt32(field: number, value?: number[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.int32(value[i]);
    this.writer.ldelim();
  }

  writePackedInt32String(field: number, value?: string[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++)
      this.writer.int32(parseInt(value[i], 10));
    this.writer.ldelim();
  }

  writePackedInt64(field: number, value?: number[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.int64(value[i]);
    this.writer.ldelim();
  }

  writePackedSplitFixed64(
    field: number,
    value: SplitType[],
    lo: SplitReverseConverter,
    hi: SplitReverseConverter
  ): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) {
      const long = new util.LongBits(lo(value[i]), hi(value[i]));
      this.writer.fixed64(long.toLong());
    }
    this.writer.ldelim();
  }

  writePackedSplitVarint64(
    field: number,
    value: SplitType[],
    lo: SplitReverseConverter,
    hi: SplitReverseConverter
  ): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) {
      const long = new util.LongBits(lo(value[i]), hi(value[i]));
      this.writer.uint64(long.toLong());
    }
    this.writer.ldelim();
  }

  writePackedSplitZigzagVarint64(
    field: number,
    value: SplitType[],
    lo: SplitReverseConverter,
    hi: SplitReverseConverter
  ): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) {
      const long = new util.LongBits(lo(value[i]), hi(value[i]));
      this.writer.sint64(long.toLong());
    }
    this.writer.ldelim();
  }

  writePackedInt64String(field: number, value?: string[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.int64(value[i]);
    this.writer.ldelim();
  }

  writePackedUint32(field: number, value?: number[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.uint32(value[i]);
    this.writer.ldelim();
  }

  writePackedUint32String(field: number, value?: string[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++)
      this.writer.uint32(parseInt(value[i], 10));
    this.writer.ldelim();
  }

  writePackedUint64(field: number, value?: number[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.uint64(value[i]);
    this.writer.ldelim();
  }

  writePackedUint64String(field: number, value?: string[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.uint64(value[i]);
    this.writer.ldelim();
  }

  writePackedSint32(field: number, value?: number[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.sint32(value[i]);
    this.writer.ldelim();
  }

  writePackedSint64(field: number, value?: number[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.sint64(value[i]);
    this.writer.ldelim();
  }

  writePackedSint64String(field: number, value?: string[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.sint64(value[i]);
    this.writer.ldelim();
  }

  writePackedSintHash64(field: number, value?: string[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) {
      const long = util.longFromHash(value[i]);
      this.writer.sint64(long);
    }
    this.writer.ldelim();
  }

  writePackedFixed32(field: number, value?: number[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.uint32(value.length * 4);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.fixed32(value[i]);
    this.writer.ldelim();
  }

  writePackedFixed64(field: number, value?: number[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.uint32(value.length * 8);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.fixed64(value[i]);
    this.writer.ldelim();
  }

  writePackedFixed64String(field: number, value?: string[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.uint32(value.length * 8);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.fixed64(value[i]);
    this.writer.ldelim();
  }

  writePackedSfixed32(field: number, value?: number[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.uint32(value.length * 4);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.sfixed32(value[i]);
    this.writer.ldelim();
  }

  writePackedSfixed64(field: number, value?: number[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.uint32(value.length * 8);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.sfixed64(value[i]);
    this.writer.ldelim();
  }

  writePackedSfixed64String(field: number, value?: string[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.uint32(value.length * 8);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.sfixed64(value[i]);
    this.writer.ldelim();
  }

  writePackedFloat(field: number, value?: number[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.float(value[i]);
    this.writer.ldelim();
  }

  writePackedDouble(field: number, value?: number[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.double(value[i]);
    this.writer.ldelim();
  }

  writePackedBool(field: number, value?: boolean[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.bool(value[i]);
    this.writer.ldelim();
  }

  writePackedEnum(field: number, value?: number[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) this.writer.int32(value[i]);
    this.writer.ldelim();
  }

  writePackedFixedHash64(field: number, value?: string[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) {
      const long = util.longFromHash(value[i]);
      this.writer.fixed64(long);
    }
    this.writer.ldelim();
  }

  writePackedVarintHash64(field: number, value?: string[]): void {
    if (!value || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this.writer.fork();
    for (let i = 0; i < value.length; i++) {
      const long = util.longFromHash(value[i]);
      this.writer.uint64(long);
    }
    this.writer.ldelim();
  }
}
