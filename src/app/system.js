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
  'authService',
  'regexService',
  'routes',
  'loggerService',
  'userService',
  function($rootScope, $state, authService, regexService, routes, loggerService, userService) {
    // $rootScope.menu = menuService.init();
    $rootScope.logger = loggerService;
    $rootScope.regexes = regexService; //hash of regex constants
    $rootScope.auth = authService; //helpers for checking claims
    $rootScope.routes = routes;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (toState.data && toState.data.authenticate && !authService.isLoggedIn()) {
        // User isn’t authenticated
        $rootScope.logger.error('Not Authenticated');
        $state.go('system.home');
        event.preventDefault();
      }
    });

    if (authService.isLoggedIn()) {
      userService.getUserById({
        userId: authService.getUserId()
      }).then(function success(response) {
        $rootScope.currentUser = response;
      }, function error(response) {
        $rootScope.logger.error('Error getting user');
      });
      userService.getUserClaims({
        userId: authService.getUserId()
      }).then(function success(response) {
        $rootScope.currentUserClaims = response;
      }, function error(response) {
        $rootScope.logger.error('Error getting user claims');
      });
    }
  }
]);
