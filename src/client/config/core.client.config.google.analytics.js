(function() {
  'use strict';

  angular
    .module('core.config')
    .config(tracking)
    .run(function(Analytics) {});

  tracking.$inject = ['AnalyticsProvider', 'ANALYTICS'];

  function tracking(AnalyticsProvider, ANALYTICS) {
    AnalyticsProvider.setAccount(ANALYTICS);
    AnalyticsProvider.trackPages(true);
    AnalyticsProvider.trackUrlParams(true);
    AnalyticsProvider.setPageEvent('$stateChangeSuccess');
  };
})();
