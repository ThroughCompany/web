angular.module('throughCompanyApp').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider
      .otherwise('/404');

    $urlRouterProvider.when('/', '/home');

    $stateProvider
      .state('system', {
        url: '/',
        templateUrl: '/app/views/system.html',
        controller: 'systemController'
      })
      .state('system.home', {
        url: 'home',
        templateUrl: '/app/views/home.html',
        controller: 'homeController'
      })
      .state('system.signIn', {
        url: 'signin',
        templateUrl: '/app/views/signIn.html',
        controller: 'signInController'
      })
      .state('system.signUp', {
        url: 'signup',
        templateUrl: '/app/views/signUp.html',
        controller: 'signUpController'
      })
      .state('system.404', {
        url: '404',
        templateUrl: '/app/views/404.html',
        controller: 'errorController'
      });

  }
]);
