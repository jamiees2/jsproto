import {BinaryReader, BinaryWriter} from 'google-protobuf';

export type ByteSource = ArrayBuffer | Uint8Array | number[] | string;
export type ScalarFieldType = boolean | number | string;
export type RepeatedFieldType = ScalarFieldType[] | Uint8Array[];
export type AnyFieldType = ScalarFieldType | RepeatedFieldType | Uint8Array;
export type FieldValue =
  | string
  | number
  | boolean
  | Uint8Array
  | FieldValueArray
  | undefined;
type FieldValueArray = Array<FieldValue>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyType = any;

export type BinaryReadValue = AnyType;
export type BinaryReadReader = (
  msg: BinaryReadValue,
  binaryReader: BinaryReader
) => void;
export type BinaryReadCallback = (reader: BinaryReader) => BinaryReadValue;

export type BinaryWriteValue = AnyType;
export type BinaryWriteCallback = (
  value: BinaryWriteValue,
  binaryWriter: BinaryWriter
) => void;

export type SplitType = object;
export type SplitConverter = (hi: number, lo: number) => SplitType;
export type SplitReverseConverter = (a: SplitType) => number;
