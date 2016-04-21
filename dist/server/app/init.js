'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stop = exports.start = undefined;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _mongoose = require('./mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('./express');

var _express2 = _interopRequireDefault(_express);

var _config = require('modernMean/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function start() {
  /*
  let db = new Promise(function (resolve, reject) {
     mongoose
      .connect()
      .then(mongoose.setPromise)
      .then(function (db) {
        console.log(chalk.bold.cyan('Mongoose::Done::Successaa'));
        resolve(db);
      })
      .catch(function (err) {
        console.log(chalk.bold.red('Mongoose::Done::Error'));
        console.log(chalk.bold.red(err));
        reject();
      });
  });
  */

  let server = new Promise(function (resolve, reject) {

    _express2.default.init().then(function (app) {
      return Promise.all([_mongoose2.default.connect(), _express2.default.variables(app), _express2.default.middleware(app), _express2.default.engine(app), _express2.default.headers(app)]).then(function () {

        return app;
      });
    }).then(_express2.default.modules).then(_express2.default.core).then(_express2.default.listen).then(function (app) {
      _winston2.default.verbose('Express::Done::Success');
      resolve(app);
    }).catch(function (err) {
      _winston2.default.error(err);
      reject(err);
    });
  });

  return server;
}

function stop() {
  return new Promise(function (resolve, reject) {
    Promise.all([_express2.default.destroy(), _mongoose2.default.disconnect()]).then(function () {
      _winston2.default.verbose('MEAN::Stop::Success');
      resolve();
    }).catch(function (err) {
      _winston2.default.error(err);
      reject(err);
    });
  });
}

let service = { start: start, stop: stop };
exports.default = service;
exports.start = start;
exports.stop = stop;