(function(app) {
  'use strict';

  app.registerModule('core', [app.name]);
  app.registerModule('core.config', [app.name]);
  app.registerModule('core.templates', [app.name]);
  app.registerModule('core.routes', [app.name, 'ui.router']);

})(window.modernMeanApplication);

(function () { 
 return angular.module("core.config")
.constant("ANALYTICS", {"name":"tracker","tracker":"UA-77127830-1","trackEvent":true})
.constant("LOGGING", {"levels":{"debug":"false","info":"true","warn":"true","error":"true"}});

})();

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

(function() {
  'use strict';

  angular
    .module('core.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('root.not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('root', {
      url: '',
      views: {
        'header': {
          controller: 'HeaderController',
          controllerAs: 'vm',
          templateUrl: 'modern-mean-core-material/views/core.client.views.header.html'
        },
        'main': {
        },
        'leftnav': {
          controller: 'SideNavLeftController',
          controllerAs: 'vm',
          templateUrl: 'modern-mean-core-material/views/core.client.views.sidenav.left.html'
        },
        'rightnav': {
          controller: 'SideNavRightController',
          controllerAs: 'vm',
          templateUrl: 'modern-mean-core-material/views/core.client.views.sidenav.right.html'
        },
        'footer': {
          templateUrl: 'modern-mean-core-material/views/core.client.views.footer.html'
        }
      }
    })
    .state('root.home', {
      url: '/',
      views: {
        'main@': {
          controller: 'HomeController',
          controllerAs: 'vm',
          templateUrl: 'modern-mean-core-material/views/core.client.views.home.html'
        }
      },
      data: {
        pageTitle: 'Welcome'
      }
    })
    .state('root.not-found', {
      url: '/not-found',
      views: {
        'main@': {
          templateUrl: 'modern-mean-core-material/views/core.client.views.404.html'
        }
      },
      data: {
        ignoreState: true,
        pageTitle: 'Page not found'
      }
    })
    .state('root.bad-request', {
      url: '/bad-request',
      views: {
        'main@': {
          templateUrl: 'modern-mean-core-material/views/core.client.views.400.html'
        }
      },
      data: {
        ignoreState: true,
        pageTitle: 'Bad request'
      }
    })
    .state('root.forbidden', {
      url: '/forbidden',
      views: {
        'main@': {
          templateUrl: 'modern-mean-core-material/views/core.client.views.403.html'
        }
      },
      data: {
        ignoreState: true,
        pageTitle: 'Not authorized'
      }
    });

  }
})();

(function() {
  'use strict';

  angular
    .module('core')
    .config(theme);

  function theme($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('grey', {
        'default': '500',
        'hue-1': '300',
        'hue-2': '700',
        'hue-3': '900'
      })
      .accentPalette('teal', {
        'default': '500',
        'hue-1': '300',
        'hue-2': '700',
        'hue-3': '900',
      })
      .warnPalette('red')
      .backgroundPalette('grey', {
        'default': '100'
      });

    //TODO  Will support toast themes when https://github.com/angular/material/issues/2878 is fixed
    $mdThemingProvider.theme('card-actions')
      .primaryPalette('green')
      .accentPalette('cyan', {
        'default': '700'
      })
      .warnPalette('red');

    //TODO  Will support toast themes when https://github.com/angular/material/issues/2878 is fixed
    $mdThemingProvider.theme('toast-success')
      .primaryPalette('green')
      .accentPalette('blue')
      .warnPalette('yellow')
      .backgroundPalette('green');

    //TODO  Will support toast themes when https://github.com/angular/material/issues/2878 is fixed
    $mdThemingProvider.theme('toast-error')
      .primaryPalette('red')
      .accentPalette('blue')
      .warnPalette('yellow')
      .backgroundPalette('red');



  }
})();

(function () { 
 return angular.module("core.config")
.value("PAGE", {"title":"MODERN-MEAN"})
.value("NAVIGATION", {"left":{"heading":"Left Navigation","backdrop":true,"locked":{"always":false,"media":"gt-sm"}},"right":{"locked":{"always":false}}});

})();

(function() {
  'use strict';

  angular
    .module('core')
    .config(coreConfig);

  coreConfig.$inject = ['$locationProvider', '$httpProvider'];
  function coreConfig($locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
  }

})();

(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$mdComponentRegistry', '$log'];

  function HeaderController($mdComponentRegistry, $log) {
    var vm = this;

    vm.navigation = {};

    $mdComponentRegistry
      .when('coreLeftNav')
      .then(function(nav) {
        vm.navigation.left = nav;
      });

    $mdComponentRegistry
      .when('coreRightNav')
      .then(function(nav) {
        vm.navigation.right = nav;
      });

    $log.info('HeaderController::Init', vm);
  }
})();

(function() {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$log'];

  function HomeController($log) {
    var vm = this;

    $log.info('HomeController::Init', vm);
  }
})();

