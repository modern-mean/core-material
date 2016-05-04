(function(app) {
  'use strict';

  app.registerModule('core', [app.name]);
  app.registerModule('core.config', [app.name]);
  app.registerModule('core.templates', [app.name]);
  app.registerModule('core.routes', [app.name, 'ui.router']);

})(window.modernMeanApplication);
