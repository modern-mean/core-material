'use strict';

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _winston3 = require('./winston');

var _winston4 = _interopRequireDefault(_winston3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_winston4.default.init().then(_init2.default.start).then(function (app) {
  _winston2.default.info('Modern-MEAN started Successfully');
}).catch(function (err) {
  _winston2.default.error(err);
  _init2.default.stop();
});