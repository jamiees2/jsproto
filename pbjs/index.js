'use strict';

// NOTE: This benchmark partly compares apples and oranges in that it measures protocol buffers,
// which is purely a binary format, and JSON, which is purely a string format.
//
// This matters because strings aren't actually transfered over the network but must still be
// converted to binary somewhere down the road. Because this can't be measured reliably, this
// benchmark compares both pure string performance of JSON and additional binary conversion of the
// same data using node buffers. Actual JSON performance on the network level should be somewhere
// in between.
const lodash = require('lodash');
const payload = require('../bench/data/bench.json');

const ProtoReader = require('..').ProtoReader;
const ProtoWriter = require('..').ProtoWriter;

// protobuf.js dynamic: load the proto and set up a buffer
const pbjsCls = require('protobufjs')
  .loadSync(require.resolve('../bench/data/bench.proto'))
  .resolveAll()
  .lookup('Test');
const pbjsMsg = payload; // alt: pbjsCls.fromObject(payload);
const pbjsBuf = pbjsCls.encode(pbjsMsg).finish();
// google-protobuf: load the proto, set up an Uint8Array and a message
const jspbCls = require('../bench/data/static_jspb.js').Test;
const jspbBuf = new Uint8Array(Array.prototype.slice.call(pbjsBuf));
const jspbMsg = jspbCls.deserializeBinary(jspbBuf);

const writer = new ProtoWriter();
jspbCls.serializeBinaryToWriter(jspbMsg, writer);
const buf = writer.getResultBuffer();
console.log(buf);

const reader = new ProtoReader(jspbBuf);
const instance = new jspbCls();
jspbCls.deserializeBinaryFromReader(instance, reader);
console.log(JSON.stringify(instance.toObject()));
console.log(
  'deserialize(serialize(payload)) === payload',
  lodash.isEqual(instance.toObject(), jspbMsg.toObject())
);
