// source: bench.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

const jspb = require('google-protobuf');
const goog = jspb;
const global = Function('return this')();

goog.exportSymbol('proto.Outer', null, global);
goog.exportSymbol('proto.Test', null, global);
goog.exportSymbol('proto.Test.Enum', null, global);
goog.exportSymbol('proto.Test.Inner', null, global);
goog.exportSymbol('proto.Test.Inner.InnerInner', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Test = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Test, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Test.displayName = 'proto.Test';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Test.Inner = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Test.Inner, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Test.Inner.displayName = 'proto.Test.Inner';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Test.Inner.InnerInner = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Test.Inner.InnerInner, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Test.Inner.InnerInner.displayName = 'proto.Test.Inner.InnerInner';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Outer = function (opt_data) {
  jspb.Message.initialize(
    this,
    opt_data,
    0,
    -1,
    proto.Outer.repeatedFields_,
    null
  );
};
goog.inherits(proto.Outer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Outer.displayName = 'proto.Outer';
}

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.Test.prototype.toObject = function (opt_includeInstance) {
    return proto.Test.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.Test} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.Test.toObject = function (includeInstance, msg) {
    let f,
      obj = {
        string: jspb.Message.getFieldWithDefault(msg, 1, ''),
        uint32: jspb.Message.getFieldWithDefault(msg, 2, 0),
        inner:
          (f = msg.getInner()) && proto.Test.Inner.toObject(includeInstance, f),
        pb_float: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Test}
 */
proto.Test.deserializeBinary = function (bytes) {
  const reader = new jspb.BinaryReader(bytes);
  const msg = new proto.Test();
  return proto.Test.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Test} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Test}
 */
proto.Test.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    const field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setString(value);
        break;
      case 2:
        var value = /** @type {number} */ (reader.readUint32());
        msg.setUint32(value);
        break;
      case 3:
        var value = new proto.Test.Inner();
        reader.readMessage(value, proto.Test.Inner.deserializeBinaryFromReader);
        msg.setInner(value);
        break;
      case 4:
        var value = /** @type {number} */ (reader.readFloat());
        msg.setFloat(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Test.prototype.serializeBinary = function () {
  const writer = new jspb.BinaryWriter();
  proto.Test.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Test} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Test.serializeBinaryToWriter = function (message, writer) {
  let f = undefined;
  f = message.getString();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
  f = message.getUint32();
  if (f !== 0) {
    writer.writeUint32(2, f);
  }
  f = message.getInner();
  if (f != null) {
    writer.writeMessage(3, f, proto.Test.Inner.serializeBinaryToWriter);
  }
  f = message.getFloat();
  if (f !== 0.0) {
    writer.writeFloat(4, f);
  }
};

/**
 * @enum {number}
 */
proto.Test.Enum = {
  ONE: 0,
  TWO: 1,
  THREE: 2,
  FOUR: 3,
  FIVE: 4,
};

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.Test.Inner.prototype.toObject = function (opt_includeInstance) {
    return proto.Test.Inner.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.Test.Inner} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.Test.Inner.toObject = function (includeInstance, msg) {
    let f,
      obj = {
        int32: jspb.Message.getFieldWithDefault(msg, 1, 0),
        innerinner:
          (f = msg.getInnerinner()) &&
          proto.Test.Inner.InnerInner.toObject(includeInstance, f),
        outer: (f = msg.getOuter()) && proto.Outer.toObject(includeInstance, f),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Test.Inner}
 */
proto.Test.Inner.deserializeBinary = function (bytes) {
  const reader = new jspb.BinaryReader(bytes);
  const msg = new proto.Test.Inner();
  return proto.Test.Inner.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Test.Inner} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Test.Inner}
 */
proto.Test.Inner.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    const field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {number} */ (reader.readInt32());
        msg.setInt32(value);
        break;
      case 2:
        var value = new proto.Test.Inner.InnerInner();
        reader.readMessage(
          value,
          proto.Test.Inner.InnerInner.deserializeBinaryFromReader
        );
        msg.setInnerinner(value);
        break;
      case 3:
        var value = new proto.Outer();
        reader.readMessage(value, proto.Outer.deserializeBinaryFromReader);
        msg.setOuter(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Test.Inner.prototype.serializeBinary = function () {
  const writer = new jspb.BinaryWriter();
  proto.Test.Inner.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Test.Inner} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Test.Inner.serializeBinaryToWriter = function (message, writer) {
  let f = undefined;
  f = message.getInt32();
  if (f !== 0) {
    writer.writeInt32(1, f);
  }
  f = message.getInnerinner();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.Test.Inner.InnerInner.serializeBinaryToWriter
    );
  }
  f = message.getOuter();
  if (f != null) {
    writer.writeMessage(3, f, proto.Outer.serializeBinaryToWriter);
  }
};

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.Test.Inner.InnerInner.prototype.toObject = function (
    opt_includeInstance
  ) {
    return proto.Test.Inner.InnerInner.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.Test.Inner.InnerInner} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.Test.Inner.InnerInner.toObject = function (includeInstance, msg) {
    let f,
      obj = {
        pb_long: jspb.Message.getFieldWithDefault(msg, 1, 0),
        pb_enum: jspb.Message.getFieldWithDefault(msg, 2, 0),
        sint32: jspb.Message.getFieldWithDefault(msg, 3, 0),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Test.Inner.InnerInner}
 */
proto.Test.Inner.InnerInner.deserializeBinary = function (bytes) {
  const reader = new jspb.BinaryReader(bytes);
  const msg = new proto.Test.Inner.InnerInner();
  return proto.Test.Inner.InnerInner.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Test.Inner.InnerInner} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Test.Inner.InnerInner}
 */
proto.Test.Inner.InnerInner.deserializeBinaryFromReader = function (
  msg,
  reader
) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    const field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {number} */ (reader.readInt64());
        msg.setLong(value);
        break;
      case 2:
        var value = /** @type {!proto.Test.Enum} */ (reader.readEnum());
        msg.setEnum(value);
        break;
      case 3:
        var value = /** @type {number} */ (reader.readSint32());
        msg.setSint32(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Test.Inner.InnerInner.prototype.serializeBinary = function () {
  const writer = new jspb.BinaryWriter();
  proto.Test.Inner.InnerInner.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Test.Inner.InnerInner} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Test.Inner.InnerInner.serializeBinaryToWriter = function (
  message,
  writer
) {
  let f = undefined;
  f = message.getLong();
  if (f !== 0) {
    writer.writeInt64(1, f);
  }
  f = message.getEnum();
  if (f !== 0.0) {
    writer.writeEnum(2, f);
  }
  f = message.getSint32();
  if (f !== 0) {
    writer.writeSint32(3, f);
  }
};

/**
 * optional int64 long = 1;
 * @return {number}
 */
proto.Test.Inner.InnerInner.prototype.getLong = function () {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};

/**
 * @param {number} value
 * @return {!proto.Test.Inner.InnerInner} returns this
 */
proto.Test.Inner.InnerInner.prototype.setLong = function (value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};

/**
 * optional Enum enum = 2;
 * @return {!proto.Test.Enum}
 */
proto.Test.Inner.InnerInner.prototype.getEnum = function () {
  return /** @type {!proto.Test.Enum} */ (jspb.Message.getFieldWithDefault(
    this,
    2,
    0
  ));
};

/**
 * @param {!proto.Test.Enum} value
 * @return {!proto.Test.Inner.InnerInner} returns this
 */
proto.Test.Inner.InnerInner.prototype.setEnum = function (value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};

/**
 * optional sint32 sint32 = 3;
 * @return {number}
 */
proto.Test.Inner.InnerInner.prototype.getSint32 = function () {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};

/**
 * @param {number} value
 * @return {!proto.Test.Inner.InnerInner} returns this
 */
proto.Test.Inner.InnerInner.prototype.setSint32 = function (value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};

/**
 * optional int32 int32 = 1;
 * @return {number}
 */
proto.Test.Inner.prototype.getInt32 = function () {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};

/**
 * @param {number} value
 * @return {!proto.Test.Inner} returns this
 */
proto.Test.Inner.prototype.setInt32 = function (value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};

/**
 * optional InnerInner innerInner = 2;
 * @return {?proto.Test.Inner.InnerInner}
 */
proto.Test.Inner.prototype.getInnerinner = function () {
  return /** @type{?proto.Test.Inner.InnerInner} */ (jspb.Message.getWrapperField(
    this,
    proto.Test.Inner.InnerInner,
    2
  ));
};

/**
 * @param {?proto.Test.Inner.InnerInner|undefined} value
 * @return {!proto.Test.Inner} returns this
 */
proto.Test.Inner.prototype.setInnerinner = function (value) {
  return jspb.Message.setWrapperField(this, 2, value);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.Test.Inner} returns this
 */
proto.Test.Inner.prototype.clearInnerinner = function () {
  return this.setInnerinner(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Test.Inner.prototype.hasInnerinner = function () {
  return jspb.Message.getField(this, 2) != null;
};

/**
 * optional Outer outer = 3;
 * @return {?proto.Outer}
 */
proto.Test.Inner.prototype.getOuter = function () {
  return /** @type{?proto.Outer} */ (jspb.Message.getWrapperField(
    this,
    proto.Outer,
    3
  ));
};

/**
 * @param {?proto.Outer|undefined} value
 * @return {!proto.Test.Inner} returns this
 */
proto.Test.Inner.prototype.setOuter = function (value) {
  return jspb.Message.setWrapperField(this, 3, value);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.Test.Inner} returns this
 */
proto.Test.Inner.prototype.clearOuter = function () {
  return this.setOuter(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Test.Inner.prototype.hasOuter = function () {
  return jspb.Message.getField(this, 3) != null;
};

/**
 * optional string string = 1;
 * @return {string}
 */
proto.Test.prototype.getString = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ''));
};

/**
 * @param {string} value
 * @return {!proto.Test} returns this
 */
proto.Test.prototype.setString = function (value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional uint32 uint32 = 2;
 * @return {number}
 */
proto.Test.prototype.getUint32 = function () {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};

/**
 * @param {number} value
 * @return {!proto.Test} returns this
 */
proto.Test.prototype.setUint32 = function (value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};

/**
 * optional Inner inner = 3;
 * @return {?proto.Test.Inner}
 */
proto.Test.prototype.getInner = function () {
  return /** @type{?proto.Test.Inner} */ (jspb.Message.getWrapperField(
    this,
    proto.Test.Inner,
    3
  ));
};

/**
 * @param {?proto.Test.Inner|undefined} value
 * @return {!proto.Test} returns this
 */
proto.Test.prototype.setInner = function (value) {
  return jspb.Message.setWrapperField(this, 3, value);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.Test} returns this
 */
proto.Test.prototype.clearInner = function () {
  return this.setInner(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Test.prototype.hasInner = function () {
  return jspb.Message.getField(this, 3) != null;
};

/**
 * optional float float = 4;
 * @return {number}
 */
proto.Test.prototype.getFloat = function () {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(
    this,
    4,
    0.0
  ));
};

/**
 * @param {number} value
 * @return {!proto.Test} returns this
 */
proto.Test.prototype.setFloat = function (value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.Outer.repeatedFields_ = [1];

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.Outer.prototype.toObject = function (opt_includeInstance) {
    return proto.Outer.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.Outer} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.Outer.toObject = function (includeInstance, msg) {
    let f,
      obj = {
        boolList:
          (f = jspb.Message.getRepeatedBooleanField(msg, 1)) == null
            ? undefined
            : f,
        pb_double: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
        bytes: msg.getBytes_asB64(),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Outer}
 */
proto.Outer.deserializeBinary = function (bytes) {
  const reader = new jspb.BinaryReader(bytes);
  const msg = new proto.Outer();
  return proto.Outer.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Outer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Outer}
 */
proto.Outer.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    const field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {!Array<boolean>} */ (reader.readPackedBool());
        msg.setBoolList(value);
        break;
      case 2:
        var value = /** @type {number} */ (reader.readDouble());
        msg.setDouble(value);
        break;
      case 3:
        var value = /** @type {!Uint8Array} */ (reader.readBytes());
        msg.setBytes(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Outer.prototype.serializeBinary = function () {
  const writer = new jspb.BinaryWriter();
  proto.Outer.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Outer} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Outer.serializeBinaryToWriter = function (message, writer) {
  let f = undefined;
  f = message.getBoolList();
  if (f.length > 0) {
    writer.writePackedBool(1, f);
  }
  f = message.getDouble();
  if (f !== 0.0) {
    writer.writeDouble(2, f);
  }
  f = message.getBytes_asU8();
  if (f.length > 0) {
    writer.writeBytes(3, f);
  }
};

/**
 * repeated bool bool = 1;
 * @return {!Array<boolean>}
 */
proto.Outer.prototype.getBoolList = function () {
  return /** @type {!Array<boolean>} */ (jspb.Message.getRepeatedBooleanField(
    this,
    1
  ));
};

/**
 * @param {!Array<boolean>} value
 * @return {!proto.Outer} returns this
 */
proto.Outer.prototype.setBoolList = function (value) {
  return jspb.Message.setField(this, 1, value || []);
};

/**
 * @param {boolean} value
 * @param {number=} opt_index
 * @return {!proto.Outer} returns this
 */
proto.Outer.prototype.addBool = function (value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};

/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Outer} returns this
 */
proto.Outer.prototype.clearBoolList = function () {
  return this.setBoolList([]);
};

/**
 * optional double double = 2;
 * @return {number}
 */
proto.Outer.prototype.getDouble = function () {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(
    this,
    2,
    0.0
  ));
};

/**
 * @param {number} value
 * @return {!proto.Outer} returns this
 */
proto.Outer.prototype.setDouble = function (value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};

/**
 * optional bytes bytes = 3;
 * @return {!(string|Uint8Array)}
 */
proto.Outer.prototype.getBytes = function () {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(
    this,
    3,
    ''
  ));
};

/**
 * optional bytes bytes = 3;
 * This is a type-conversion wrapper around `getBytes()`
 * @return {string}
 */
proto.Outer.prototype.getBytes_asB64 = function () {
  return /** @type {string} */ (jspb.Message.bytesAsB64(this.getBytes()));
};

/**
 * optional bytes bytes = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getBytes()`
 * @return {!Uint8Array}
 */
proto.Outer.prototype.getBytes_asU8 = function () {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(this.getBytes()));
};

/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.Outer} returns this
 */
proto.Outer.prototype.setBytes = function (value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};

goog.object.extend(exports, proto);
