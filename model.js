"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _schema = _interopRequireDefault(require("./schema"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User(username, password) {
    _classCallCheck(this, User);

    if (username && password) {
      this._username = username;
      this._password = password;
    } else {
      throw new Error("Invalid username or password");
    }
  }

  _createClass(User, [{
    key: "login",
    value: function login(res) {
      var _this = this;

      _schema["default"].findOne({
        username: this._username
      }).select('username password').exec().then(function (foundUser) {
        if (foundUser) {
          if (foundUser.comparePassword(_this._password)) {
            var token = _jsonwebtoken["default"].sign({
              id: foundUser._id
            }, process.env.SECRET);

            res.status(200).json({
              success: true,
              data: {
                token: token
              },
              message: null
            });
          } else {
            return res.status(401).json({
              success: false,
              data: null,
              message: "Invalid credentials"
            });
          }
        } else {
          return res.status(404).json({
            success: false,
            data: null,
            message: "User doesn't exist"
          });
        }
      })["catch"](function (err) {
        return res.status(500).json({
          success: false,
          data: null,
          message: err.message
        });
      });
    }
  }, {
    key: "signup",
    value: function signup(res) {
      new _schema["default"]({
        username: this._username,
        password: this._password
      }).save(function (err, user) {
        if (err && err.code == 11000) return res.status(400).json({
          success: false,
          data: null,
          message: "User already exists"
        });
        if (err) return res.status(500).json({
          success: false,
          data: null,
          message: err.message
        });
        res.status(200).json({
          success: true,
          data: null,
          message: null
        });
      });
    }
  }]);

  return User;
}();

exports.User = User;