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
