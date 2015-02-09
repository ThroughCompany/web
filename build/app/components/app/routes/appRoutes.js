(function() {
    'use strict';

    angular.module('system.app').config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            //system routes
            $stateProvider
                .state('system.app', {
                    url: 'app',
                    templateUrl: '/js/components/app/views/app.html',
                    controller: 'appController',
                    resolve: {
                        user: ['userEntityService', 'authService',
                            function(userEntityService, authService) {
                                return userEntityService.getUserById(authService.getUserId());
                            }
                        ],
                        userClaims: ['userEntityService', 'authService',
                            function(userEntityService, authService) {
                                return userEntityService.getUserClaims(authService.getUserId());
                            }
                        ],
                        states: ['lookupEntityService',
                            function(lookupEntityService) {
                                return lookupEntityService.getStates();
                            }
                        ]
                    },
                    data: {
                        authenticate: true
                    }
                });

        }
    ]);

}());
