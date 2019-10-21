type ByteSource = ArrayBuffer | Uint8Array | number[] | string;
type ScalarFieldType = boolean | number | string;
type RepeatedFieldType = ScalarFieldType[] | Uint8Array[];
type AnyFieldType = ScalarFieldType | RepeatedFieldType | Uint8Array;
type FieldValue = string | number | boolean | Uint8Array | FieldValueArray | undefined;

type BinaryReadReader = (msg: any, binaryReader: BinaryReader) => void;
type BinaryRead = (msg: any, reader: BinaryReadReader) => void;
type BinaryWriteCallback = (value: any, binaryWriter: BinaryWriter) => void;
type BinaryWrite = (fieldNumber: number, value: any, writerCallback: BinaryWriteCallback) => void;

export namespace BinaryConstants {
    enum FieldType {
        INVALID = -1,
        DOUBLE = 1,
        FLOAT = 2,
        INT64 = 3,
        UINT64 = 4,
        INT32 = 5,
        FIXED64 = 6,
        FIXED32 = 7,
        BOOL = 8,
        STRING = 9,
        GROUP = 10,
        MESSAGE = 11,
        BYTES = 12,
        UINT32 = 13,
        ENUM = 14,
        SFIXED32 = 15,
        SFIXED64 = 16,
        SINT32 = 17,
        SINT64 = 18,
        FHASH64 = 30,
        VHASH64 = 31,
    }

    enum WireType {
        INVALID = -1,
        VARINT = 0,
        FIXED64 = 1,
        DELIMITED = 2,
        START_GROUP = 3,
        END_GROUP = 4,
        FIXED32 = 5,
    }

    const FieldTypeToWireType: (fieldType: FieldType) => WireType;

    const INVALID_FIELD_NUMBER: number;
    const FLOAT32_EPS: number;
    const FLOAT32_MIN: number;
    const FLOAT32_MAX: number;
    const FLOAT64_EPS: number;
    const FLOAT64_MIN: number;
    const FLOAT64_MAX: number;
    const TWO_TO_20: number;
    const TWO_TO_23: number;
    const TWO_TO_31: number;
    const TWO_TO_32: number;
    const TWO_TO_52: number;
    const TWO_TO_63: number;
    const TWO_TO_64: number;
    const ZERO_HASH: string;
}

export class ProtoReader {
    constructor(bytes?: ByteSource, start?: number, length?: number);

    static alloc(bytes?: ByteSource, start?: number, length?: number): BinaryReader;
    alloc(bytes?: ByteSource, start?: number, length?: number): BinaryReader;

    free(): void;

    getFieldCursor(): number;

    getCursor(): number;

    getBuffer(): Uint8Array;

    getFieldNumber(): number;

    getWireType(): BinaryConstants.WireType;

    isEndGroup(): boolean;

    getError(): boolean;

    setBlock(bytes?: ByteSource, start?: number, length?: number): void;

    reset(): void;

    advance(count: number): void;

    nextField(): boolean;

    unskipHeader(): void;

    skipMatchingFields(): void;

    skipVarintField(): void;

    skipDelimitedField(): void;

    skipFixed32Field(): void;

    skipFixed64Field(): void;

    skipGroup(): void;

    skipField(): void;

    registerReadCallback(callbackName: string, callback: (binaryReader: BinaryReader) => any): void;

    runReadCallback(callbackName: string): any;

    readAny(fieldType: BinaryConstants.FieldType): AnyFieldType;

    readMessage: BinaryRead;

    readGroup(field: number, message: Message, reader: BinaryReadReader): void;

    getFieldDecoder(): BinaryDecoder;

    readInt32(): number;

    readInt32String(): string;

    readInt64(): number;

    readInt64String(): string;

    readUint32(): number;

    readUint32String(): string;

    readUint64(): number;

    readUint64String(): string;

    readSint32(): number;

    readSint64(): number;

    readSint64String(): string;

    readFixed32(): number;

    readFixed64(): number;

