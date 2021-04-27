"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protobufjs_1 = require("protobufjs");
const Long = require("long");
const BinaryConstants = require("./constants");
const util_1 = require("./util");
class ProtoReader {
    constructor(buffer, start, length, useLong = false) {
        this.nextFieldNumber = BinaryConstants.INVALID_FIELD_NUMBER;
        this.nextWireType = BinaryConstants.WireType.INVALID;
        this.callbacks = {};
        this.reader = protobufjs_1.Reader.create(util_1.byteSourceToUint8Array(buffer));
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
    static alloc(buffer, start, length, useLong = false) {
        return new ProtoReader(buffer, start, length, useLong);
    }
    alloc(buffer, start, length, useLong = false) {
        return ProtoReader.alloc(buffer, start, length, useLong);
    }
    free() {
        this.reader = protobufjs_1.Reader.create(util_1.byteSourceToUint8Array(''));
        this.nextFieldNumber = BinaryConstants.INVALID_FIELD_NUMBER;
        this.nextWireType = BinaryConstants.WireType.INVALID;
    }
    getFieldCursor() {
        return this.fieldCursor;
    }
    getCursor() {
        return this.reader.pos;
    }
    getBuffer() {
        return this.reader.buf;
    }
    getFieldNumber() {
        return this.nextFieldNumber;
    }
    getWireType() {
        return this.nextWireType;
    }
    isEndGroup() {
        return this.nextWireType === BinaryConstants.WireType.END_GROUP;
    }
    getError() {
        return false;
    }
    setBlock(bytes, start, length) {
        this.reader = protobufjs_1.Reader.create(util_1.byteSourceToUint8Array(bytes ? bytes : ''));
        if (start) {
            this.reader.pos = start;
        }
        if (length) {
            this.reader.len = length;
        }
        this.nextFieldNumber = BinaryConstants.INVALID_FIELD_NUMBER;
        this.nextWireType = BinaryConstants.WireType.INVALID;
    }
    reset() {
        this.reader = protobufjs_1.Reader.create(this.reader.buf);
        this.nextFieldNumber = BinaryConstants.INVALID_FIELD_NUMBER;
        this.nextWireType = BinaryConstants.WireType.INVALID;
    }
    advance(count) {
        this.reader.skip(count);
    }
    nextField() {
        if (this.reader.pos >= this.reader.len)
            return false;
        this.fieldCursor = this.getCursor();
        const fieldAndWireType = this.reader.uint32();
        const fieldType = fieldAndWireType >>> 3;
        const wireType = fieldAndWireType & 7;
        this.nextFieldNumber = fieldType;
        this.nextWireType = wireType;
        return true;
    }
    unskipHeader() {
        let value = (this.nextFieldNumber << 3) | this.nextWireType;
        while (value > 128) {
            this.reader.pos--;
            value = value >>> 7;
        }
        this.reader.pos--;
    }
    skipMatchingFields() {
        const field = this.nextFieldNumber;
        this.unskipHeader();
        while (this.nextField() && this.getFieldNumber() === field) {
            this.skipField();
        }
        if (this.reader.pos !== this.reader.len) {
            this.unskipHeader();
        }
    }
    skipVarintField() {
        this.reader.skipType(BinaryConstants.WireType.VARINT);
    }
    skipDelimitedField() {
        this.reader.skipType(BinaryConstants.WireType.DELIMITED);
    }
    skipFixed32Field() {
        this.reader.skipType(BinaryConstants.WireType.FIXED32);
    }
    skipFixed64Field() {
        this.reader.skipType(BinaryConstants.WireType.FIXED64);
    }
    skipGroup() {
        this.reader.skipType(BinaryConstants.WireType.START_GROUP);
    }
    skipField() {
        this.reader.skipType(this.nextWireType);
    }
    registerReadCallback(callbackName, callback) {
        this.callbacks[callbackName] = callback;
    }
    runReadCallback(callbackName) {
        this.callbacks[callbackName](this);
    }
    readAny(fieldType) {
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
    readMessage(msg, decode) {
        const prev = this.reader.len;
        // reading .pos must come after the uint32() call
        const size = this.reader.uint32() + this.reader.pos;
        this.reader.len = size;
        decode(msg, this);
        this.reader.pos = size;
        this.reader.len = prev;
    }
    readGroup(field, message, reader) {
        // Groups have been deprecated since the start
        // But this is fairly simple to implement, since jspb does the heavy lifting
        reader(message, this);
    }
    getFieldDecoder() {
        // Should return a decoder wrapped around a BinaryConstants.WireType.DELIMITED
        // This can never be easily supported,
        // the return value of this is a jspb.BinaryDecoder
        throw new Error('not supported');
    }
    readInt32() {
        return this.reader.int32();
    }
    readInt32String() {
        return this.reader.int32().toString();
    }
    readInt64() {
        const ret = this.reader.int64();
        if (Long.isLong(ret)) {
            if (this.useLong) {
                return ret; // Incorrect cast on purpose
            }
            else {
                return ret.toNumber();
            }
        }
        else {
            return ret;
        }
    }
    readInt64String() {
        return this.reader.int64().toString();
    }
    readUint32() {
        return this.reader.uint32();
    }
    readUint32String() {
        return this.reader.uint32().toString();
    }
    readUint64() {
        const ret = this.reader.uint64();
        if (Long.isLong(ret)) {
            if (this.useLong) {
                return ret; // Incorrect cast on purpose
            }
            else {
                return ret.toNumber();
            }
        }
        else {
            return ret;
        }
    }
    readUint64String() {
        return this.reader.uint64().toString();
    }
    readSint32() {
        return this.reader.sint32();
    }
    readSint64() {
        const ret = this.reader.sint64();
        if (Long.isLong(ret)) {
            if (this.useLong) {
                return ret; // Incorrect cast on purpose
            }
            else {
                return ret.toNumber();
            }
        }
        else {
            return ret;
        }
    }
    readSint64String() {
        return this.reader.sint64().toString();
    }
    readFixed32() {
        return this.reader.fixed32();
    }
    readFixed64() {
        const ret = this.reader.fixed64();
        if (Long.isLong(ret)) {
            if (this.useLong) {
                return ret; // Incorrect cast on purpose
            }
            else {
                return ret.toNumber();
            }
        }
        else {
            return ret;
        }
    }
    readFixed64String() {
        return this.reader.fixed64().toString();
    }
    readSfixed32() {
        return this.reader.sfixed32();
    }
    readSfixed32String() {
        return this.reader.sfixed32().toString();
    }
    readSfixed64() {
        const ret = this.reader.sfixed64();
        if (Long.isLong(ret)) {
            if (this.useLong) {
                return ret; // Incorrect cast on purpose
            }
            else {
                return ret.toNumber();
            }
        }
        else {
            return ret;
        }
    }
    readSfixed64String() {
        return this.reader.sfixed64().toString();
    }
    readFloat() {
        return this.reader.float();
    }
    readDouble() {
        return this.reader.double();
    }
    readBool() {
        return this.reader.bool();
    }
    readEnum() {
        return this.reader.int32();
    }
    readString() {
        return this.reader.string();
    }
    readBytes() {
        return this.reader.bytes();
    }
    readVarintHash64() {
        return protobufjs_1.util.longToHash(this.reader.uint64());
    }
    readSintHash64() {
        return protobufjs_1.util.longToHash(this.reader.sint64());
    }
    readFixedHash64() {
        return protobufjs_1.util.longToHash(this.reader.fixed64());
    }
    readSplitVarint64(convert) {
        const ret = this.reader.uint64();
        const long = protobufjs_1.util.LongBits.from(ret);
        return convert(long.lo, long.hi);
    }
    readSplitZigzagVarint64(convert) {
        const ret = this.reader.sint64();
        const long = protobufjs_1.util.LongBits.from(ret);
        return convert(long.lo, long.hi);
    }
    readSplitFixed64(convert) {
        const ret = this.reader.fixed64();
        const long = protobufjs_1.util.LongBits.from(ret);
        return convert(long.lo, long.hi);
    }
    readPackedField_(callback) {
        const result = [];
        if (this.nextWireType === BinaryConstants.WireType.DELIMITED) {
            const end = this.reader.uint32() + this.reader.pos;
            while (this.reader.pos < end)
                result.push(callback.call(this));
        }
        else {
            result.push(callback.call(this));
        }
        return result;
    }
    readPackedInt32() {
        return this.readPackedField_(this.readInt32);
    }
    readPackedInt32String() {
        return this.readPackedField_(this.readInt32String);
    }
    readPackedInt64() {
        return this.readPackedField_(this.readInt64);
    }
    readPackedInt64String() {
        return this.readPackedField_(this.readInt64String);
    }
    readPackedUint32() {
        return this.readPackedField_(this.readUint32);
    }
    readPackedUint32String() {
        return this.readPackedField_(this.readUint32String);
    }
    readPackedUint64() {
        return this.readPackedField_(this.readUint64);
    }
    readPackedUint64String() {
        return this.readPackedField_(this.readUint64String);
    }
    readPackedSint32() {
        return this.readPackedField_(this.readSint32);
    }
    readPackedSint64() {
        return this.readPackedField_(this.readSint64);
    }
    readPackedSint64String() {
        return this.readPackedField_(this.readSint64String);
    }
    readPackedFixed32() {
        return this.readPackedField_(this.readFixed32);
    }
    readPackedFixed64() {
        return this.readPackedField_(this.readFixed64);
    }
    readPackedFixed64String() {
        return this.readPackedField_(this.readFixed64String);
    }
    readPackedSfixed32() {
        return this.readPackedField_(this.readSfixed32);
    }
    readPackedSfixed64() {
        return this.readPackedField_(this.readSfixed64);
    }
    readPackedSfixed64String() {
        return this.readPackedField_(this.readSfixed64String);
    }
    readPackedFloat() {
        return this.readPackedField_(this.readFloat);
    }
    readPackedDouble() {
        return this.readPackedField_(this.readDouble);
    }
    readPackedBool() {
        return this.readPackedField_(this.readBool);
    }
    readPackedEnum() {
        return this.readPackedField_(this.readEnum);
    }
    readPackedVarintHash64() {
        return this.readPackedField_(this.readVarintHash64);
    }
    readPackedFixedHash64() {
        return this.readPackedField_(this.readFixedHash64);
    }
}
exports.default = ProtoReader;
//# sourceMappingURL=pbjs_reader.js.map