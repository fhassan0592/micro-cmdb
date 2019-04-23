"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _model = require("./model");

var router = (0, _express.Router)();
router.post('/login', function (req, res) {
  try {
    var user = new _model.User(req.body.username, req.body.password);
    user.login(res);
  } catch (Error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: Error.message
    });
  }
});
router.post('/signup', function (req, res) {
  console.log(req.body);

  try {
    var user = new _model.User(req.body.username, req.body.password);
    user.signup(res);
  } catch (Error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: Error.message
    });
  }
});
var _default = router;
exports["default"] = _default;