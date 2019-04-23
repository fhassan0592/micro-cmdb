"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = new _mongoose["default"].Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    "default": Date.now()
  }
});
User.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) return next();

  _bcryptNodejs["default"].genSalt(process.env.SALT, function (err, salt) {
    if (err) return next(err);

    _bcryptNodejs["default"].hash(user.password, salt, undefined, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  });
});

User.methods.comparePassword = function (password) {
  return _bcryptNodejs["default"].compareSync(password, this.password);
};

var _default = _mongoose["default"].model('User', User);

exports["default"] = _default;