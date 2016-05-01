(function() {
  'use strict';

  var $state,
    $scope,
    $compile,
    $rootScope,
    SideNavLeftController,
    NAVIGATION,
    sandbox;

  describe('core.client.controller.sidenav.left.js', function () {
    var mediaStub;
    beforeEach(module(function($provide) {
      sandbox = sinon.sandbox.create();
      mediaStub = sandbox.stub();
      $provide.value('$mdMedia', mediaStub);
    }));

    beforeEach(module('core'));

    beforeEach(inject(function(_$state_, _$rootScope_, $controller, _$compile_, _NAVIGATION_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;
      $compile = _$compile_;
      SideNavLeftController = $controller('SideNavLeftController as vm', {
        $scope: $scope
      });

      NAVIGATION = _NAVIGATION_;


    }));

    afterEach(function () {
      sandbox.restore();
    });

    describe('SideNavLeftController', function () {
      it('should have a vm variable that is an object', function () {
        return expect($scope.vm).to.be.an('object');
      });

      it('should have a vm.config variable that is an object', function () {
        return expect($scope.vm.config).to.be.an('object');
      });

      it('should have a vm.isLockedOpen variable that a function', function () {
        return expect($scope.vm.isLockedOpen).to.be.a('function');
      });

      describe('isLockedOpen', function () {

        describe('locked always', function () {

          beforeEach(function () {
            NAVIGATION.left.locked.always = true;
            $compile('<md-sidenav md-component-id="coreLeftNav" md-disable-backdrop="{{vm.disableBackdrop}}" md-is-locked-open="vm.isLockedOpen()"></md-sidenav>')($scope);
            $scope.$digest();
          });

          afterEach(function () {
            NAVIGATION.left.locked.always = false;
          });

          it('should set left side nav to locked', function () {
            expect($scope.vm.config.backdrop).to.equal(true);
            return expect($scope.vm.navigation.isLockedOpen()).to.equal(true);
          });

        });

        describe('locked media', function () {

          beforeEach(function () {
            mediaStub.returns(true);
            $compile('<md-sidenav md-component-id="coreLeftNav" md-disable-backdrop="{{vm.disableBackdrop}}" md-is-locked-open="vm.isLockedOpen()"></md-sidenav>')($scope);
            $scope.$digest();
          });

          it('should set left side nav to locked', function () {
            expect($scope.vm.config.backdrop).to.equal(true);
            return expect($scope.vm.navigation.isLockedOpen()).to.equal(true);
          });

        });

        describe('unlocked', function () {

          beforeEach(function () {
            mediaStub.returns(false);
            $compile('<md-sidenav md-component-id="coreLeftNav" md-disable-backdrop="{{vm.disableBackdrop}}" md-is-locked-open="vm.isLockedOpen()"></md-sidenav>')($scope);
            $scope.$digest();
          });

          it('should not lock the navigation', function () {
            expect($scope.vm.config.backdrop).to.equal(NAVIGATION.left.backdrop);
            return expect($scope.vm.navigation.isLockedOpen()).to.equal(false);
          });

        });


      });

      it('should have a vm.navigation variable that is an instance of mdSidenav', function () {
        var element = $compile('<md-sidenav md-component-id="coreLeftNav"></md-sidenav>')($scope);
        $scope.$digest();
        return expect($scope.vm.navigation).to.be.an('object');
      });



    });
  });
})();
