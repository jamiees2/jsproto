# jsproto

A wrapper for protobuf.js to be able to use their much faster parsers with google's officially supported javascript protobuf library.

## Usage:

Serialization:
```js
const proto = new RequestMessageP();
const serialized = jsproto.serialize(proto.constructor, proto, jspb); // Returns type Buffer in node.js, otherwise Uint8Array, like protobuf.js
```

Deserialization:
```js
const data = new Buffer(...)
const deserialized = jsproto.deserialize(ResponseMessageP, data, jspb); // returns an instance of ResponseMessageP
```
