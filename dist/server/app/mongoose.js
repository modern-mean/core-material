'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongoose = exports.disconnect = exports.connect = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _globby = require('globby');

var _globby2 = _interopRequireDefault(_globby);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _config = require('../config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

if (_config.config.mongoose.debug === 'true') {
  _logger2.default.debug('Mongoose::Debug::Enabled');
  _mongoose2.default.set('debug', true);
}

//Database Connection
let db;

function connect() {
  return new Promise((resolve, reject) => {

    if (_mongoose2.default.connection.readyState !== 0) {
      _logger2.default.info('Mongoose::Connect::Already Connected');
      return resolve(_mongoose2.default);
    }

    _mongoose2.default.connect(_config.config.mongoose.uri + _config.config.mongoose.db, _config.config.mongoose.options, function (err) {
      if (err) {
        return reject(err);
      }
    });

    _mongoose2.default.connection.once('connected', function () {
      _logger2.default.info('Mongoose::Connect::Success');
      return resolve(_mongoose2.default);
    });
  });
}

function disconnect() {
  return new Promise(function (resolve, reject) {
    _logger2.default.debug('Mongoose::Disconnect::Start');
    if (_mongoose2.default.connection.readyState === 0) {
      _logger2.default.info('Mongoose::Disconnect::Not Connected');
      return resolve();
    }

    _mongoose2.default.disconnect(function (err) {
      if (err) {
        return reject(err);
      }
    });

    _mongoose2.default.connection.once('disconnected', function () {
      _logger2.default.info('Mongoose::Disconnect::Success');
      db = undefined;
      return resolve();
    });
  });
}

let service = { connect: connect, disconnect: disconnect, mongoose: _mongoose2.default };

exports.default = service;
exports.connect = connect;
exports.disconnect = disconnect;
exports.mongoose = _mongoose2.default;