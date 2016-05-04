(function() {
  'use strict';

  angular
    .module('core.routes')
    .directive('pageTitle', pageTitle);

  pageTitle.$inject = ['$rootScope', '$state', 'PAGE', '$log'];

  function pageTitle($rootScope, $state, PAGE, $log) {
    var directive = {
      retrict: 'A',
      link: link
    };

    function link(scope, element) {
      $rootScope.$on('$stateChangeStart', listener);

      function listener(event, toState) {
        $log.info('Core::Directive::PageTitle', toState.data.pageTitle);
        if (toState.data && toState.data.pageTitle) {
          element.html(PAGE.title + ' - ' + toState.data.pageTitle);
        } else {
          element.html(PAGE.title);
        }
      }
    }

    return directive;
  }
})();
