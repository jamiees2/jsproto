var BinaryConstants = {}
BinaryConstants.FieldType = {
    INVALID: -1,
    DOUBLE: 1,
    FLOAT: 2,
    INT64: 3,
    UINT64: 4,
    INT32: 5,
    FIXED64: 6,
    FIXED32: 7,
    BOOL: 8,
    STRING: 9,
    GROUP: 10,
    MESSAGE: 11,
    BYTES: 12,
    UINT32: 13,
    ENUM: 14,
    SFIXED32: 15,
    SFIXED64: 16,
    SINT32: 17,
    SINT64: 18,
    FHASH64: 30,
    VHASH64: 31
};
BinaryConstants.WireType = {
    INVALID: -1,
    VARINT: 0,
    FIXED64: 1,
    DELIMITED: 2,
    START_GROUP: 3,
    END_GROUP: 4,
    FIXED32: 5
};
BinaryConstants.FieldTypeToWireType = function(a) {
    var b = jspb.BinaryConstants.FieldType,
        c = jspb.BinaryConstants.WireType;
    switch (a) {
        case b.INT32:
        case b.INT64:
        case b.UINT32:
        case b.UINT64:
        case b.SINT32:
        case b.SINT64:
        case b.BOOL:
        case b.ENUM:
        case b.VHASH64:
            return c.VARINT;
        case b.DOUBLE:
        case b.FIXED64:
        case b.SFIXED64:
        case b.FHASH64:
            return c.FIXED64;
        case b.STRING:
        case b.MESSAGE:
        case b.BYTES:
            return c.DELIMITED;
        case b.FLOAT:
        case b.FIXED32:
        case b.SFIXED32:
            return c.FIXED32;
        default:
            return c.INVALID
    }
};
BinaryConstants.INVALID_FIELD_NUMBER = -1;
BinaryConstants.FLOAT32_EPS = 1.401298464324817E-45;
BinaryConstants.FLOAT32_MIN = 1.1754943508222875E-38;
BinaryConstants.FLOAT32_MAX = 3.4028234663852886E38;
BinaryConstants.FLOAT64_EPS = 4.9E-324;
BinaryConstants.FLOAT64_MIN = 2.2250738585072014E-308;
BinaryConstants.FLOAT64_MAX = 1.7976931348623157E308;
BinaryConstants.TWO_TO_20 = 1048576;
BinaryConstants.TWO_TO_23 = 8388608;
BinaryConstants.TWO_TO_31 = 2147483648;
BinaryConstants.TWO_TO_32 = 4294967296;
BinaryConstants.TWO_TO_52 = 4503599627370496;
BinaryConstants.TWO_TO_63 = 0x7fffffffffffffff;
BinaryConstants.TWO_TO_64 = 1.8446744073709552E19;
BinaryConstants.ZERO_HASH = "\x00\x00\x00\x00\x00\x00\x00\x00";
module.exports = BinaryConstants;
