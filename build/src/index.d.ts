import * as protobufjs from 'protobufjs';
import type { BinaryReader, BinaryWriter, Message } from 'google-protobuf';
import ProtoReader from './pbjs_reader';
import ProtoWriter from './pbjs_writer';
import * as BinaryConstants from './constants';
import { ByteSource } from './types';
declare type HasBinaryReader = {
    BinaryReader: BinaryReader;
};
declare type HasBinaryWriter = {
    BinaryWriter: BinaryWriter;
};
declare type MessageClass<T> = {
    new (): T;
    deserializeBinary(buf: Uint8Array): T;
    deserializeBinaryFromReader(message: T, reader: BinaryReader): T;
    serializeBinaryToWriter(message: T, writer: BinaryWriter): void;
};
export declare const deserialize: <T extends Message>(protoClass: MessageClass<T>, data: ByteSource, jspb: HasBinaryReader, useLong?: boolean) => T;
export declare const serialize: <T extends Message>(protoClass: MessageClass<T>, instance: T, jspb: HasBinaryWriter) => Uint8Array;
export declare const util: typeof protobufjs.util;
export declare const configure: typeof protobufjs.configure;
export { BinaryConstants, ProtoReader, ProtoWriter };