    readFixed64String(): string;

    readSfixed32(): number;

    readSfixed32String(): string;

    readSfixed64(): number;

    readSfixed64String(): string;

    readFloat(): number;

    readDouble(): number;

    readBool(): boolean;

    readEnum(): number;

    readString(): string;

    readBytes(): Uint8Array;

    readVarintHash64(): string;

    readFixedHash64(): string;

    readPackedInt32(): number[];

    readPackedInt32String(): string[];

    readPackedInt64(): number[];

    readPackedInt64String(): string[];

    readPackedUint32(): number[];

    readPackedUint32String(): string[];

    readPackedUint64(): number[];

    readPackedUint64String(): string[];

    readPackedSint32(): number[];

    readPackedSint64(): number[];

    readPackedSint64String(): string[];

    readPackedFixed32(): number[];

    readPackedFixed64(): number[];

    readPackedFixed64String(): string[];

    readPackedSfixed32(): number[];

    readPackedSfixed64(): number[];

    readPackedSfixed64String(): string[];

    readPackedFloat(): number[];

    readPackedDouble(): number[];

    readPackedBool(): boolean[];

    readPackedEnum(): number[];

    readPackedVarintHash64(): string[];

    readPackedFixedHash64(): string[];
}

export class ProtoWriter {
    constructor();

    writeSerializedMessage(bytes: Uint8Array, start: number, end: number): void;

    maybeWriteSerializedMessage(bytes?: Uint8Array, start?: number, end?: number): void;

    reset(): void;

    getResultBuffer(): Uint8Array;

    getResultBase64String(): string;

    beginSubMessage(field: number): void;

    endSubMessage(field: number): void;

    writeAny(fieldType: BinaryConstants.FieldType, field: number, value: AnyFieldType): void;

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

    writeMessage: BinaryWrite;

    writeGroup(field: number, value: any, writeCallback: BinaryWriteCallback): void;

    writeFixedHash64(field: number, value?: string): void;

    writeVarintHash64(field: number, value?: string): void;

    writeRepeatedInt32(field: number, value?: number[]): void;

    writeRepeatedInt32String(field: number, value?: string[]): void;

    writeRepeatedInt64(field: number, value?: number[]): void;

    writeRepeatedInt64String(field: number, value?: string[]): void;

    writeRepeatedUint32(field: number, value?: number[]): void;

    writeRepeatedUint32String(field: number, value?: string[]): void;

    writeRepeatedUint64(field: number, value?: number[]): void;

    writeRepeatedUint64String(field: number, value?: string[]): void;

    writeRepeatedSint32(field: number, value?: number[]): void;

    writeRepeatedSint64(field: number, value?: number[]): void;

    writeRepeatedSint64String(field: number, value?: string[]): void;

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

    writeRepeatedGroup(field: number, value: Message[], writerCallback: BinaryWriteCallback): void;

    writeRepeatedFixedHash64(field: number, value?: string[]): void;

    writeRepeatedVarintHash64(field: number, value?: string[]): void;

    writePackedInt32(field: number, value?: number[]): void;

    writePackedInt32String(field: number, value?: string[]): void;

    writePackedInt64(field: number, value?: number[]): void;

    writePackedInt64String(field: number, value?: string[]): void;

    writePackedUint32(field: number, value?: number[]): void;

    writePackedUint32String(field: number, value?: string[]): void;

    writePackedUint64(field: number, value?: number[]): void;

    writePackedUint64String(field: number, value?: string[]): void;

    writePackedSint32(field: number, value?: number[]): void;

    writePackedSint64(field: number, value?: number[]): void;

    writePackedSint64String(field: number, value?: string[]): void;

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

export namespace util {
    var Buffer: any;
}

export const configure: () => void;
export const enter: (jspb: object, jsproto: object) => any;
export const exit: (jspb: object, old: any) => void;
export const serialize: (protoClass: object, instance: object, jspb: object) => any;
export const deserialize: (protoClass: object, data: object, jspb: object) => any;