"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _model = require("./model");

var router = (0, _express.Router)();
router.get('/get/all', function (req, res) {
  _model.Host.getAll(res);
});
router.get('/get/:id', function (req, res) {
  _model.Host.getOne(req.params.id, res);
});
router["delete"]('/delete/:id', function (req, res) {
  _model.Host["delete"](req.params.id, res);
});
router.post('/create', function (req, res) {
  if (req.body.deviceType) {
    var host = null;

    try {
      if (req.body.deviceType == "server") {
        host = new _model.ServerHost(req.body.hostname, req.body.ipAddress, req.body.deviceType, req.body.location, req.body.contact, req.body.operatingSystem);
      } else if (req.body.deviceType == "network") {
        host = new _model.NetworkHost(req.body.hostname, req.body.ipAddress, req.body.deviceType, req.body.location, req.body.contact, req.body.snmpString);
      }

      host.create(res);
    } catch (Error) {
      return res.status(500).json({
        success: false,
        data: null,
        message: Error.message
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Invalid device type"
    });
  }
});
router.put('/update/:id', function (req, res) {
  console.log(req.params.id);

  if (req.body.deviceType) {
    var host = null;

    try {
      if (req.body.deviceType == "server") {
        host = new _model.ServerHost(req.body.hostname, req.body.ipAddress, req.body.deviceType, req.body.location, req.body.contact, req.body.operatingSystem);
      } else if (req.body.deviceType == "network") {
        host = new _model.NetworkHost(req.body.hostname, req.body.ipAddress, req.body.deviceType, req.body.location, req.body.contact, req.body.snmpString);
      }

      host.update(req.params.id, res);
    } catch (Error) {
      return res.status(500).json({
        success: false,
        data: null,
        message: Error.message
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Invalid device type"
    });
  }
});
var _default = router;
exports["default"] = _default;