"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkHost = exports.ServerHost = exports.Host = void 0;

var _schema = _interopRequireDefault(require("./schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Host =
/*#__PURE__*/
function () {
  function Host(hostname, ipAddress, deviceType, location, contact) {
    _classCallCheck(this, Host);

    if (hostname && ipAddress && deviceType && location && contact) {
      this._hostname = hostname;
      this._ipAddress = ipAddress;
      this._deviceType = deviceType;
      this._location = location;
      this._contact = contact;
    } else {
      throw new Error("Invalid hostname, IP address, device type, location or contact");
    }
  }

  _createClass(Host, [{
    key: "hostname",
    get: function get() {
      return this._hostname;
    }
  }, {
    key: "ipAddress",
    get: function get() {
      return this._ipAddress;
    }
  }, {
    key: "deviceType",
    get: function get() {
      return this._deviceType;
    }
  }, {
    key: "location",
    get: function get() {
      return this._location;
    }
  }, {
    key: "contact",
    get: function get() {
      return this._contact;
    }
  }], [{
    key: "getOne",
    value: function getOne(id, res) {
      _schema["default"].findById(id).then(function (host) {
        return res.status(200).json({
          success: true,
          data: {
            host: host
          },
          message: null
        });
      })["catch"](function (err) {
        return res.status(500).json({
          success: false,
          data: null,
          message: err.message
        });
      });
    }
  }, {
    key: "getAll",
    value: function getAll(res) {
      _schema["default"].find().then(function (hosts) {
        res.status(200).json({
          success: true,
          data: {
            hosts: hosts
          },
          message: null
        });
      })["catch"](function (err) {
        return res.status(500).json({
          success: false,
          data: null,
          message: err.message
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(id, res) {
      _schema["default"].findByIdAndDelete(id).then(function (host) {
        return res.status(200).json({
          success: true,
          data: {
            host: host
          },
          message: null
        });
      })["catch"](function (err) {
        return res.status(500).json({
          success: false,
          data: null,
          message: err.message
        });
      });
    }
  }]);

  return Host;
}();

exports.Host = Host;

var ServerHost =
/*#__PURE__*/
function (_Host) {
  _inherits(ServerHost, _Host);

  function ServerHost(hostname, ipAddress, deviceType, location, contact, operatingSystem) {
    var _this;

    _classCallCheck(this, ServerHost);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ServerHost).call(this, hostname, ipAddress, deviceType, location, contact));

    if (operatingSystem) {
      _this._operatingSystem = operatingSystem;
    } else {
      throw new Error("Invalid operating system");
    }

    return _this;
  }

  _createClass(ServerHost, [{
    key: "create",
    value: function create(res) {
      new _schema["default"]({
        hostname: this._hostname,
        ipAddress: this._ipAddress,
        deviceType: this._deviceType,
        location: this._location,
        contact: this._contact,
        operatingSystem: this._operatingSystem
      }).save(function (err, host) {
        if (err && err.code == 11000) return res.status(400).json({
          success: false,
          data: null,
          message: "Hostname or IP address already exists"
        });
        if (err) return res.status(500).json({
          success: false,
          data: null,
          message: err.message
        });
        res.status(200).json({
          success: true,
          data: {
            host: host
          },
          message: null
        });
      });
    }
  }, {
    key: "update",
    value: function update(id, res) {
      var _this2 = this;

      if (id) {
        _schema["default"].findById(id).then(function (foundHost) {
          foundHost.hostname = _this2._hostname;
          foundHost.ipAddress = _this2._ipAddress;
          foundHost.deviceType = _this2._deviceType;
          foundHost.location = _this2._location;
          foundHost.contact = _this2._contact;
          foundHost.operatingSystem = _this2._operatingSystem;
          foundHost.save(function (err, host) {
            if (err) return res.status(500).json({
              success: false,
              data: null,
              message: err.message
            });
            res.status(200).json({
              success: true,
              data: {
                host: host
              },
              message: null
            });
          });
        })["catch"](function (err) {
          return res.status(500).json({
            success: false,
            data: null,
            message: err.message
          });
        });
      } else {
        throw new Error("Invalid ID");
      }
    }
  }, {
    key: "operatingSystem",
    get: function get() {
      return this._operatingSystem;
    }
  }]);

  return ServerHost;
}(Host);

exports.ServerHost = ServerHost;

var NetworkHost =
/*#__PURE__*/
function (_Host2) {
  _inherits(NetworkHost, _Host2);

  function NetworkHost(hostname, ipAddress, deviceType, location, contact, snmpString) {
    var _this3;

    _classCallCheck(this, NetworkHost);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(NetworkHost).call(this, hostname, ipAddress, deviceType, location, contact));

    if (snmpString) {
      _this3._snmpString = snmpString;
    } else {
      throw new Error("Invalid snmp string");
    }

    return _this3;
  }

  _createClass(NetworkHost, [{
    key: "create",
    value: function create(res) {
      new _schema["default"]({
        hostname: this._hostname,
        ipAddress: this._ipAddress,
        deviceType: this._deviceType,
        location: this._location,
        contact: this._contact,
        snmpString: this._snmpString
      }).save(function (err, host) {
        if (err && err.code == 11000) return res.status(400).json({
          success: false,
          data: null,
          message: "Hostname or IP address already exists"
        });
        if (err) return res.status(500).json({
          success: false,
          data: null,
          message: err.message
        });
        return res.status(200).json({
          success: true,
          data: {
            host: host
          },
          message: null
        });
      });
    }
  }, {
    key: "update",
    value: function update(id, res) {
      var _this4 = this;

      if (id) {
        _schema["default"].findById(id).then(function (foundHost) {
          foundHost.hostname = _this4._hostname;
          foundHost.ipAddress = _this4._ipAddress;
          foundHost.deviceType = _this4._deviceType;
          foundHost.location = _this4._location;
          foundHost.contact = _this4._contact;
          foundHost.snmpString = _this4._snmpString;
          foundHost.save(function (err, host) {
            if (err) return res.status(500).json({
              success: false,
              data: null,
              message: err.message
            });
            return res.status(200).json({
              success: true,
              data: {
                host: host
              },
              message: null
            });
          });
        })["catch"](function (err) {
          return res.status(500).json({
            success: false,
            data: null,
            message: err.message
          });
        });
      } else {
        throw new Error("Invalid ID");
      }
    }
  }, {
    key: "snmpString",
    get: function get() {
      return this._snmpString;
    }
  }]);

  return NetworkHost;
}(Host);

exports.NetworkHost = NetworkHost;