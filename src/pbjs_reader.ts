import {Reader, util} from 'protobufjs';
import type {BinaryReader, Message, BinaryDecoder} from 'google-protobuf';
import * as Long from 'long';

import * as BinaryConstants from './constants';
import type {
  ByteSource,
  BinaryReadCallback,
  BinaryReadValue,
  AnyFieldType,
  BinaryReadReader,
  SplitConverter,
} from './types';
import {byteSourceToUint8Array} from './util';

export default class ProtoReader implements BinaryReader {
  private reader: Reader;
  private useLong: boolean;
  private nextFieldNumber: number = BinaryConstants.INVALID_FIELD_NUMBER;
  private fieldCursor: number;
  private nextWireType: BinaryConstants.WireType =
    BinaryConstants.WireType.INVALID;
  private callbacks: Record<string, BinaryReadCallback> = {};

  constructor(
    buffer: ByteSource,
    start?: number,
    length?: number,
    useLong = false
  ) {
    this.reader = Reader.create(byteSourceToUint8Array(buffer));
    if (start) {
      this.reader.pos = start;
    }
    if (length) {
      this.reader.len = length;
    }
    this.useLong = !!useLong;
    this.nextFieldNumber = BinaryConstants.INVALID_FIELD_NUMBER;
    this.nextWireType = BinaryConstants.WireType.INVALID;
    this.fieldCursor = this.reader.pos;
  }

  static alloc(
    buffer: ByteSource,
    start?: number,
    length?: number,
    useLong = false
  ): ProtoReader {
    return new ProtoReader(buffer, start, length, useLong);
  }

  alloc(
    buffer: ByteSource,
    start?: number,
    length?: number,
    useLong = false
  ): ProtoReader {
    return ProtoReader.alloc(buffer, start, length, useLong);
  }

  free(): void {
    this.reader = Reader.create(byteSourceToUint8Array(''));
    this.nextFieldNumber = BinaryConstants.INVALID_FIELD_NUMBER;
    this.nextWireType = BinaryConstants.WireType.INVALID;
  }

  getFieldCursor(): number {
    return this.fieldCursor;
  }

  getCursor(): number {
    return this.reader.pos;
  }

  getBuffer(): Uint8Array {
    return this.reader.buf;
  }

  getFieldNumber(): number {
    return this.nextFieldNumber;
  }

  getWireType(): BinaryConstants.WireType {
    return this.nextWireType;
  }

  isEndGroup(): boolean {
    return this.nextWireType === BinaryConstants.WireType.END_GROUP;
  }

  getError(): boolean {
    return false;
  }

  setBlock(bytes?: ByteSource, start?: number, length?: number): void {
    this.reader = Reader.create(byteSourceToUint8Array(bytes ? bytes : ''));
    if (start) {
      this.reader.pos = start;
    }
    if (length) {
      this.reader.len = length;
    }
    this.nextFieldNumber = BinaryConstants.INVALID_FIELD_NUMBER;
    this.nextWireType = BinaryConstants.WireType.INVALID;
  }

  reset(): void {
    this.reader = Reader.create(this.reader.buf);
    this.nextFieldNumber = BinaryConstants.INVALID_FIELD_NUMBER;
    this.nextWireType = BinaryConstants.WireType.INVALID;
  }

  advance(count: number): void {
    this.reader.skip(count);
  }

  nextField(): boolean {
    if (this.reader.pos >= this.reader.len) return false;
    this.fieldCursor = this.getCursor();

    const fieldAndWireType = this.reader.uint32();
    const fieldType = fieldAndWireType >>> 3;
    const wireType = fieldAndWireType & 7;

    this.nextFieldNumber = fieldType;
    this.nextWireType = wireType;
    return true;
  }

  unskipHeader(): void {
    let value = (this.nextFieldNumber << 3) | this.nextWireType;
    while (value > 128) {
      this.reader.pos--;
      value = value >>> 7;
    }
    this.reader.pos--;
  }

  skipMatchingFields(): void {
    const field = this.nextFieldNumber;
    this.unskipHeader();

    while (this.nextField() && this.getFieldNumber() === field) {
      this.skipField();
    }

    if (this.reader.pos !== this.reader.len) {
      this.unskipHeader();
    }
  }

  skipVarintField(): void {
    this.reader.skipType(BinaryConstants.WireType.VARINT);
  }

  skipDelimitedField(): void {
    this.reader.skipType(BinaryConstants.WireType.DELIMITED);
  }

  skipFixed32Field(): void {
    this.reader.skipType(BinaryConstants.WireType.FIXED32);
  }

  skipFixed64Field(): void {
    this.reader.skipType(BinaryConstants.WireType.FIXED64);
  }

