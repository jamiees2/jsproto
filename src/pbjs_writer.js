var Writer = require('protobufjs').Writer;
var utils = require('protobufjs').util;
var BinaryConstants = require('./constants');

var ProtoWriter = function() {
    this._writer = Writer.create();
    this._finishedWrite = null;
};
function writeSerialized(bytes, buf, pos) {
    for (var i=0;i<bytes.length;i++) {
        buf[pos++] = bytes[i];
    }
}
function byteSourceToUint8Array(data) {
  if (data.constructor === Uint8Array) {
    return data;
  }

  if (data.constructor === ArrayBuffer) {
    return new Uint8Array(data);
  }

  if (typeof Buffer != 'undefined' && data.constructor === Buffer) {
    return new Uint8Array(data);
  }

  if (data.constructor === Array) {
    return new Uint8Array(data);
  }

  if (data.constructor === String) {
    var buf = new Uint8Array(utils.base64.length(value));
    utils.base64.decode(value, buf, 0);
    return buf;
  }

  return new Uint8Array(0);
};
ProtoWriter.prototype.writeSerializedMessage = function(bytes, start, end) {
    throw new Error("not supported")
    var bytes = bytes.subarray(start, end)
    this._writer._push(writeSerialized, bytes.length, bytes);
};
ProtoWriter.prototype.maybeWriteSerializedMessage = function(bytes, start, end) {
    if (bytes != null && start != null && end != null) {
        this.writeSerializedMessage(bytes, start, end);
    }
};
ProtoWriter.prototype.reset = function() {
    this._writer = Writer.create();
};
ProtoWriter.prototype.getResultBuffer = function() {
    if (this._finishedWrite === null) {
        this._finishedWrite = this._writer.finish()
        this._writer = null;
    }
    return this._finishedWrite;
};
ProtoWriter.prototype.getResultBase64String = function(alphabet) {
    var buf = this.getResultBuffer()
    return base64.encode(buf, 0, buf.length)
};
ProtoWriter.prototype.beginSubMessage = function(field) {
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
};
ProtoWriter.prototype.endSubMessage = function() {
    this._writer.ldelim()
};
ProtoWriter.prototype.writeFieldHeader_ = function(fieldType, wireType) {
    var x = (fieldType << 3) | wireType;
    this._writer.uint32(x);
};
ProtoWriter.prototype.writeAny = function(fieldType, field, value) {
    var fieldTypes = BinaryConstants.FieldType;
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
            this.writeFixed32(field,
                value);
            return;
        case fieldTypes.BOOL:
            this.writeBool(field, value);
            return;
        case fieldTypes.STRING:
            this.writeString(field, value);
            return;
        case fieldTypes.GROUP:
            throw new Error("Group field type not supported in writeAny()");
            return;
        case fieldTypes.MESSAGE:
            throw new Error("Message field type not supported in writeAny()");
            return;
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
            this.writeSfixed32(field,
                value);
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
            goog.asserts.fail("Invalid field type in writeAny()");
            return
    }
};
ProtoWriter.prototype.writeUnsignedVarint32_ = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this._writer.uint32(value);
};
ProtoWriter.prototype.writeSignedVarint32_ = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this._writer.int32(value)
};
ProtoWriter.prototype.writeUnsignedVarint64_ = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this._writer.uint64(value)
};
ProtoWriter.prototype.writeSignedVarint64_ = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this._writer.int64(value)
};
ProtoWriter.prototype.writeZigzagVarint32_ = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this._writer.sint32(value)
};
ProtoWriter.prototype.writeZigzagVarint64_ = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this._writer.sint64(value)
};
ProtoWriter.prototype.writeZigzagVarint64String_ = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this._writer.sint64(value)
};
ProtoWriter.prototype.writeZigzagVarintHash64_ = function(field, value) {
    var long = util.longFromHash(value)
    this._writer.sint64(long)
};
ProtoWriter.prototype.writeInt32 = function(field, value) {
    if (value == null) return;
    this.writeSignedVarint32_(field, value)
};
ProtoWriter.prototype.writeInt32String = function(field, value) {
    if (value == null) return;
    var intValue = parseInt(value, 10);
    this.writeSignedVarint32_(field, intValue)
};
ProtoWriter.prototype.writeInt64 = function(field, value) {
    if (value == null) return;
    this.writeSignedVarint64_(field, value)
};
ProtoWriter.prototype.writeInt64String = function(field, value) {
    if (value == null) return;
    this.writeSignedVarint64_(field, value)
};
ProtoWriter.prototype.writeUint32 = function(field, value) {
    if (value == null) return;
    this.writeUnsignedVarint32_(field, value)
};
ProtoWriter.prototype.writeUint32String = function(field, value) {
    if (value == null) return;
    var intValue = parseInt(value, 10);
    this.writeUnsignedVarint32_(field, intValue)
};
ProtoWriter.prototype.writeUint64 = function(field, value) {
    if (value == null) return;
    this.writeUnsignedVarint64_(field, value)
};
ProtoWriter.prototype.writeUint64String = function(field, value) {
    if (value == null) return;
    this.writeSignedVarint64_(field, value)
};
ProtoWriter.prototype.writeSint32 = function(field, value) {
    if (value == null) return;
    this.writeZigzagVarint32_(field, value)
};
ProtoWriter.prototype.writeSint64 = function(field, value) {
    if (value == null) return;
    this.writeZigzagVarint64_(field, value)
};
ProtoWriter.prototype.writeSintHash64 = function(field, value) {
    if (value == null) return;
    this.writeZigzagVarintHash64_(field, value)
};
ProtoWriter.prototype.writeSint64String = function(field, value) {
    if (value == null) return;
    this.writeZigzagVarint64String_(field, value)
};
ProtoWriter.prototype.writeFixed32 = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED32);
    this._writer.fixed32(value)
};
ProtoWriter.prototype.writeFixed64 = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
    this.encoder_.fixed64(value)
};
ProtoWriter.prototype.writeFixed64String = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
    this.encoder_.fixed64(value)
};
ProtoWriter.prototype.writeSfixed32 = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED32);
    this._writer.sfixed32(value)
};
ProtoWriter.prototype.writeSfixed64 = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
    this._writer.sfixed64(value)
};
ProtoWriter.prototype.writeSfixed64String = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
    this._writer.sfixed64(value)
};
ProtoWriter.prototype.writeFloat = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED32);
    this._writer.float(value)
};
ProtoWriter.prototype.writeDouble = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
    this._writer.double(value)
};
ProtoWriter.prototype.writeBool = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this._writer.bool(value)
};
ProtoWriter.prototype.writeEnum = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this._writer.int32(value)
};
ProtoWriter.prototype.writeString = function(field, value) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.string(value);
};
ProtoWriter.prototype.writeBytes = function(field, value) {
    if (value == null) return;
    var bytes = byteSourceToUint8Array(value);
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.bytes(bytes);
};
ProtoWriter.prototype.writeMessage = function(field, value, writerCallback) {
    if (value == null) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    writerCallback(value, this);
    this._writer.ldelim()
};
ProtoWriter.prototype.writeMessageSet = function(field, value, writerCallback) {
    // Deprecated since proto1
    throw new Error("not supported")
};
ProtoWriter.prototype.writeGroup = function(field, value, writerCallback) {
    // Deprecated since proto1
    throw new Error("not supported")
};
ProtoWriter.prototype.writeFixedHash64 = function(field, value) {
    var long = util.longFromHash(value)
    this._writer.fixed64(long)
};
ProtoWriter.prototype.writeVarintHash64 = function(field, value) {
    var long = util.longFromHash(value)
    this._writer.uint64(long)
};
ProtoWriter.prototype.writeSplitFixed64 = function(field, lowBits, highBits) {
    var long = new util.LongBits(lowBits, highBits);
    this.writeFieldHeader_(field, BinaryConstants.WireType.FIXED64);
    this._writer.fixed64(long.toLong());
};
ProtoWriter.prototype.writeSplitVarint64 = function(field, lowBits, highBits) {
    var long = new util.LongBits(lowBits, highBits);
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this._writer.uint64(long.toLong());
};
ProtoWriter.prototype.writeSplitZigzagVarint64 = function(field, lowBits, highBits) {
    var long = new util.LongBits(lowBits, highBits);
    this.writeFieldHeader_(field, BinaryConstants.WireType.VARINT);
    this._writer.sint64(long.toLong());
};
ProtoWriter.prototype.writeRepeatedInt32 = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeSignedVarint32_(field, value[i])
};
ProtoWriter.prototype.writeRepeatedInt32String = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeInt32String(field, value[i])
};
ProtoWriter.prototype.writeRepeatedInt64 = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeSignedVarint64_(field, value[i])
};
ProtoWriter.prototype.writeRepeatedSplitFixed64 = function(field, value, lo, hi) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeSplitFixed64(field, lo(value[i]), hi(value[i]))
};
ProtoWriter.prototype.writeRepeatedSplitVarint64 = function(field, value, lo, hi) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeSplitVarint64(field, lo(value[i]), hi(value[i]))
};
ProtoWriter.prototype.writeRepeatedSplitZigzagVarint64 = function(field, value, lo, hi) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeSplitZigzagVarint64(field, lo(value[i]), hi(value[i]))
};
ProtoWriter.prototype.writeRepeatedInt64String = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeInt64String(field, value[i])
};
ProtoWriter.prototype.writeRepeatedUint32 = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeUnsignedVarint32_(field, value[i])
};
ProtoWriter.prototype.writeRepeatedUint32String = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeUint32String(field, value[i])
};
ProtoWriter.prototype.writeRepeatedUint64 = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeUnsignedVarint64_(field, value[i])
};
ProtoWriter.prototype.writeRepeatedUint64String = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeUint64String(field, value[i])
};
ProtoWriter.prototype.writeRepeatedSint32 = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeZigzagVarint32_(field, value[i])
};
ProtoWriter.prototype.writeRepeatedSint64 = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeZigzagVarint64_(field, value[i])
};
ProtoWriter.prototype.writeRepeatedSint64String = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeZigzagVarint64String_(field, value[i])
};
ProtoWriter.prototype.writeRepeatedSintHash64 = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeZigzagVarintHash64_(field, value[i])
};
ProtoWriter.prototype.writeRepeatedFixed32 = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeFixed32(field, value[i])
};
ProtoWriter.prototype.writeRepeatedFixed64 = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeFixed64(field, value[i])
};
ProtoWriter.prototype.writeRepeatedFixed64String = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeFixed64String(field, value[i])
};
ProtoWriter.prototype.writeRepeatedSfixed32 = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeSfixed32(field, value[i])
};
ProtoWriter.prototype.writeRepeatedSfixed64 = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeSfixed64(field, value[i])
};
ProtoWriter.prototype.writeRepeatedSfixed64String = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeSfixed64String(field, value[i])
};
ProtoWriter.prototype.writeRepeatedFloat = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeFloat(field, value[i])
};
ProtoWriter.prototype.writeRepeatedDouble = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeDouble(field, value[i])
};
ProtoWriter.prototype.writeRepeatedBool = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeBool(field, value[i])
};
ProtoWriter.prototype.writeRepeatedEnum = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeEnum(field, value[i])
};
ProtoWriter.prototype.writeRepeatedString = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeString(field, value[i])
};
ProtoWriter.prototype.writeRepeatedBytes = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeBytes(field, value[i])
};
ProtoWriter.prototype.writeRepeatedMessage = function(field, value, writerCallback) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) {
        this.writeMessage(field, value[i], writerCallback)
    }
};
ProtoWriter.prototype.writeRepeatedGroup = function(field, value, writerCallback) {
    // Deprecated since proto1
    throw new Error("not supported")
};
ProtoWriter.prototype.writeRepeatedFixedHash64 = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeFixedHash64(field, value[i])
};
ProtoWriter.prototype.writeRepeatedVarintHash64 = function(field, value) {
    if (value == null) return;
    for (var i = 0; i < value.length; i++) this.writeVarintHash64(field, value[i])
};
ProtoWriter.prototype.writePackedInt32 = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.int32(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedInt32String = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.int32(parseInt(value[i], 10));
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedInt64 = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.int64(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedSplitFixed64 = function(field, value, lo, hi) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) {
        var long = new util.LongBits(lo(value[i]), hi(value[i]));
        this._writer.fixed64(long.toLong());
    }
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedSplitVarint64 = function(field, value, lo, hi) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) {
        var long = new util.LongBits(lo(value[i]), hi(value[i]));
        this._writer.uint64(long.toLong());
    }
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedSplitZigzagVarint64 = function(field, value, lo, hi) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) {
        var long = new util.LongBits(lo(value[i]), hi(value[i]));
        this._writer.sint64(long.toLong());
    }
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedInt64String = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.int64(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedUint32 = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.uint32(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedUint32String = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.uint32(parseInt(value[i], 10));
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedUint64 = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.uint64(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedUint64String = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.uint64(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedSint32 = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.sint32(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedSint64 = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.sint64(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedSint64String = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.sint64(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedSintHash64 = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) {
        var long = util.longFromHash(value[i])
        this._writer.sint64(long);
    }
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedFixed32 = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.uint32(value.length * 4);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.fixed32(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedFixed64 = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.uint32(value.length * 8);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.fixed64(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedFixed64String = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.uint32(value.length * 8);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.fixed64(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedSfixed32 = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.uint32(value.length * 4);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.sfixed32(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedSfixed64 = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.uint32(value.length * 8);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.sfixed64(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedSfixed64String = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.uint32(value.length * 8);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.sfixed64(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedFloat = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.float(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedDouble = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.double(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedBool = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.bool(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedEnum = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) this._writer.int32(value[i]);
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedFixedHash64 = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) {
        var long = util.longFromHash(value[i])
        this._writer.fixed64(long);
    }
    this._writer.ldelim()
};
ProtoWriter.prototype.writePackedVarintHash64 = function(field, value) {
    if (value == null || !value.length) return;
    this.writeFieldHeader_(field, BinaryConstants.WireType.DELIMITED);
    this._writer.fork()
    for (var i = 0; i < value.length; i++) {
        var long = util.longFromHash(value[i])
        this._writer.uint64(long);
    }
    this._writer.ldelim()
};
module.exports = ProtoWriter;
