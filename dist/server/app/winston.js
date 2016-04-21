'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = undefined;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _config = require('modernMean/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
  return new Promise((resolve, reject) => {
    //Set log level
    _winston2.default.level = _config2.default.logs.winston.level;

    if (_config2.default.logs.winston.file) {
      _winston2.default.add(_winston2.default.transports.File, { filename: _config2.default.logs.winston.file });
    }
    return resolve();
  });
}

let logger = { init: init };

exports.init = init;
exports.default = logger;