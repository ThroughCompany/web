angular.module('throughCompanyApp').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    //system routes
    $stateProvider
      .state('system.app', {
        url: 'app',
        templateUrl: '/app/components/app/views/app.html',
        controller: 'appController',
        resolve: {
          user: ['userService', 'authService',
            function(userService, authService) {
              return userService.getUserById(authService.getUserId());
            }
          ],
          userClaims: ['userService', 'authService',
            function(userService, authService) {
              return userService.getUserClaims(authService.getUserId());
            }
          ]
        },
        data: {
          authenticate: true
        }
      });

  }
]);
