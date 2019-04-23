"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Host = new _mongoose["default"].Schema({
  hostname: {
    type: String,
    required: true,
    unique: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  deviceType: {
    type: String,
    "default": null
  },
  operatingSystem: {
    type: String,
    "default": null
  },
  snmpString: {
    type: String,
    "default": null
  },
  location: {
    type: String,
    "default": null
  },
  contact: {
    type: String,
    "default": null
  },
  createdAt: {
    type: Date,
    "default": Date.now()
  }
});

var _default = _mongoose["default"].model('Host', Host);

exports["default"] = _default;