  skipGroup(): void {
    this.reader.skipType(BinaryConstants.WireType.START_GROUP);
  }

  skipField(): void {
    this.reader.skipType(this.nextWireType);
  }

  registerReadCallback(
    callbackName: string,
    callback: BinaryReadCallback
  ): void {
    this.callbacks[callbackName] = callback;
  }

  runReadCallback(callbackName: string): BinaryReadValue {
    this.callbacks[callbackName](this);
  }

  readAny(fieldType: BinaryConstants.FieldType): AnyFieldType {
    this.nextWireType = BinaryConstants.FieldTypeToWireType(fieldType);
    switch (fieldType) {
      case BinaryConstants.FieldType.DOUBLE:
        return this.readDouble();
      case BinaryConstants.FieldType.FLOAT:
        return this.readFloat();
      case BinaryConstants.FieldType.INT64:
        return this.readInt64();
      case BinaryConstants.FieldType.UINT64:
        return this.readUint64();
      case BinaryConstants.FieldType.INT32:
        return this.readInt32();
      case BinaryConstants.FieldType.FIXED64:
        return this.readFixed64();
      case BinaryConstants.FieldType.FIXED32:
        return this.readFixed32();
      case BinaryConstants.FieldType.BOOL:
        return this.readBool();
      case BinaryConstants.FieldType.STRING:
        return this.readString();
      case BinaryConstants.FieldType.GROUP:
        throw new Error('Group field type not supported in readAny()');
      case BinaryConstants.FieldType.MESSAGE:
        throw new Error('Message field type not supported in readAny()');
      case BinaryConstants.FieldType.BYTES:
        return this.readBytes();
      case BinaryConstants.FieldType.UINT32:
        return this.readUint32();
      case BinaryConstants.FieldType.ENUM:
        return this.readEnum();
      case BinaryConstants.FieldType.SFIXED32:
        return this.readSfixed32();
      case BinaryConstants.FieldType.SFIXED64:
        return this.readSfixed64();
      case BinaryConstants.FieldType.SINT32:
        return this.readSint32();
      case BinaryConstants.FieldType.SINT64:
        return this.readSint64();
      case BinaryConstants.FieldType.FHASH64:
        return this.readFixedHash64();
      case BinaryConstants.FieldType.VHASH64:
        return this.readVarintHash64();
      default:
        throw new Error('Invalid field type in readAny()');
    }
  }

  readMessage(msg: BinaryReadValue, decode: BinaryReadReader): void {
    const prev = this.reader.len;
    // reading .pos must come after the uint32() call
    const size = this.reader.uint32() + this.reader.pos;
    this.reader.len = size;
    decode(msg, this);
    this.reader.pos = size;
    this.reader.len = prev;
  }

  readGroup(field: number, message: Message, reader: BinaryReadReader): void {
    // Groups have been deprecated since the start
    // But this is fairly simple to implement, since jspb does the heavy lifting
    reader(message, this);
  }

  getFieldDecoder(): BinaryDecoder {
    // Should return a decoder wrapped around a BinaryConstants.WireType.DELIMITED
    // This can never be easily supported,
    // the return value of this is a jspb.BinaryDecoder
    throw new Error('not supported');
  }

  readInt32(): number {
    return this.reader.int32();
  }

  readInt32String(): string {
    return this.reader.int32().toString();
  }

  readInt64(): number {
    const ret = <number | Long>this.reader.int64();
    if (Long.isLong(ret)) {
      if (this.useLong) {
        return <number>(<unknown>ret); // Incorrect cast on purpose
      } else {
        return ret.toNumber();
      }
    } else {
      return ret;
    }
  }

  readInt64String(): string {
    return this.reader.int64().toString();
  }

  readUint32(): number {
    return this.reader.uint32();
  }

  readUint32String(): string {
    return this.reader.uint32().toString();
  }

  readUint64(): number {
    const ret = <number | Long>this.reader.uint64();
    if (Long.isLong(ret)) {
      if (this.useLong) {
        return <number>(<unknown>ret); // Incorrect cast on purpose
      } else {
        return ret.toNumber();
      }
    } else {
      return ret;
    }
  }

  readUint64String(): string {
    return this.reader.uint64().toString();
  }

  readSint32(): number {
    return this.reader.sint32();
  }

  readSint64(): number {
    const ret = <number | Long>this.reader.sint64();
    if (Long.isLong(ret)) {
      if (this.useLong) {
        return <number>(<unknown>ret); // Incorrect cast on purpose
      } else {
        return ret.toNumber();
      }
    } else {
      return ret;
    }
  }

  readSint64String(): string {
    return this.reader.sint64().toString();
  }

  readFixed32(): number {
    return this.reader.fixed32();
  }

