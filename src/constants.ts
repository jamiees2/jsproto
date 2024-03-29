export enum FieldType {
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
export enum WireType {
  INVALID = -1,
  VARINT = 0,
  FIXED64 = 1,
  DELIMITED = 2,
  START_GROUP = 3,
  END_GROUP = 4,
  FIXED32 = 5,
}
export const FieldTypeToWireType = (fieldType: FieldType): WireType => {
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

export const INVALID_FIELD_NUMBER = -1;
export const FLOAT32_EPS = 1.401298464324817e-45;
export const FLOAT32_MIN = 1.1754943508222875e-38;
export const FLOAT32_MAX = 3.4028234663852886e38;
export const FLOAT64_EPS = 4.9e-324;
export const FLOAT64_MIN = 2.2250738585072014e-308;
export const FLOAT64_MAX = 1.7976931348623157e308;
export const TWO_TO_20 = 1048576;
export const TWO_TO_23 = 8388608;
export const TWO_TO_31 = 2147483648;
export const TWO_TO_32 = 4294967296;
export const TWO_TO_52 = 4503599627370496;
export const TWO_TO_63 = 0x7fffffffffffffff;
export const TWO_TO_64 = 1.8446744073709552e19;
export const ZERO_HASH = '\x00\x00\x00\x00\x00\x00\x00\x00';
