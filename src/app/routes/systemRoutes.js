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
        controller: 'systemCtrl'
      })
      .state('system.home', {
        url: 'home',
        templateUrl: '/app/components/home/home.html',
        controller: 'homeCtrl'
      })
      .state('system.signIn', {
        url: 'signin',
        templateUrl: '/app/components/signIn/signIn.html',
        controller: 'signInCtrl'
      })
      .state('system.signUp', {
        url: 'signup',
        templateUrl: '/app/components/signUp/signUp.html',
        controller: 'signUpCtrl'
      })
      .state('system.404', {
        url: '404',
        templateUrl: '/app/components/notFound/notFound.html',
        controller: 'notFoundCtrl'
      });
  }
]);
