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
      .state('system.login', {
        url: 'login',
        templateUrl: '/app/views/login.html',
        controller: 'loginController'
      })
      .state('system.register', {
        url: 'register',
        templateUrl: '/app/views/register.html',
        controller: 'registerController'
      })
      .state('system.404', {
        url: '404',
        templateUrl: '/app/views/404.html',
        controller: 'errorController'
      });

  }
]);
