var Reader = require('protobufjs').Reader;
var utils = require('protobufjs').util;
var BinaryConstants = require('./constants');

var ProtoReader = function(buffer, opt_start, opt_length) {
    this._reader = Reader.create(buffer);
    if (opt_start) {
        this._reader.pos = opt_start;
    }
    if (opt_length) {
        this._reader.len = opt_length;
    }
    this.nextField_ = BinaryConstants.INVALID_FIELD_NUMBER;
    this.nextWireType_ = BinaryConstants.WireType.INVALID;
};
ProtoReader.alloc = function(buffer, opt_start, opt_length) {
    return new ProtoReader(buffer, opt_start, opt_length);
};

ProtoReader.prototype.alloc = ProtoReader.alloc;
ProtoReader.prototype.free = function() {
    this._reader = null;
    this.nextField_ = BinaryConstants.INVALID_FIELD_NUMBER;
    this.nextWireType_ = BinaryConstants.WireType.INVALID;
};
ProtoReader.prototype.getFieldCursor = function() {
    return this.fieldCursor_
};
ProtoReader.prototype.getCursor = function() {
    return this._reader.pos;
};
ProtoReader.prototype.getBuffer = function() {
    return this._reader.buf
};
ProtoReader.prototype.getFieldNumber = function() {
    return this.nextField_
};
ProtoReader.prototype.getWireType = function() {
    return this.nextWireType_
};
ProtoReader.prototype.isEndGroup = function() {
    return this.nextWireType_ == BinaryConstants.WireType.END_GROUP
};
ProtoReader.prototype.getError = function() {
    return ""
};
ProtoReader.prototype.setBlock = function(bytes, start, length) {
    this._reader = Reader.create(bytes);
    this._reader.pos = start;
    this._reader.len = length;
    this.nextField_ = BinaryConstants.INVALID_FIELD_NUMBER;
    this.nextWireType_ = BinaryConstants.WireType.INVALID;
};
ProtoReader.prototype.reset = function() {
    this._reader = Reader.create(this._reader.buf);
    this.nextField_ = BinaryConstants.INVALID_FIELD_NUMBER;
    this.nextWireType_ = BinaryConstants.WireType.INVALID;
};
ProtoReader.prototype.advance = function(a) {
    this._reader.skip(a)
};
ProtoReader.prototype.nextField = function() {
    if (this._reader.pos >= this._reader.len) return false;
    var wireType = this._reader.uint32(),
        fieldType = wireType >>> 3;
    wireType &= 7;
    this.nextField_ = fieldType;
    this.nextWireType_ = wireType;
    return true;
};

ProtoReader.prototype.unskipHeader = function() {
    // This doesn't make sense to implement
    // Should rewind _reader.pos by size(varint((this.nextField_ << 3) | this.nextWireType_))
    throw new Error("not supported");
};
ProtoReader.prototype.skipMatchingFields = function() {
    // This depends on unskipHeader
    // Should read headers and skip if they match the current header, ending by rewinding the last header
    throw new Error("not supported");
};
ProtoReader.prototype.skipVarintField = function() {
    this._reader.skipType(BinaryConstants.WireType.VARINT);
};
ProtoReader.prototype.skipDelimitedField = function() {
    this._reader.skipType(BinaryConstants.WireType.DELIMITED);
};
ProtoReader.prototype.skipFixed32Field = function() {
    this._reader.skipType(BinaryConstants.WireType.FIXED32);
};
ProtoReader.prototype.skipFixed64Field = function() {
    this._reader.skipType(BinaryConstants.WireType.FIXED64);
};
ProtoReader.prototype.skipGroup = function() {
    this._reader.skipType(BinaryConstants.WireType.START_GROUP);
};
ProtoReader.prototype.skipField = function() {
    this._reader.skipType(this.nextWireType_);
};
ProtoReader.prototype.registerReadCallback = function(key, callback) {
    // I don't think this is ever used, so in the interest of simplification
    // If we ever want to add this, its basically this._callbacks[key] = callback
    throw new Error("not supported");
};
ProtoReader.prototype.runReadCallback = function(key) {
    // I don't think this is ever used, so in the interest of simplification
    // If we ever want to add this, its basically this._callbacks[key]()
    throw new Error("not supported");
};
ProtoReader.prototype.readAny = function(fieldType) {
    this.nextWireType_ = BinaryConstants.FieldTypeToWireType(a);
    var fieldType = BinaryConstants.FieldType;
    switch (a) {
        case b.DOUBLE:
        return this.readDouble();
        case b.FLOAT:
        return this.readFloat();
        case b.INT64:
        return this.readInt64();
        case b.UINT64:
        return this.readUint64();
        case b.INT32:
        return this.readInt32();
        case b.FIXED64:
        return this.readFixed64();
        case b.FIXED32:
        return this.readFixed32();
        case b.BOOL:
        return this.readBool();
        case b.STRING:
        return this.readString();
        case b.GROUP:
          throw new Error("Group field type not supported in readAny()");
        case b.MESSAGE:
          throw new Error("Message field type not supported in readAny()");
        case b.BYTES:
        return this.readBytes();
        case b.UINT32:
        return this.readUint32();
        case b.ENUM:
        return this.readEnum();
        case b.SFIXED32:
        return this.readSfixed32();
        case b.SFIXED64:
        return this.readSfixed64();
        case b.SINT32:
        return this.readSint32();
        case b.SINT64:
        return this.readSint64();
        case b.FHASH64:
        return this.readFixedHash64();
        case b.VHASH64:
        return this.readVarintHash64();
        default:
        goog.asserts.fail("Invalid field type in readAny()")
        
    }
    return 0
    
};
ProtoReader.prototype.readMessage = function(msg, decode) {
    var prev = this._reader.len,
        size = this._reader.uint32();
    size = this._reader.pos + size;
    this._reader.len = size;
    decode(msg, this);
    this._reader.pos = size;
    this._reader.len = prev;
};

