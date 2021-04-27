export declare enum FieldType {
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
    VHASH64 = 31
}
export declare enum WireType {
    INVALID = -1,
    VARINT = 0,
    FIXED64 = 1,
    DELIMITED = 2,
    START_GROUP = 3,
    END_GROUP = 4,
    FIXED32 = 5
}
export declare const FieldTypeToWireType: (fieldType: FieldType) => WireType;
export declare const INVALID_FIELD_NUMBER = -1;
export declare const FLOAT32_EPS = 1.401298464324817e-45;
export declare const FLOAT32_MIN = 1.1754943508222875e-38;
export declare const FLOAT32_MAX = 3.4028234663852886e+38;
export declare const FLOAT64_EPS = 5e-324;
export declare const FLOAT64_MIN = 2.2250738585072014e-308;
export declare const FLOAT64_MAX = 1.7976931348623157e+308;
export declare const TWO_TO_20 = 1048576;
export declare const TWO_TO_23 = 8388608;
export declare const TWO_TO_31 = 2147483648;
export declare const TWO_TO_32 = 4294967296;
export declare const TWO_TO_52 = 4503599627370496;
export declare const TWO_TO_63 = 9223372036854776000;
export declare const TWO_TO_64 = 18446744073709552000;
export declare const ZERO_HASH = "\0\0\0\0\0\0\0\0";
