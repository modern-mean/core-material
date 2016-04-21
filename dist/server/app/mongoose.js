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

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _config = require('modernMean/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

//Database Connection
let db;

function connect() {
  return new Promise((resolve, reject) => {

    if (_mongoose2.default.connection.readyState !== 0) {
      _winston2.default.info('Mongoose::Connect::Already Connected');
      return resolve(_mongoose2.default);
    }

    _mongoose2.default.connect(_config2.default.db.uri, _config2.default.db.options, function (err) {
      if (err) {
        return reject(err);
      }
    });

    _mongoose2.default.connection.once('connected', function () {
      _winston2.default.info('Mongoose::Connect::Success');
      return resolve(_mongoose2.default);
    });
  });
}

function disconnect() {
  return new Promise(function (resolve, reject) {
    _winston2.default.debug('Mongoose::Disconnect::Start');
    if (_mongoose2.default.connection.readyState === 0) {
      _winston2.default.info('Mongoose::Disconnect::Not Connected');
      return resolve();
    }

    _mongoose2.default.disconnect(function (err) {
      if (err) {
        return reject(err);
      }
    });

    _mongoose2.default.connection.once('disconnected', function () {
      _winston2.default.info('Mongoose::Disconnect::Success');
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