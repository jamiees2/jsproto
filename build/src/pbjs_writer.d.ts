import type { BinaryWriter, Message } from 'google-protobuf';
import * as BinaryConstants from './constants';
import type { ByteSource, AnyFieldType, SplitReverseConverter, BinaryWriteCallback, BinaryWriteValue, SplitType } from './types';
declare module 'protobufjs' {
    interface Writer {
        _push<T>(fn: (val: T, buf: Uint8Array, pos: number) => void, len: number, val: T): Writer;
    }
}
export default class ProtoWriter implements BinaryWriter {
    private writer;
    private finishedWrite;
    constructor();
    writeSerializedMessage(bytes: Uint8Array, start: number, end: number): void;
    maybeWriteSerializedMessage(bytes?: Uint8Array, start?: number, end?: number): void;
    reset(): void;
    getResultBuffer(): Uint8Array;
    getResultBase64String(): string;
    beginSubMessage(field: number): void;
    endSubMessage(): void;
    writeFieldHeader_(field: number, wireType: BinaryConstants.WireType): void;
    writeAny(fieldType: BinaryConstants.FieldType, field: number, value: AnyFieldType): void;
    writeUnsignedVarint32_(field: number, value?: number): void;
    writeSignedVarint32_(field: number, value?: number): void;
    writeUnsignedVarint64_(field: number, value?: number): void;
    writeSignedVarint64_(field: number, value?: number): void;
    writeZigzagVarint32_(field: number, value?: number): void;
    writeZigzagVarint64_(field: number, value?: number): void;
    writeZigzagVarint64String_(field: number, value?: string): void;
    writeZigzagVarintHash64_(field: number, value?: string): void;
    writeInt32(field: number, value?: number): void;
    writeInt32String(field: number, value?: string): void;
    writeInt64(field: number, value?: number): void;
    writeInt64String(field: number, value?: string): void;
    writeUint32(field: number, value?: number): void;
    writeUint32String(field: number, value?: string): void;
    writeUint64(field: number, value?: number): void;
    writeUint64String(field: number, value?: string): void;
    writeSint32(field: number, value?: number): void;
    writeSint64(field: number, value?: number): void;
    writeSintHash64(field: number, value?: string): void;
    writeSint64String(field: number, value?: string): void;
    writeFixed32(field: number, value?: number): void;
    writeFixed64(field: number, value?: number): void;
    writeFixed64String(field: number, value?: string): void;
    writeSfixed32(field: number, value?: number): void;
    writeSfixed64(field: number, value?: number): void;
    writeSfixed64String(field: number, value?: string): void;
    writeFloat(field: number, value?: number): void;
    writeDouble(field: number, value?: number): void;
    writeBool(field: number, value?: boolean): void;
    writeEnum(field: number, value?: number): void;
    writeString(field: number, value?: string): void;
    writeBytes(field: number, value?: ByteSource): void;
    writeMessage(field: number, value: BinaryWriteValue, writerCallback: BinaryWriteCallback): void;
    writeMessageSet(_field: number, _value: BinaryWriteValue, _writerCallback: BinaryWriteCallback): void;
    writeGroup(_field: number, _value: BinaryWriteValue, _writerCallback: BinaryWriteCallback): void;
    writeFixedHash64(field: number, value?: string): void;
    writeVarintHash64(field: number, value?: string): void;
    writeSplitFixed64(field: number, lowBits: number, highBits: number): void;
    writeSplitVarint64(field: number, lowBits: number, highBits: number): void;
    writeSplitZigzagVarint64(field: number, lowBits: number, highBits: number): void;
    writeRepeatedInt32(field: number, value?: number[]): void;
    writeRepeatedInt32String(field: number, value?: string[]): void;
    writeRepeatedInt64(field: number, value?: number[]): void;
    writeRepeatedSplitFixed64(field: number, value: SplitType[], lo: SplitReverseConverter, hi: SplitReverseConverter): void;
    writeRepeatedSplitVarint64(field: number, value: SplitType[], lo: SplitReverseConverter, hi: SplitReverseConverter): void;
    writeRepeatedSplitZigzagVarint64(field: number, value: SplitType[], lo: SplitReverseConverter, hi: SplitReverseConverter): void;
    writeRepeatedInt64String(field: number, value?: string[]): void;
    writeRepeatedUint32(field: number, value?: number[]): void;
    writeRepeatedUint32String(field: number, value?: string[]): void;
    writeRepeatedUint64(field: number, value?: number[]): void;
    writeRepeatedUint64String(field: number, value?: string[]): void;
    writeRepeatedSint32(field: number, value?: number[]): void;
    writeRepeatedSint64(field: number, value?: number[]): void;
    writeRepeatedSint64String(field: number, value?: string[]): void;
    writeRepeatedSintHash64(field: number, value?: string[]): void;
    writeRepeatedFixed32(field: number, value?: number[]): void;
    writeRepeatedFixed64(field: number, value?: number[]): void;
    writeRepeatedFixed64String(field: number, value?: string[]): void;
    writeRepeatedSfixed32(field: number, value?: number[]): void;
    writeRepeatedSfixed64(field: number, value?: number[]): void;
    writeRepeatedSfixed64String(field: number, value?: string[]): void;
    writeRepeatedFloat(field: number, value?: number[]): void;
    writeRepeatedDouble(field: number, value?: number[]): void;
    writeRepeatedBool(field: number, value?: boolean[]): void;
    writeRepeatedEnum(field: number, value?: number[]): void;
    writeRepeatedString(field: number, value?: string[]): void;
    writeRepeatedBytes(field: number, value?: ByteSource[]): void;
    writeRepeatedMessage(field: number, value: Message[], writerCallback: BinaryWriteCallback): void;
    writeRepeatedGroup(_field: number, _value: Message[], _writerCallback: BinaryWriteCallback): void;
    writeRepeatedFixedHash64(field: number, value?: string[]): void;
    writeRepeatedVarintHash64(field: number, value?: string[]): void;
    writePackedInt32(field: number, value?: number[]): void;
    writePackedInt32String(field: number, value?: string[]): void;
    writePackedInt64(field: number, value?: number[]): void;
    writePackedSplitFixed64(field: number, value: SplitType[], lo: SplitReverseConverter, hi: SplitReverseConverter): void;
    writePackedSplitVarint64(field: number, value: SplitType[], lo: SplitReverseConverter, hi: SplitReverseConverter): void;
    writePackedSplitZigzagVarint64(field: number, value: SplitType[], lo: SplitReverseConverter, hi: SplitReverseConverter): void;
    writePackedInt64String(field: number, value?: string[]): void;
    writePackedUint32(field: number, value?: number[]): void;
    writePackedUint32String(field: number, value?: string[]): void;
    writePackedUint64(field: number, value?: number[]): void;
    writePackedUint64String(field: number, value?: string[]): void;
    writePackedSint32(field: number, value?: number[]): void;
    writePackedSint64(field: number, value?: number[]): void;
    writePackedSint64String(field: number, value?: string[]): void;
    writePackedSintHash64(field: number, value?: string[]): void;
    writePackedFixed32(field: number, value?: number[]): void;
    writePackedFixed64(field: number, value?: number[]): void;
    writePackedFixed64String(field: number, value?: string[]): void;
    writePackedSfixed32(field: number, value?: number[]): void;
    writePackedSfixed64(field: number, value?: number[]): void;
    writePackedSfixed64String(field: number, value?: string[]): void;
    writePackedFloat(field: number, value?: number[]): void;
    writePackedDouble(field: number, value?: number[]): void;
    writePackedBool(field: number, value?: boolean[]): void;
    writePackedEnum(field: number, value?: number[]): void;
    writePackedFixedHash64(field: number, value?: string[]): void;
    writePackedVarintHash64(field: number, value?: string[]): void;
}
