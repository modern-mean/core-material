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