ProtoReader.prototype.readGroup = function(field, message, reader) {
    // Groups have been deprecated since the start
    // But this is fairly simple to implement, since jspb does the heavy lifting
    reader(message, this);
};
ProtoReader.prototype.getFieldDecoder = function() {
    // Should return a decoder wrapped around a BinaryConstants.WireType.DELIMITED
    // This can never be easily supported, 
    // the return value of this is a jspb.BinaryDecoder
    throw new Error("not supported");
};
ProtoReader.prototype.readInt32 = function() {
    return this._reader.int32()
};
ProtoReader.prototype.readInt32String = function() {
    return this._reader.int32().toString()
};
ProtoReader.prototype.readInt64 = function() {
    var ret = this._reader.int64()
    if ("__isLong__" in ret) {
        ret = ret.toNumber();
    }
    return ret;
};
ProtoReader.prototype.readInt64String = function() {
    return this._reader.int64().toString()
};
ProtoReader.prototype.readUint32 = function() {
    return this._reader.uint32()
};
ProtoReader.prototype.readUint32String = function() {
    return this._reader.uint32().toString()
};
ProtoReader.prototype.readUint64 = function() {
    var ret = this._reader.uint64()
    if ("__isLong__" in ret) {
        ret = ret.toNumber();
    }
    return ret;
};
ProtoReader.prototype.readUint64String = function() {
    return this._reader.uint64().toString()
};
ProtoReader.prototype.readSint32 = function() {
    return this._reader.sint32()
};
ProtoReader.prototype.readSint64 = function() {
    var ret = this._reader.sint64()
    if ("__isLong__" in ret) {
        ret = ret.toNumber();
    }
    return ret;
};
ProtoReader.prototype.readSint64String = function() {
    return this._reader.sint64().toString()
};
ProtoReader.prototype.readFixed32 = function() {
    return this._reader.fixed32()
};
ProtoReader.prototype.readFixed64 = function() {
    var ret = this._reader.fixed64()
    if ("__isLong__" in ret) {
        ret = ret.toNumber();
    }
    return ret;
};
ProtoReader.prototype.readFixed64String = function() {
    return this._reader.fixed64().toString()
};
ProtoReader.prototype.readSfixed32 = function() {
    return this._reader.sfixed32()
};
ProtoReader.prototype.readSfixed32String = function() {
    return this._reader.sfixed32().toString()
};
ProtoReader.prototype.readSfixed64 = function() {
    var ret = this._reader.sfixed64()
    if ("__isLong__" in ret) {
        ret = ret.toNumber();
    }
    return ret;
};
ProtoReader.prototype.readSfixed64String = function() {
    return this._reader.sfixed64().toString()
};
ProtoReader.prototype.readFloat = function() {
    return this._reader.float()
};
ProtoReader.prototype.readDouble = function() {
    return this._reader.double()
};
ProtoReader.prototype.readBool = function() {
    return this._reader.bool()
};
ProtoReader.prototype.readEnum = function() {
    return this._reader.int32()
};
ProtoReader.prototype.readString = function() {
    return this._reader.string()
};
ProtoReader.prototype.readBytes = function() {
    return this._reader.bytes()
};
ProtoReader.prototype.readVarintHash64 = function() {
    return util.longToHash(this._reader.uint64())
};
ProtoReader.prototype.readSintHash64 = function() {
    return util.longToHash(this._reader.sint64())
};
ProtoReader.prototype.readFixedHash64 = function() {
    return util.longToHash(this._reader.fixed64())
};
ProtoReader.prototype.readSplitVarint64 = function(convert) {
    var ret = this._reader.uint64();

    var long = util.LongBits.from(ret);
    convert(long.lo, long.hi);
};
ProtoReader.prototype.readSplitZigzagVarint64 = function(convert) {
    var ret = this._reader.sint64();
    var long = util.LongBits.from(ret);
    convert(long.lo, long.hi);
};
ProtoReader.prototype.readSplitFixed64 = function(convert) {
    var ret = this._reader.fixed64();
    var long = util.LongBits.from(ret);
    convert(long.lo, long.hi);
};
ProtoReader.prototype.readPackedField_ = function(callback) {
    var result = [];
    if (this.nextWireType_ == BinaryConstants.WireType.DELIMITED) {
        var end = this._reader.uint32() + this._reader.pos;
        while (this._reader.pos < end) 
            result.push(callback.call(this));
    } else {
        result.push(callback.call(this));
    }
    return result
};
ProtoReader.prototype.readPackedInt32 = function() {
    return this.readPackedField_(this.readInt32)
};
ProtoReader.prototype.readPackedInt32String = function() {
    return this.readPackedField_(this.readInt32String)
};
ProtoReader.prototype.readPackedInt64 = function() {
    return this.readPackedField_(this.readInt64)
};
ProtoReader.prototype.readPackedInt64String = function() {
    return this.readPackedField_(this.readInt64String)
};
ProtoReader.prototype.readPackedUint32 = function() {
    return this.readPackedField_(this.readUInt32)
};
ProtoReader.prototype.readPackedUint32String = function() {
    return this.readPackedField_(this.readUInt32String)
};
ProtoReader.prototype.readPackedUint64 = function() {
    return this.readPackedField_(this.readUInt64)
};
ProtoReader.prototype.readPackedUint64String = function() {
    return this.readPackedField_(this.readUInt64String)
};
ProtoReader.prototype.readPackedSint32 = function() {
    return this.readPackedField_(this.readSint32)
};
ProtoReader.prototype.readPackedSint64 = function() {
    return this.readPackedField_(this.readSint64)
};
ProtoReader.prototype.readPackedSint64String = function() {
    return this.readPackedField_(this.readSint64String)
};
ProtoReader.prototype.readPackedFixed32 = function() {
    return this.readPackedField_(this.readFixed32)
};
ProtoReader.prototype.readPackedFixed64 = function() {
    return this.readPackedField_(this.readFixed64)
};
ProtoReader.prototype.readPackedFixed64String = function() {
    return this.readPackedField_(this.readFixed64String)
};
ProtoReader.prototype.readPackedSfixed32 = function() {
    return this.readPackedField_(this.readSfixed32)
};
ProtoReader.prototype.readPackedSfixed64 = function() {
    return this.readPackedField_(this.readSfixed64)
};
ProtoReader.prototype.readPackedSfixed64String = function() {
    return this.readPackedField_(this.readSfixed64String)
};
ProtoReader.prototype.readPackedFloat = function() {
    return this.readPackedField_(this.readFloat)
};
ProtoReader.prototype.readPackedDouble = function() {
    return this.readPackedField_(this.readDouble)
};
ProtoReader.prototype.readPackedBool = function() {
    return this.readPackedField_(this.readBool)
};
ProtoReader.prototype.readPackedEnum = function() {
    return this.readPackedField_(this.readEnum)
};
ProtoReader.prototype.readPackedVarintHash64 = function() {
    return this.readPackedField_(this.readVarintHash64)
};
ProtoReader.prototype.readPackedFixedHash64 = function() {
    return this.readPackedField_(this.readFixedHash64)
};
module.exports = ProtoReader;
