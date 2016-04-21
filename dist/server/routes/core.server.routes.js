'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _coreServer = require('../controllers/core.server.controller');

var _coreServer2 = _interopRequireDefault(_coreServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init(app) {
  return new Promise(function (resolve, reject) {
    _winston2.default.debug('Core::Routes::Start');

    app.use('/', _express2.default.static('./public'));

    // Define error pages
    app.route('/server-error').get(_coreServer2.default.renderServerError);

    // Return a 404 for all undefined api, module or lib routes
    app.route('/:url(api|build|public)/*').get(_coreServer2.default.renderNotFound);

    // Define application route
    app.route('/*').get(_coreServer2.default.renderIndex);

    _winston2.default.verbose('Core::Routes::Success');

    return resolve(app);
  });
}

let service = { init: init };

exports.default = service;
exports.init = init;