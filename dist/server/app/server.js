'use strict';

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_init2.default.start().then(function (app) {
  _logger2.default.info('Modern-MEAN started Successfully');
}).catch(function (err) {
  _logger2.default.error(err);
  _init2.default.stop();
});