(function() {
  'use strict';

  angular
    .module('core')
    .controller('SideNavLeftController', SideNavLeftController);

  SideNavLeftController.$inject = ['$mdComponentRegistry', '$mdMedia', 'NAVIGATION', '$log'];

  function SideNavLeftController($mdComponentRegistry, $mdMedia, NAVIGATION, $log) {
    var vm = this;

    vm.config = NAVIGATION.left;
    vm.isLockedOpen = isLockedOpen;

    $mdComponentRegistry
      .when('coreLeftNav')
      .then(function(nav) {
        vm.navigation = nav;
      });

    function isLockedOpen() {
      vm.config.backdrop = NAVIGATION.left.backdrop;
      if (vm.config.locked.always) {
        vm.config.backdrop = true;
        return true;
      }

      if ($mdMedia(vm.config.locked.media)) {
        vm.config.backdrop = true;
        return true;
      }

      return false;
    }

    $log.info('SideNavLeftController::Init', vm);
  }
})();

(function() {
  'use strict';

  angular
    .module('core')
    .controller('SideNavRightController', SideNavRightController);

  SideNavRightController.$inject = ['$mdComponentRegistry', '$log'];

  function SideNavRightController($mdComponentRegistry, $log) {
    var vm = this;

    $mdComponentRegistry
      .when('coreRightNav')
      .then(function(nav) {
        vm.navigation = nav;
      });

    $log.info('SideNavRightController::Init', vm);
  }
})();

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

(function () {
  'use strict';

  angular
    .module('core')
    .factory('menuFactory', menuFactory);

  menuFactory.$inject = ['lodash', '$log'];
  function menuFactory(lodash, $log) {
    var factory = {
      toolbar: {
        items: [],
        addItem: addItem,
        removeItem: removeItem,
        getItem: getItem
      },
      sidenavleft: {
        items: [],
        addItem: addItem,
        removeItem: removeItem,
        getItem: getItem
      },
      sidenavright: {
        items: [],
        addItem: addItem,
        removeItem: removeItem,
        getItem: getItem
      }
    };

    function addItem(item) {
      var menu = this.getItem(item);  // jshint ignore:line

      if (menu) {
        $log.info('Menu Exists:' , menu);
        return menu;
      }

      item.addItem = addItem;
      item.getItem = getItem;
      item.removeItem = removeItem;
      this.items.push(item);  // jshint ignore:line
    }

    function getItem(find) {
      return lodash.find(this.items, find);  // jshint ignore:line
    }

    function removeItem(find) {
      if (this.items) {  // jshint ignore:line
        var item = lodash.find(this.items, find); // jshint ignore:line

        if (item !== undefined) {
          return this.items.splice(this.items.indexOf(item), 1); // jshint ignore:line
        }
      }
    }

    return factory;
  }
})();

(function() {
  'use strict';

  // Setting HTML5 Location Mode
  angular
    .module('core')
    .run(stateChangeStart);

  stateChangeStart.$inject = ['$rootScope', '$state', '$mdComponentRegistry', '$log'];
  function stateChangeStart($rootScope, $state, $mdComponentRegistry, $log) {
    // Record previous state
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      $log.debug('Core::StateChangeStart', toState, fromState);
      closeSideNavs();
    });

    // Close Side Navigation
    function closeSideNavs() {
      $mdComponentRegistry
        .when('coreLeftNav')
        .then(function(nav){
          nav.close();
        });

      $mdComponentRegistry
        .when('coreRightNav')
        .then(function(nav){
          nav.close();
        });

    }

  }
})();

(function() {
  'use strict';

  // Setting HTML5 Location Mode
  angular
    .module('core')
    .run(stateChangeSuccess);

  stateChangeSuccess.$inject = ['$rootScope', '$state', '$mdComponentRegistry', '$log'];
  function stateChangeSuccess($rootScope, $state, $mdComponentRegistry, $log) {
    // Record previous state
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      $log.debug('Core::StateChangeSuccess', toState, fromState);
      storePreviousState(fromState, fromParams);
    });

    // Store previous state
    function storePreviousState(state, params) {
      // only store this state if it shouldn't be ignored
      if (!state.data || !state.data.ignoreState) {
        $state.previous = {
          state: state,
          params: params,
          href: $state.href(state, params)
        };
      }
    }

    //Save in rootscope for use in users module
    $rootScope.storePreviousState = storePreviousState;
  }
})();

(function () {
  'use strict';

  angular
    .module('core')
    .factory('menuService', menuService);

  menuService.$inject = ['lodash', '$log'];
  function menuService(lodash, $log) {
    var service = {
      toolbar: {
        items: [],
        addItem: addItem,
        removeItem: removeItem,
        getItem: getItem
      },
      sidenavleft: {
        items: [],
        addItem: addItem,
        removeItem: removeItem,
        getItem: getItem
      },
      sidenavright: {
        items: [],
        addItem: addItem,
        removeItem: removeItem,
        getItem: getItem
      }
    };

    function addItem(item) {
      var menu = this.getItem(item);  // jshint ignore:line

      if (menu) {
        return menu;
      }

      item.addItem = addItem;
      item.getItem = getItem;
      item.removeItem = removeItem;
      this.items.push(item);  // jshint ignore:line
    }

    function getItem(find) {
      return lodash.find(this.items, find);  // jshint ignore:line
    }

    function removeItem(find) {
      if (this.items) {  // jshint ignore:line
        var item = lodash.find(this.items, find); // jshint ignore:line

        if (item !== undefined) {
          return this.items.splice(this.items.indexOf(item), 1); // jshint ignore:line
        }
      }
    }

    return service;
  }
})();
