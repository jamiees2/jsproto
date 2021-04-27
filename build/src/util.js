"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.byteSourceToUint8Array = void 0;
const protobufjs_1 = require("protobufjs");
const byteSourceToUint8Array = (data) => {
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
        const buf = new Uint8Array(protobufjs_1.util.base64.length(data));
        protobufjs_1.util.base64.decode(data, buf, 0);
        return buf;
    }
    return new Uint8Array(0);
};
exports.byteSourceToUint8Array = byteSourceToUint8Array;
//# sourceMappingURL=util.js.map