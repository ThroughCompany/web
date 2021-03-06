var throughCompanyApp = angular.module('throughCompanyApp', [
  'ngResource',
  'ui.bootstrap',
  'ui.router',
  'ng-bs-animated-button',
  'ngAnimate',
  'textAngular',
  'ngSanitize',
  'ui.select',
  'duScroll',
  'slick'
]);

throughCompanyApp.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.html5Mode(true);
  }
]);

throughCompanyApp.run([
  '$rootScope',
  '$state',
  '$window',
  '$timeout',
  'authService',
  'regexService',
  'routes',
  'loggerService',
  'userService',
  'analytics',
  function($rootScope, $state, $window, $timeout, authService, regexService, routes, loggerService, userService, analytics) {
    // $rootScope.menu = menuService.init();

    $rootScope.meta = {
      title: null,
      description: null
    };
    $rootScope.setMetaTitle = function(title) {
      $rootScope.meta.title = title;
    };
    $rootScope.setMetaDescription = function(description) {
      $rootScope.meta.description = description;
    };
    $rootScope.setMetaTitle('Welcome');
    $rootScope.setMetaDescription('Welcome to Through Company.com');

    $rootScope.logger = loggerService;
    $rootScope.regexes = regexService; //hash of regex constants
    $rootScope.auth = authService; //helpers for checking claims
    $rootScope.routes = routes;
    $rootScope.$state = $state;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (toState.authenticate && !authService.isLoggedIn()) {
        // User isn’t authenticated
        $rootScope.logger.error('Not Authenticated');
        $state.go('system.home');
        event.preventDefault();
      }

      if (toState.data && toState.data.meta) {
        $rootScope.setMetaTitle(toState.data.meta.title);
        $rootScope.setMetaDescription(toState.data.meta.description);
      }
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      // ------------ auto scroll ------------ //
      $timeout(function() {
        $window.scrollTo(0, 0);
      }, 100);
    });

    // if (authService.isLoggedIn()) {
    //   authService.getUser();
    //   authService.getUserClaims();
    // }
  }
]);
