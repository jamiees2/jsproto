'use strict';

// NOTE: This benchmark partly compares apples and oranges in that it measures protocol buffers,
// which is purely a binary format, and JSON, which is purely a string format.
//
// This matters because strings aren't actually transfered over the network but must still be
// converted to binary somewhere down the road. Because this can't be measured reliably, this
// benchmark compares both pure string performance of JSON and additional binary conversion of the
// same data using node buffers. Actual JSON performance on the network level should be somewhere
// in between.

const newSuite = require('./suite'),
  payload = require('./data/bench.json');

// protobuf.js dynamic: load the proto and set up a buffer
const pbjsCls = require('protobufjs')
  .loadSync(require.resolve('./data/bench.proto'))
  .resolveAll()
  .lookup('Test');
const pbjsMsg = payload; // alt: pbjsCls.fromObject(payload);
const pbjsBuf = pbjsCls.encode(pbjsMsg).finish();

const ProtoReader = require('..').ProtoReader;
const ProtoWriter = require('..').ProtoWriter;

// protobuf.js static: load the proto
const pbjsStaticCls = require('./data/static_pbjs.js').Test;

// JSON: set up a string and a buffer
const jsonMsg = payload;
const jsonStr = JSON.stringify(jsonMsg);
const jsonBuf = Buffer.from(jsonStr, 'utf8');

// google-protobuf: load the proto, set up an Uint8Array and a message
const jspbCls = require('./data/static_jspb.js').Test;
const jspbBuf = new Uint8Array(Array.prototype.slice.call(pbjsBuf));
const jspbMsg = jspbCls.deserializeBinary(jspbBuf);

newSuite('encoding')
  .add('protobuf.js (reflect)', () => {
    pbjsCls.encode(pbjsMsg).finish();
  })
  .add('protobuf.js (static)', () => {
    pbjsStaticCls.encode(pbjsMsg).finish();
  })
  .add('JSON (string)', () => {
    JSON.stringify(jsonMsg);
  })
  .add('JSON (buffer)', () => {
    Buffer.from(JSON.stringify(jsonMsg), 'utf8');
  })
  .add('google-protobuf', () => {
    jspbMsg.serializeBinary();
  })
  .add('google-protobuf (protobufjs)', () => {
    const writer = new ProtoWriter();
    jspbCls.serializeBinaryToWriter(jspbMsg, writer);
    writer.getResultBuffer();
  })
  .run();

newSuite('decoding')
  .add('protobuf.js (reflect)', () => {
    pbjsCls.decode(pbjsBuf); // no allocation overhead, if you wondered
  })
  .add('protobuf.js (static)', () => {
    pbjsStaticCls.decode(pbjsBuf);
  })
  .add('JSON (string)', () => {
    JSON.parse(jsonStr);
  })
  .add('JSON (buffer)', () => {
    JSON.parse(jsonBuf.toString('utf8'));
  })
  .add('google-protobuf', () => {
    jspbCls.deserializeBinary(jspbBuf);
  })
  .add('google-protobuf (protobufjs)', () => {
    const reader = new ProtoReader(jspbBuf);
    const instance = new jspbCls();
    jspbCls.deserializeBinaryFromReader(instance, reader);
  })
  .run();

newSuite('combined')
  .add('protobuf.js (reflect)', () => {
    pbjsCls.decode(pbjsCls.encode(pbjsMsg).finish());
  })
  .add('protobuf.js (static)', () => {
    pbjsStaticCls.decode(pbjsStaticCls.encode(pbjsMsg).finish());
  })
  .add('JSON (string)', () => {
    JSON.parse(JSON.stringify(jsonMsg));
  })
  .add('JSON (buffer)', () => {
    JSON.parse(Buffer.from(JSON.stringify(jsonMsg), 'utf8').toString('utf8'));
  })
  .add('google-protobuf', () => {
    jspbCls.deserializeBinary(jspbMsg.serializeBinary());
  })
  .add('google-protobuf (protobufjs)', () => {
    const writer = new ProtoWriter();
    jspbCls.serializeBinaryToWriter(jspbMsg, writer);
    const buf = writer.getResultBuffer();
    const reader = new ProtoReader(buf);
    const instance = new jspbCls();
    jspbCls.deserializeBinaryFromReader(instance, reader);
  })
  .run();
