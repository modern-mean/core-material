'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = undefined;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _config = require('../config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let logger;

function init() {
  return new Promise((resolve, reject) => {
    let transports = [];

    if (_config.config.logs.winston.file === 'true') {
      transports.push(new _winston2.default.transports.File({ filename: _config.config.logs.winston.file }));
    }

    if (_config.config.logs.winston.console === 'true') {
      transports.push(new _winston2.default.transports.Console());
    }

    logger = new _winston2.default.Logger({
      level: _config.config.logs.winston.level,
      transports: transports
    });

    return resolve();
  });
}

let service = { init: init };

exports.init = init;
exports.default = service;