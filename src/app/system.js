var throughCompanyApp = angular.module('throughCompanyApp', [
  'ngCookies',
  'ngResource',
  'ui.bootstrap',
  'ui.router',
  'ng-bs-animated-button',
  'ui.bootstrap.datetimepicker',
  'ngStorage',
  'ngAnimate'
]);

throughCompanyApp.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.html5Mode(true);
  }
]);

throughCompanyApp.run([
  '$rootScope',
  '$state',
  'menuService',
  'authService',
  'regexService',
  'routes',
  function($rootScope, $state, menuService, authService, regexService, routes) {
    $rootScope.menu = menuService.init();
    $rootScope.regexes = regexService; //hash of regex constants
    $rootScope.auth = authService; //helpers for checking claims
    $rootScope.routes = routes;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if ((toState.data && toState.data.authenticate && !authService.getToken()) || !authService.isLoggedIn()) {
        // User isn’t authenticated
        //$state.go('system.home');
        //event.preventDefault();
      }
    });
    $rootScope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams) {
      // if (!authService.isLoggedIn()) {
      //     // User isn’t authenticated
      //     //$state.go('system.home');
      //     //event.preventDefault();
      // }
    });
  }
]);