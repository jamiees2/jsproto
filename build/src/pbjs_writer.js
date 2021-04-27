"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protobufjs_1 = require("protobufjs");
const BinaryConstants = require("./constants");
const util_1 = require("./util");
const writeSerialized = (bytes, buf, pos) => {
    for (let i = 0; i < bytes.length; i++) {
        buf[pos++] = bytes[i];
    }
};
class ProtoWriter {
    constructor() {
        this.writer = protobufjs_1.Writer.create();
        this.finishedWrite = null;
    }
    writeSerializedMessage(bytes, start, end) {
        const bytesSub = bytes.subarray(start, end);
        this.writer._push(writeSerialized, bytesSub.length, bytesSub);
    }
    maybeWriteSerializedMessage(bytes, start, end) {
        if (bytes && start && end) {
            this.writeSerializedMessage(bytes, start, end);
        }
    }
    reset() {
        this.writer = protobufjs_1.Writer.create();
    }
    getResultBuffer() {
        if (this.finishedWrite === null) {
            this.finishedWrite = this.writer.finish();
            this.writer = protobufjs_1.Writer.create();
        }
        return this.finishedWrite;
    }
    getResultBase64String() {
        const buf = this.getResultBuffer();
        return protobufjs_1.util.base64.encode(buf, 0, buf.length);
    }
    beginSubMessage(field) {
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
    }
    endSubMessage() {
        this.writer.ldelim();
    }
    writeFieldHeader_(field, wireType) {
        const x = (field << 3) | wireType;
        this.writer.uint32(x);
    }
    writeAny(fieldType, field, value) {
        const fieldTypes = BinaryConstants.FieldType;
        switch (fieldType) {
            case fieldTypes.DOUBLE:
                this.writeDouble(field, value);
                return;
            case fieldTypes.FLOAT:
                this.writeFloat(field, value);
                return;
            case fieldTypes.INT64:
                this.writeInt64(field, value);
                return;
            case fieldTypes.UINT64:
                this.writeUint64(field, value);
                return;
            case fieldTypes.INT32:
                this.writeInt32(field, value);
                return;
            case fieldTypes.FIXED64:
                this.writeFixed64(field, value);
                return;
            case fieldTypes.FIXED32:
                this.writeFixed32(field, value);
                return;
            case fieldTypes.BOOL:
                this.writeBool(field, value);
                return;
            case fieldTypes.STRING:
                this.writeString(field, value);
                return;
            case fieldTypes.GROUP:
                throw new Error('Group field type not supported in writeAny()');
            case fieldTypes.MESSAGE:
                throw new Error('Message field type not supported in writeAny()');
            case fieldTypes.BYTES:
                this.writeBytes(field, value);
                return;
            case fieldTypes.UINT32:
                this.writeUint32(field, value);
                return;
            case fieldTypes.ENUM:
                this.writeEnum(field, value);
                return;
            case fieldTypes.SFIXED32:
                this.writeSfixed32(field, value);
                return;
            case fieldTypes.SFIXED64:
                this.writeSfixed64(field, value);
                return;
            case fieldTypes.SINT32:
                this.writeSint32(field, value);
                return;
            case fieldTypes.SINT64:
                this.writeSint64(field, value);
                return;
            case fieldTypes.FHASH64:
                this.writeFixedHash64(field, value);
                return;
            case fieldTypes.VHASH64:
                this.writeVarintHash64(field, value);
                return;
            default:
                throw new Error('Invalid field type in writeAny()');
        }
    }
    writeUnsignedVarint32_(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
        this.writer.uint32(value);
    }
    writeSignedVarint32_(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
        this.writer.int32(value);
    }
    writeUnsignedVarint64_(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
        this.writer.uint64(value);
    }
    writeSignedVarint64_(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
        this.writer.int64(value);
    }
    writeZigzagVarint32_(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
        this.writer.sint32(value);
    }
    writeZigzagVarint64_(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
        this.writer.sint64(value);
    }
    writeZigzagVarint64String_(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
        this.writer.sint64(value);
    }
    writeZigzagVarintHash64_(field, value) {
        if (!value)
            return;
        const long = protobufjs_1.util.longFromHash(value);
        this.writer.sint64(long);
    }
    writeInt32(field, value) {
        if (!value)
            return;
        this.writeSignedVarint32_(field, value);
    }
    writeInt32String(field, value) {
        if (!value)
            return;
        const intValue = parseInt(value, 10);
        this.writeSignedVarint32_(field, intValue);
    }
    writeInt64(field, value) {
        if (!value)
            return;
        this.writeSignedVarint64_(field, value);
    }
    writeInt64String(field, value) {
        if (!value)
            return;
        const intValue = parseInt(value, 10);
        this.writeSignedVarint64_(field, intValue);
    }
    writeUint32(field, value) {
        if (!value)
            return;
        this.writeUnsignedVarint32_(field, value);
    }
    writeUint32String(field, value) {
        if (!value)
            return;
        const intValue = parseInt(value, 10);
        this.writeUnsignedVarint32_(field, intValue);
    }
    writeUint64(field, value) {
        if (!value)
            return;
        this.writeUnsignedVarint64_(field, value);
    }
    writeUint64String(field, value) {
        if (!value)
            return;
        const intValue = parseInt(value, 10);
        this.writeSignedVarint64_(field, intValue);
    }
    writeSint32(field, value) {
        if (!value)
            return;
        this.writeZigzagVarint32_(field, value);
    }
    writeSint64(field, value) {
        if (!value)
            return;
        this.writeZigzagVarint64_(field, value);
    }
    writeSintHash64(field, value) {
        if (!value)
            return;
        this.writeZigzagVarintHash64_(field, value);
    }
    writeSint64String(field, value) {
        if (!value)
            return;
        this.writeZigzagVarint64String_(field, value);
    }
    writeFixed32(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED32);
        this.writer.fixed32(value);
    }
    writeFixed64(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
        this.writer.fixed64(value);
    }
    writeFixed64String(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
        this.writer.fixed64(value);
    }
    writeSfixed32(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED32);
        this.writer.sfixed32(value);
    }
    writeSfixed64(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
        this.writer.sfixed64(value);
    }
    writeSfixed64String(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
        this.writer.sfixed64(value);
    }
    writeFloat(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED32);
        this.writer.float(value);
    }
    writeDouble(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
        this.writer.double(value);
    }
    writeBool(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
        this.writer.bool(value);
    }
    writeEnum(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
        this.writer.int32(value);
    }
    writeString(field, value) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.string(value);
    }
    writeBytes(field, value) {
        if (!value)
            return;
        const bytes = util_1.byteSourceToUint8Array(value);
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.bytes(bytes);
    }
    writeMessage(field, value, writerCallback) {
        if (!value)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        writerCallback(value, this);
        this.writer.ldelim();
    }
    writeMessageSet(_field, _value, _writerCallback) {
        // Deprecated since proto1
        throw new Error('not supported');
    }
    writeGroup(_field, _value, _writerCallback) {
        // Deprecated since proto1
        throw new Error('not supported');
    }
    writeFixedHash64(field, value) {
        if (!value)
            return;
        const long = protobufjs_1.util.longFromHash(value);
        this.writer.fixed64(long);
    }
    writeVarintHash64(field, value) {
        if (!value)
            return;
        const long = protobufjs_1.util.longFromHash(value);
        this.writer.uint64(long);
    }
    writeSplitFixed64(field, lowBits, highBits) {
        const long = new protobufjs_1.util.LongBits(lowBits, highBits);
        this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
        this.writer.fixed64(long.toLong());
    }
    writeSplitVarint64(field, lowBits, highBits) {
        const long = new protobufjs_1.util.LongBits(lowBits, highBits);
        this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
        this.writer.uint64(long.toLong());
    }
    writeSplitZigzagVarint64(field, lowBits, highBits) {
        const long = new protobufjs_1.util.LongBits(lowBits, highBits);
        this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
        this.writer.sint64(long.toLong());
    }
    writeRepeatedInt32(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeSignedVarint32_(field, value[i]);
    }
    writeRepeatedInt32String(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeInt32String(field, value[i]);
    }
    writeRepeatedInt64(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeSignedVarint64_(field, value[i]);
    }
    writeRepeatedSplitFixed64(field, value, lo, hi) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeSplitFixed64(field, lo(value[i]), hi(value[i]));
    }
    writeRepeatedSplitVarint64(field, value, lo, hi) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeSplitVarint64(field, lo(value[i]), hi(value[i]));
    }
    writeRepeatedSplitZigzagVarint64(field, value, lo, hi) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeSplitZigzagVarint64(field, lo(value[i]), hi(value[i]));
    }
    writeRepeatedInt64String(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeInt64String(field, value[i]);
    }
    writeRepeatedUint32(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeUnsignedVarint32_(field, value[i]);
    }
    writeRepeatedUint32String(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeUint32String(field, value[i]);
    }
    writeRepeatedUint64(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeUnsignedVarint64_(field, value[i]);
    }
    writeRepeatedUint64String(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeUint64String(field, value[i]);
    }
    writeRepeatedSint32(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeZigzagVarint32_(field, value[i]);
    }
    writeRepeatedSint64(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeZigzagVarint64_(field, value[i]);
    }
    writeRepeatedSint64String(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeZigzagVarint64String_(field, value[i]);
    }
    writeRepeatedSintHash64(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeZigzagVarintHash64_(field, value[i]);
    }
    writeRepeatedFixed32(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeFixed32(field, value[i]);
    }
    writeRepeatedFixed64(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeFixed64(field, value[i]);
    }
    writeRepeatedFixed64String(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeFixed64String(field, value[i]);
    }
    writeRepeatedSfixed32(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeSfixed32(field, value[i]);
    }
    writeRepeatedSfixed64(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeSfixed64(field, value[i]);
    }
    writeRepeatedSfixed64String(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeSfixed64String(field, value[i]);
    }
    writeRepeatedFloat(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeFloat(field, value[i]);
    }
    writeRepeatedDouble(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeDouble(field, value[i]);
    }
    writeRepeatedBool(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeBool(field, value[i]);
    }
    writeRepeatedEnum(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeEnum(field, value[i]);
    }
    writeRepeatedString(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeString(field, value[i]);
    }
    writeRepeatedBytes(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeBytes(field, value[i]);
    }
    writeRepeatedMessage(field, value, writerCallback) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++) {
            this.writeMessage(field, value[i], writerCallback);
        }
    }
    writeRepeatedGroup(_field, _value, _writerCallback) {
        // Deprecated since proto1
        throw new Error('not supported');
    }
    writeRepeatedFixedHash64(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeFixedHash64(field, value[i]);
    }
    writeRepeatedVarintHash64(field, value) {
        if (!value)
            return;
        for (let i = 0; i < value.length; i++)
            this.writeVarintHash64(field, value[i]);
    }
    writePackedInt32(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.int32(value[i]);
        this.writer.ldelim();
    }
    writePackedInt32String(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.int32(parseInt(value[i], 10));
        this.writer.ldelim();
    }
    writePackedInt64(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.int64(value[i]);
        this.writer.ldelim();
    }
    writePackedSplitFixed64(field, value, lo, hi) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++) {
            const long = new protobufjs_1.util.LongBits(lo(value[i]), hi(value[i]));
            this.writer.fixed64(long.toLong());
        }
        this.writer.ldelim();
    }
    writePackedSplitVarint64(field, value, lo, hi) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++) {
            const long = new protobufjs_1.util.LongBits(lo(value[i]), hi(value[i]));
            this.writer.uint64(long.toLong());
        }
        this.writer.ldelim();
    }
    writePackedSplitZigzagVarint64(field, value, lo, hi) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++) {
            const long = new protobufjs_1.util.LongBits(lo(value[i]), hi(value[i]));
            this.writer.sint64(long.toLong());
        }
        this.writer.ldelim();
    }
    writePackedInt64String(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.int64(value[i]);
        this.writer.ldelim();
    }
    writePackedUint32(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.uint32(value[i]);
        this.writer.ldelim();
    }
    writePackedUint32String(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.uint32(parseInt(value[i], 10));
        this.writer.ldelim();
    }
    writePackedUint64(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.uint64(value[i]);
        this.writer.ldelim();
    }
    writePackedUint64String(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.uint64(value[i]);
        this.writer.ldelim();
    }
    writePackedSint32(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.sint32(value[i]);
        this.writer.ldelim();
    }
    writePackedSint64(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.sint64(value[i]);
        this.writer.ldelim();
    }
    writePackedSint64String(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.sint64(value[i]);
        this.writer.ldelim();
    }
    writePackedSintHash64(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++) {
            const long = protobufjs_1.util.longFromHash(value[i]);
            this.writer.sint64(long);
        }
        this.writer.ldelim();
    }
    writePackedFixed32(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.uint32(value.length * 4);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.fixed32(value[i]);
        this.writer.ldelim();
    }
    writePackedFixed64(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.uint32(value.length * 8);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.fixed64(value[i]);
        this.writer.ldelim();
    }
    writePackedFixed64String(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.uint32(value.length * 8);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.fixed64(value[i]);
        this.writer.ldelim();
    }
    writePackedSfixed32(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.uint32(value.length * 4);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.sfixed32(value[i]);
        this.writer.ldelim();
    }
    writePackedSfixed64(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.uint32(value.length * 8);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.sfixed64(value[i]);
        this.writer.ldelim();
    }
    writePackedSfixed64String(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.uint32(value.length * 8);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.sfixed64(value[i]);
        this.writer.ldelim();
    }
    writePackedFloat(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.float(value[i]);
        this.writer.ldelim();
    }
    writePackedDouble(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.double(value[i]);
        this.writer.ldelim();
    }
    writePackedBool(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.bool(value[i]);
        this.writer.ldelim();
    }
    writePackedEnum(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++)
            this.writer.int32(value[i]);
        this.writer.ldelim();
    }
    writePackedFixedHash64(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++) {
            const long = protobufjs_1.util.longFromHash(value[i]);
            this.writer.fixed64(long);
        }
        this.writer.ldelim();
    }
    writePackedVarintHash64(field, value) {
        if (!value || !value.length)
            return;
        this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
        this.writer.fork();
        for (let i = 0; i < value.length; i++) {
            const long = protobufjs_1.util.longFromHash(value[i]);
            this.writer.uint64(long);
        }
        this.writer.ldelim();
    }
}
exports.default = ProtoWriter;
//# sourceMappingURL=pbjs_writer.js.map