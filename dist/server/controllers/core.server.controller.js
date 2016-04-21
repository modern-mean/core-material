'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderNotFound = exports.renderServerError = exports.renderIndex = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderIndex(req, res) {
  res.render(__dirname + '/../views/index');
}

function renderServerError(req, res) {
  res.status(500).render(__dirname + '/../views/500', {
    error: 'Oops! Something went wrong...'
  });
}

function renderNotFound(req, res) {
  res.status(404).format({
    'text/html': function textHtml() {
      res.render(__dirname + '/../views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function applicationJson() {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function _default() {
      res.json({
        error: 'Path not found'
      });
    }
  });
}

let controller = { renderIndex: renderIndex, renderServerError: renderServerError, renderNotFound: renderNotFound };

exports.default = controller;
exports.renderIndex = renderIndex;
exports.renderServerError = renderServerError;
exports.renderNotFound = renderNotFound;