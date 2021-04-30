import * as protobufjs from 'protobufjs';
import * as Long from 'long';
import type {BinaryReader, BinaryWriter, Message} from 'google-protobuf';

import ProtoReader from './pbjs_reader';
import ProtoWriter from './pbjs_writer';
import * as BinaryConstants from './constants';
import {ByteSource} from './types';

export type MessageClass<T> = {
  new (): T;
  deserializeBinary(buf: Uint8Array): T;
  deserializeBinaryFromReader(message: T, reader: BinaryReader): T;
  serializeBinaryToWriter(message: T, writer: BinaryWriter): void;
};

type OverridableClass = {
  prototype: object;
};

// I'm sad that this needs to exist
// but basically there are places in jspb that will pass methods
// of the reader/writer around by prototype
// so jspb.BinaryWriter.prototype.readString gets passed around
// There's no great workaround for this, so I'm fixing for now by overriding the prototype
const enter = (jspb: OverridableClass, jsproto: OverridableClass): object => {
  const old = jspb.prototype;
  jspb.prototype = jsproto.prototype;
  return old;
};

const exit = (jspb: OverridableClass, old: object) => {
  jspb.prototype = old;
};

// Serialization
export const deserialize = <T extends Message>(
  protoClass: MessageClass<T>,
  data: ByteSource,
  binaryReaderClass: object,
  useLong = false
) => {
  const old = enter(
    <OverridableClass>(<unknown>binaryReaderClass),
    ProtoReader
  );
  try {
    const reader = new ProtoReader(data, undefined, undefined, useLong);
    const instance = new protoClass();
    return protoClass.deserializeBinaryFromReader(instance, reader);
  } finally {
    exit(<OverridableClass>(<unknown>binaryReaderClass), old);
  }
};

export const serialize = <T extends Message>(
  protoClass: MessageClass<T>,
  instance: T,
  binaryWriterClass: object
) => {
  const old = enter(
    <OverridableClass>(<unknown>binaryWriterClass),
    ProtoWriter
  );
  try {
    const writer = new ProtoWriter();
    protoClass.serializeBinaryToWriter(instance, writer);
    return writer.getResultBuffer();
  } finally {
    exit(<OverridableClass>(<unknown>binaryWriterClass), old);
  }
};

// Long is required to provide the same guarantees jspb provides
protobufjs.util.Long = Long;
protobufjs.configure();

export const util = protobufjs.util;
export const configure = protobufjs.configure;

export {BinaryConstants, ProtoReader, ProtoWriter};
