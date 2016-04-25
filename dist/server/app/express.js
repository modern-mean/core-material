'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.express = exports.expressApp = exports.httpsServer = exports.httpServer = exports.variables = exports.modules = exports.middleware = exports.listen = exports.init = exports.headers = exports.engine = exports.core = undefined;

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _consolidate = require('consolidate');

var _consolidate2 = _interopRequireDefault(_consolidate);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _globby = require('globby');

var _globby2 = _interopRequireDefault(_globby);

var _config = require('../config/config');

var _serverDestroy = require('server-destroy');

var _serverDestroy2 = _interopRequireDefault(_serverDestroy);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _connectLivereload = require('connect-livereload');

var _connectLivereload2 = _interopRequireDefault(_connectLivereload);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _expressForceSsl = require('express-force-ssl');

var _expressForceSsl2 = _interopRequireDefault(_expressForceSsl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Store Express server
let httpServer, httpsServer, expressApp;

function variables(app) {
  return new Promise(function (resolve, reject) {
    _logger2.default.debug('Express::Variables::Start');
    app.locals.title = _config.config.app.title;
    app.locals.description = _config.config.app.description;
    app.locals.logo = _config.config.logo;
    app.locals.favicon = _config.config.favicon;
    _logger2.default.verbose('Express::Variables::Success');
    return resolve(app);
  });
}

function middleware(app) {
  return new Promise(function (resolve, reject) {
    _logger2.default.debug('Express::Middleware::Start');
    app.use((0, _morgan2.default)(_config.config.logs.morgan.format, _config.config.logs.morgan.options));

    if (process.env.MEAN_CORE_LIVERELOAD) {
      app.use((0, _connectLivereload2.default)());
    }

    app.use(_bodyParser2.default.urlencoded({
      extended: true
    }));

    app.use(_bodyParser2.default.json());

    if (_config.config.express.https.enable === 'true') {
      app.set('forceSSLOptions', {
        httpsPort: _config.config.express.https.port
      });

      app.use(_expressForceSsl2.default);
    }

    _logger2.default.verbose('Express::Middleware::Success');
    return resolve(app);
  });
}

/**
 * Configure view engine
 */
function engine(app) {
  return new Promise(function (resolve, reject) {
    _logger2.default.debug('Express::Engine::Start');
    // Set swig as the template engine
    app.engine('server.view.html', _consolidate2.default['swig']);

    // Set views path and view engine
    app.set('view engine', 'server.view.html');
    app.set('views', './');
    _logger2.default.verbose('Express::Engine::Success');
    return resolve(app);
  });
}

function headers(app) {
  return new Promise(function (resolve, reject) {
    _logger2.default.debug('Express::Headers::Start');
    app.use((0, _helmet2.default)());
    _logger2.default.verbose('Express::Headers::Success');
    return resolve(app);
  });
}

function modules(app) {
  return new Promise(function (resolve, reject) {
    _logger2.default.debug('Express::Modules::Start');
    let promises = [];
    (0, _globby2.default)(_config.config.modules.custom).then(files => {
      files.forEach(file => {
        _logger2.default.debug('Express::Module::Match::' + file);
        let promise = require(_path2.default.resolve(file)).default.init(app);
        promises.push(promise);
      });

      Promise.all(promises).then(function () {
        _logger2.default.verbose('Express::Modules::Success');
        resolve(app);
      }).catch(function (err) {
        _logger2.default.error(err);
        reject(err);
      });
    });
  });
}

function core(app) {
  return new Promise(function (resolve, reject) {
    _logger2.default.debug('Express::Core::Start');
    //TODO  Change to System.import when its available
    require(_config.config.modules.core).default.init(app).then(function () {
      _logger2.default.verbose('Express::Core::Success');
      return resolve(app);
    }).catch(function (err) {
      _logger2.default.error(err);
      return reject(err);
    });
  });
}

function listen(app) {
  _logger2.default.debug('Express::Listen::Start');
  let httpServerPromise = new Promise(function (resolve, reject) {

    httpServer.listen(_config.config.express.http.port, _config.config.express.host, () => {
      /* istanbul ignore else: cant test this since production server cant be destroyed  */
      if (process.env.NODE_ENV !== 'production') {
        (0, _serverDestroy2.default)(httpServer);
      }
      resolve(app);
    });
  });

  let httpsServerPromise = new Promise(function (resolve, reject) {
    if (_config.config.express.https.enable !== 'true') {
      return resolve();
    }

    httpsServer.listen(_config.config.express.https.port, _config.config.express.host, () => {
      /* istanbul ignore else: cant test this since production server cant be destroyed  */
      if (process.env.NODE_ENV !== 'production') {
        (0, _serverDestroy2.default)(httpsServer);
      }
      resolve(app);
    });
  });

  return Promise.all([httpServerPromise, httpsServerPromise]).then(promises => {
    _logger2.default.info('--');
    _logger2.default.info(_config.config.app.title);
    _logger2.default.info('Environment:     ' + process.env.NODE_ENV);
    _logger2.default.info('Database:        ' + _config.config.mongoose.uri + _config.config.mongoose.db);
    _logger2.default.info('HTTP Server:     http://' + httpServer.address().address + ':' + httpServer.address().port);
    if (_config.config.express.https.enable === 'true') {
      _logger2.default.info('HTTPS Server:    https://' + httpsServer.address().address + ':' + httpsServer.address().port);
    }
    _logger2.default.info('--');
    return app;
  });
}

function init() {
  return new Promise(function (resolve, reject) {
    _logger2.default.debug('Express::Init::Start', _config.config.express.https);
    if (expressApp !== undefined || httpsServer !== undefined || httpServer !== undefined) {
      return reject('Express::Init::Error::Server is still running.');
    }
    exports.express = expressApp = (0, _express2.default)();
    httpServer = _http2.default.createServer(expressApp);
    if (_config.config.express.https.enable === 'true') {
      console.log(__dirname, process.cwd());
      let httpsOptions = {
        key: _fs2.default.readFileSync(_config.config.express.https.options.key),
        cert: _fs2.default.readFileSync(_config.config.express.https.options.cert)
      };
      httpsServer = _https2.default.createServer(httpsOptions, expressApp);
    }
    _logger2.default.verbose('Express::Init::Success');
    return resolve(expressApp);
  });
}

function destroy() {
  exports.express = expressApp = undefined;
  let httpServerPromise = new Promise(function (resolve, reject) {
    if (!httpServer || !httpServer.listening) {
      httpServer = undefined;
      return resolve();
    }

    httpServer.destroy(function () {
      httpServer = undefined;
      resolve();
    });
  });

  let httpsServerPromise = new Promise(function (resolve, reject) {
    if (!httpsServer || !httpsServer.listening) {
      httpsServer = undefined;
      return resolve();
    }

    httpsServer.destroy(function () {
      httpsServer = undefined;
      return resolve();
    });
  });

  return Promise.all([httpServerPromise, httpsServerPromise]).then(() => {
    _logger2.default.info('Express::Destroy::Success');
  });
}

function getHttpServer() {
  return httpServer;
}

function getHttpsServer() {
  return httpsServer;
}

function getExpressApp() {
  return expressApp;
}

let service = { core: core, engine: engine, express: expressApp, headers: headers, init: init, listen: listen, middleware: middleware, modules: modules, variables: variables, destroy: destroy, httpServer: getHttpServer, httpsServer: getHttpsServer, expressApp: getExpressApp };
exports.default = service;
exports.core = core;
exports.engine = engine;
exports.headers = headers;
exports.init = init;
exports.listen = listen;
exports.middleware = middleware;
exports.modules = modules;
exports.variables = variables;
exports.httpServer = getHttpServer;
exports.httpsServer = getHttpsServer;
exports.expressApp = getExpressApp;
exports.express = expressApp;
exports.destroy = destroy;