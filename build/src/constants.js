"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZERO_HASH = exports.TWO_TO_64 = exports.TWO_TO_63 = exports.TWO_TO_52 = exports.TWO_TO_32 = exports.TWO_TO_31 = exports.TWO_TO_23 = exports.TWO_TO_20 = exports.FLOAT64_MAX = exports.FLOAT64_MIN = exports.FLOAT64_EPS = exports.FLOAT32_MAX = exports.FLOAT32_MIN = exports.FLOAT32_EPS = exports.INVALID_FIELD_NUMBER = exports.FieldTypeToWireType = exports.WireType = exports.FieldType = void 0;
var FieldType;
(function (FieldType) {
    FieldType[FieldType["INVALID"] = -1] = "INVALID";
    FieldType[FieldType["DOUBLE"] = 1] = "DOUBLE";
    FieldType[FieldType["FLOAT"] = 2] = "FLOAT";
    FieldType[FieldType["INT64"] = 3] = "INT64";
    FieldType[FieldType["UINT64"] = 4] = "UINT64";
    FieldType[FieldType["INT32"] = 5] = "INT32";
    FieldType[FieldType["FIXED64"] = 6] = "FIXED64";
    FieldType[FieldType["FIXED32"] = 7] = "FIXED32";
    FieldType[FieldType["BOOL"] = 8] = "BOOL";
    FieldType[FieldType["STRING"] = 9] = "STRING";
    FieldType[FieldType["GROUP"] = 10] = "GROUP";
    FieldType[FieldType["MESSAGE"] = 11] = "MESSAGE";
    FieldType[FieldType["BYTES"] = 12] = "BYTES";
    FieldType[FieldType["UINT32"] = 13] = "UINT32";
    FieldType[FieldType["ENUM"] = 14] = "ENUM";
    FieldType[FieldType["SFIXED32"] = 15] = "SFIXED32";
    FieldType[FieldType["SFIXED64"] = 16] = "SFIXED64";
    FieldType[FieldType["SINT32"] = 17] = "SINT32";
    FieldType[FieldType["SINT64"] = 18] = "SINT64";
    FieldType[FieldType["FHASH64"] = 30] = "FHASH64";
    FieldType[FieldType["VHASH64"] = 31] = "VHASH64";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
var WireType;
(function (WireType) {
    WireType[WireType["INVALID"] = -1] = "INVALID";
    WireType[WireType["VARINT"] = 0] = "VARINT";
    WireType[WireType["FIXED64"] = 1] = "FIXED64";
    WireType[WireType["DELIMITED"] = 2] = "DELIMITED";
    WireType[WireType["START_GROUP"] = 3] = "START_GROUP";
    WireType[WireType["END_GROUP"] = 4] = "END_GROUP";
    WireType[WireType["FIXED32"] = 5] = "FIXED32";
})(WireType = exports.WireType || (exports.WireType = {}));
const FieldTypeToWireType = (fieldType) => {
    switch (fieldType) {
        case FieldType.INT32:
        case FieldType.INT64:
        case FieldType.UINT32:
        case FieldType.UINT64:
        case FieldType.SINT32:
        case FieldType.SINT64:
        case FieldType.BOOL:
        case FieldType.ENUM:
        case FieldType.VHASH64:
            return WireType.VARINT;
        case FieldType.DOUBLE:
        case FieldType.FIXED64:
        case FieldType.SFIXED64:
        case FieldType.FHASH64:
            return WireType.FIXED64;
        case FieldType.STRING:
        case FieldType.MESSAGE:
        case FieldType.BYTES:
            return WireType.DELIMITED;
        case FieldType.FLOAT:
        case FieldType.FIXED32:
        case FieldType.SFIXED32:
            return WireType.FIXED32;
        default:
            return WireType.INVALID;
    }
};
exports.FieldTypeToWireType = FieldTypeToWireType;
exports.INVALID_FIELD_NUMBER = -1;
exports.FLOAT32_EPS = 1.401298464324817e-45;
exports.FLOAT32_MIN = 1.1754943508222875e-38;
exports.FLOAT32_MAX = 3.4028234663852886e38;
exports.FLOAT64_EPS = 4.9e-324;
exports.FLOAT64_MIN = 2.2250738585072014e-308;
exports.FLOAT64_MAX = 1.7976931348623157e308;
exports.TWO_TO_20 = 1048576;
exports.TWO_TO_23 = 8388608;
exports.TWO_TO_31 = 2147483648;
exports.TWO_TO_32 = 4294967296;
exports.TWO_TO_52 = 4503599627370496;
exports.TWO_TO_63 = 0x7fffffffffffffff;
exports.TWO_TO_64 = 1.8446744073709552e19;
exports.ZERO_HASH = '\x00\x00\x00\x00\x00\x00\x00\x00';
//# sourceMappingURL=constants.js.map