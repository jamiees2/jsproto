"use strict";
var jsproto = exports;

// Serialization
jsproto.ProtoReader = require("./pbjs_reader");
jsproto.ProtoWriter = require("./pbjs_writer");

// I'm sad that this needs to exist
// but basically there are places in jspb that will pass methods 
// of the reader/writer around by prototype
// so jspb.BinaryWriter.prototype.readString gets passed around
// There's no great workaround for this, so I'm fixing for now by overriding the prototype
jsproto.enter = function(jspb, jsproto) {
    var old = jspb.prototype;
    jspb.prototype = jsproto.prototype;
    return old;
}

jsproto.exit = function(jspb, old) {
    jspb.prototype = old;
}

jsproto.serialize = function(protoClass, instance, jspb) {
    var old = jsproto.enter(jspb.BinaryWriter, jsproto.ProtoWriter);
    try {
      var writer = new jsproto.ProtoWriter();
      protoClass.serializeBinaryToWriter(instance, writer);
      return writer.getResultBuffer();
    } finally {
      jsproto.exit(jspb.BinaryWriter, old);
    }
}
jsproto.deserialize = function(protoClass, data, jspb) {
    var old = jsproto.enter(jspb.BinaryReader, jsproto.ProtoReader);
    try {
      var reader = new jsproto.ProtoReader(data);
      var instance = new protoClass();
      return protoClass.deserializeBinaryFromReader(instance, reader);
    } finally {
      jsproto.exit(jspb.BinaryReader, old);
    }
}

// Utility
jsproto.util      = require("protobufjs").util;
// Long is required to provide the same guarantees jspb provides
jsproto.util.Long = require("long");
jsproto.configure = require("protobufjs").configure;
jsproto.configure();
