"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtoWriter = exports.ProtoReader = exports.BinaryConstants = exports.configure = exports.util = exports.serialize = exports.deserialize = void 0;
const protobufjs = require("protobufjs");
const Long = require("long");
const pbjs_reader_1 = require("./pbjs_reader");
exports.ProtoReader = pbjs_reader_1.default;
const pbjs_writer_1 = require("./pbjs_writer");
exports.ProtoWriter = pbjs_writer_1.default;
const BinaryConstants = require("./constants");
exports.BinaryConstants = BinaryConstants;
// I'm sad that this needs to exist
// but basically there are places in jspb that will pass methods
// of the reader/writer around by prototype
// so jspb.BinaryWriter.prototype.readString gets passed around
// There's no great workaround for this, so I'm fixing for now by overriding the prototype
const enter = (jspb, jsproto) => {
    const old = jspb.prototype;
    jspb.prototype = jsproto.prototype;
    return old;
};
const exit = (jspb, old) => {
    jspb.prototype = old;
};
// Serialization
const deserialize = (protoClass, data, jspb, useLong = false) => {
    const old = enter(jspb.BinaryReader, pbjs_reader_1.default);
    try {
        const reader = new pbjs_reader_1.default(data, undefined, undefined, useLong);
        const instance = new protoClass();
        return protoClass.deserializeBinaryFromReader(instance, reader);
    }
    finally {
        exit(jspb.BinaryReader, old);
    }
};
exports.deserialize = deserialize;
const serialize = (protoClass, instance, jspb) => {
    const old = enter(jspb.BinaryWriter, pbjs_writer_1.default);
    try {
        const writer = new pbjs_writer_1.default();
        protoClass.serializeBinaryToWriter(instance, writer);
        return writer.getResultBuffer();
    }
    finally {
        exit(jspb.BinaryWriter, old);
    }
};
exports.serialize = serialize;
// Long is required to provide the same guarantees jspb provides
protobufjs.util.Long = Long;
protobufjs.configure();
exports.util = protobufjs.util;
exports.configure = protobufjs.configure;
//# sourceMappingURL=index.js.map