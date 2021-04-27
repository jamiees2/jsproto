import type {ByteSource} from './types';
import {util} from 'protobufjs';

export const byteSourceToUint8Array = (
  data: ByteSource
): Uint8Array | Buffer => {
  if (data.constructor === Uint8Array || data.constructor === Buffer) {
    return data;
  }

  if (data.constructor === ArrayBuffer) {
    return new Uint8Array(data);
  }

  if (data.constructor === Array) {
    return new Uint8Array(data);
  }

  if (data.constructor === String) {
    const buf = new Uint8Array(util.base64.length(data));
    util.base64.decode(data, buf, 0);
    return buf;
  }

  return new Uint8Array(0);
};