  readFixed64(): number {
    const ret = <number | Long>this.reader.fixed64();
    if (Long.isLong(ret)) {
      if (this.useLong) {
        return <number>(<unknown>ret); // Incorrect cast on purpose
      } else {
        return ret.toNumber();
      }
    } else {
      return ret;
    }
  }

  readFixed64String(): string {
    return this.reader.fixed64().toString();
  }

  readSfixed32(): number {
    return this.reader.sfixed32();
  }

  readSfixed32String(): string {
    return this.reader.sfixed32().toString();
  }

  readSfixed64(): number {
    const ret = <number | Long>this.reader.sfixed64();
    if (Long.isLong(ret)) {
      if (this.useLong) {
        return <number>(<unknown>ret); // Incorrect cast on purpose
      } else {
        return ret.toNumber();
      }
    } else {
      return ret;
    }
  }

  readSfixed64String(): string {
    return this.reader.sfixed64().toString();
  }

  readFloat(): number {
    return this.reader.float();
  }

  readDouble(): number {
    return this.reader.double();
  }

  readBool(): boolean {
    return this.reader.bool();
  }

  readEnum(): number {
    return this.reader.int32();
  }

  readString(): string {
    return this.reader.string();
  }

  readBytes(): Uint8Array {
    return this.reader.bytes();
  }

  readVarintHash64(): string {
    return util.longToHash(this.reader.uint64());
  }

  readSintHash64(): string {
    return util.longToHash(this.reader.sint64());
  }

  readFixedHash64(): string {
    return util.longToHash(this.reader.fixed64());
  }

  readSplitVarint64(convert: SplitConverter) {
    const ret = this.reader.uint64();

    const long = util.LongBits.from(ret);
    return convert(long.lo, long.hi);
  }

  readSplitZigzagVarint64(convert: SplitConverter) {
    const ret = this.reader.sint64();
    const long = util.LongBits.from(ret);
    return convert(long.lo, long.hi);
  }

  readSplitFixed64(convert: SplitConverter) {
    const ret = this.reader.fixed64();
    const long = util.LongBits.from(ret);
    return convert(long.lo, long.hi);
  }

  readPackedField_<T>(callback: () => T): T[] {
    const result = [];
    if (this.nextWireType === BinaryConstants.WireType.DELIMITED) {
      const end = this.reader.uint32() + this.reader.pos;
      while (this.reader.pos < end) result.push(callback.call(this));
    } else {
      result.push(callback.call(this));
    }
    return result;
  }

  readPackedInt32(): number[] {
    return this.readPackedField_(this.readInt32);
  }

  readPackedInt32String(): string[] {
    return this.readPackedField_(this.readInt32String);
  }

  readPackedInt64(): number[] {
    return this.readPackedField_(this.readInt64);
  }

  readPackedInt64String(): string[] {
    return this.readPackedField_(this.readInt64String);
  }

  readPackedUint32(): number[] {
    return this.readPackedField_(this.readUint32);
  }

  readPackedUint32String(): string[] {
    return this.readPackedField_(this.readUint32String);
  }

  readPackedUint64(): number[] {
    return this.readPackedField_(this.readUint64);
  }

  readPackedUint64String(): string[] {
    return this.readPackedField_(this.readUint64String);
  }

  readPackedSint32(): number[] {
    return this.readPackedField_(this.readSint32);
  }

  readPackedSint64(): number[] {
    return this.readPackedField_(this.readSint64);
  }

  readPackedSint64String(): string[] {
    return this.readPackedField_(this.readSint64String);
  }

  readPackedFixed32(): number[] {
    return this.readPackedField_(this.readFixed32);
  }

  readPackedFixed64(): number[] {
    return this.readPackedField_(this.readFixed64);
  }

  readPackedFixed64String(): string[] {
    return this.readPackedField_(this.readFixed64String);
  }

  readPackedSfixed32(): number[] {
    return this.readPackedField_(this.readSfixed32);
  }

  readPackedSfixed64(): number[] {
    return this.readPackedField_(this.readSfixed64);
  }

  readPackedSfixed64String(): string[] {
    return this.readPackedField_(this.readSfixed64String);
  }

  readPackedFloat(): number[] {
    return this.readPackedField_(this.readFloat);
  }

  readPackedDouble(): number[] {
    return this.readPackedField_(this.readDouble);
  }

  readPackedBool(): boolean[] {
    return this.readPackedField_(this.readBool);
  }

  readPackedEnum(): number[] {
    return this.readPackedField_(this.readEnum);
  }

  readPackedVarintHash64(): string[] {
    return this.readPackedField_(this.readVarintHash64);
  }

  readPackedFixedHash64(): string[] {
    return this.readPackedField_(this.readFixedHash64);
  }
}
