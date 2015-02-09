(function() {
    'use strict';

    angular.module('system').config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .otherwise('/404');

            $urlRouterProvider.when('/', '/home');

            $stateProvider
                .state('system', {
                    url: '/',
                    templateUrl: '/js/views/system.html',
                    controller: 'systemController'
                })
                .state('system.home', {
                    url: 'home',
                    templateUrl: '/js/views/home.html',
                    controller: 'homeController'
                })
                .state('system.login', {
                    url: 'login',
                    templateUrl: '/js/views/login.html',
                    controller: 'loginController'
                })
                .state('system.register', {
                    url: 'register',
                    templateUrl: '/js/views/register.html',
                    controller: 'registerController'
                })
                .state('system.404', {
                    url: '404',
                    templateUrl: '/js/views/404.html',
                    controller: 'errorController'
                });

        }
    ]);

}());
