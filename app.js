"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _helmet = _interopRequireDefault(require("helmet"));

var _route = _interopRequireDefault(require("./objects/hosts/route"));

var _route2 = _interopRequireDefault(require("./objects/users/route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use((0, _helmet["default"])());
app.use(_bodyParser["default"].json());
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"]["static"](__dirname + '/dist'));

function isAuthenticated(req, res, next) {
  if (req.headers.authorization) {
    var token = req.headers.authorization;

    try {
      var parsedToken = _jsonwebtoken["default"].verify(token.split('Bearer ')[1], process.env.SECRET);

      if (_mongoose["default"].Types.ObjectId.isValid(parsedToken.id)) {
        return next();
      } else {
        return res.status(401).json({
          success: false,
          data: null,
          message: "Invalid token"
        });
      }
    } catch (Error) {
      return res.status(401).json({
        success: false,
        data: null,
        message: "Invalid token"
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      data: null,
      message: "Unauthorized"
    });
  }
}

app.use('/api/v1/users', _route2["default"]);
app.use('/api/v1/hosts', isAuthenticated, _route["default"]);
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

_mongoose["default"].connect(process.env.DB_URL, {
  user: process.env.DB_USERNAME,
  pass: process.env.DB_PASSWORD,
  useNewUrlParser: true
}, function (err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  app.listen(process.env.PORT, function () {
    return console.log("API is live on port ".concat(process.env.PORT));
  });
});