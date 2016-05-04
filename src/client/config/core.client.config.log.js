(function() {
  'use strict';

  angular
    .module('core.config')
    .config(logging);

  logging.$inject = ['$provide', 'LOGGING'];
  function logging($provide, LOGGING) {
    $provide.decorator('$log', function ($delegate) {
      /* istanbul ignore if  */
      if(LOGGING.levels.debug !== 'true') {
        $delegate.debug = function () { return true; };
      }
      /* istanbul ignore if  */
      if(LOGGING.levels.info !== 'true') {
        $delegate.info = function () { return true; };
      }
      /* istanbul ignore if  */
      if(LOGGING.levels.warn !== 'true') {
        $delegate.warn = function () { return true; };
      }
      /* istanbul ignore if  */
      if(LOGGING.levels.error !== 'true') {
        $delegate.error = function () { return true; };
      }

      return $delegate;
    });
  }

})();
