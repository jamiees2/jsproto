"use strict";

// NOTE: This benchmark partly compares apples and oranges in that it measures protocol buffers,
// which is purely a binary format, and JSON, which is purely a string format.
//
// This matters because strings aren't actually transfered over the network but must still be
// converted to binary somewhere down the road. Because this can't be measured reliably, this
// benchmark compares both pure string performance of JSON and additional binary conversion of the
// same data using node buffers. Actual JSON performance on the network level should be somewhere
// in between.
var lodash = require("lodash");
var payload   = require("../bench/data/bench.json");
var Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from || function(value, encoding) { return new Buffer(value, encoding); };

var ProtoReader = require("../src/index").ProtoReader
var ProtoWriter = require("../src/index").ProtoWriter

// protobuf.js dynamic: load the proto and set up a buffer
var pbjsCls = require("protobufjs").loadSync(require.resolve("../bench/data/bench.proto")).resolveAll().lookup("Test");
var pbjsMsg = payload; // alt: pbjsCls.fromObject(payload);
var pbjsBuf = pbjsCls.encode(pbjsMsg).finish();
// google-protobuf: load the proto, set up an Uint8Array and a message
var jspbCls = require("../bench/data/static_jspb.js").Test;
var jspbBuf = new Uint8Array(Array.prototype.slice.call(pbjsBuf));
var jspbMsg = jspbCls.deserializeBinary(jspbBuf);


var writer = new ProtoWriter();
jspbCls.serializeBinaryToWriter(jspbMsg, writer);
var buf = writer.getResultBuffer()
console.log(buf);

var reader = new ProtoReader(jspbBuf);
var instance = new jspbCls()
jspbCls.deserializeBinaryFromReader(instance, reader);
console.log(JSON.stringify(instance.toObject()))
console.log("deserialize(serialize(payload)) === payload", lodash.isEqual(instance.toObject(), jspbMsg.toObject()))

