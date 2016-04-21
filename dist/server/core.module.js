'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = undefined;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _coreServer = require('./routes/core.server.routes');

var _coreServer2 = _interopRequireDefault(_coreServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init(app) {
  return new Promise(function (resolve, reject) {
    _winston2.default.debug('Core::Init::Start');
    _coreServer2.default.init(app).then(function (app) {
      _winston2.default.verbose('Core::Init::Success');
      return resolve(app);
    }).catch(function (err) {
      _winston2.default.error(err);
      return reject(err);
    });
  });
}

let service = { init: init };

exports.default = service;
exports.init = init;