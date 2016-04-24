'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = undefined;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _config = require('../config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let logger;

if (logger === undefined) {
  let transports = [];

  if (_config.config.logs.winston.file === 'true') {
    transports.push(new _winston2.default.transports.File({ filename: _config.config.logs.winston.file }));
  }

  if (_config.config.logs.winston.console === 'true') {
    transports.push(new _winston2.default.transports.Console());
  }

  exports.logger = logger = new _winston2.default.Logger({
    level: _config.config.logs.winston.level,
    transports: transports
  });
}

let service = { logger: logger };

exports.logger = logger;
exports.default = logger;