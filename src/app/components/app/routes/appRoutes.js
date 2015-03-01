angular.module('throughCompanyApp').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    //system routes
    $stateProvider
      .state('system.app', {
        url: 'app',
        templateUrl: '/app/components/app/views/app.html',
        controller: 'appCtrl',
        resolve: {
          user: ['$rootScope', 'userService', 'authService', 'routes', '$q', '$state',
            function($rootScope, userService, authService, routes, $q, $state) {
              var deferred = $q.defer();

              userService.getUserById({
                userId: authService.getUserId()
              }).then(function success(response) {
                deferred.resolve(response);
              }, function error(response) {
                deferred.resolve(null);
              });

              return deferred.promise;
            }
          ],
          userClaims: ['userService', 'authService', 'routes', '$q', '$state',
            function(userService, authService, routes, $q, $state) {
              var deferred = $q.defer();

              userService.getUserClaims({
                userId: authService.getUserId()
              }).then(function success(response) {
                deferred.resolve(response);
              }, function error(response) {
                deferred.resolve(null);
              });

              return deferred.promise;
            }
          ]
        },
        data: {
          authenticate: true
        }
      })
      .state('system.app.userProfile', {
        url: '/profile',
        templateUrl: '/app/components/app/components/userProfile/userProfile.html',
        controller: 'userProfileCtrl'
      })
      .state('system.app.userSettings', {
        url: '/settings',
        templateUrl: '/app/components/app/components/userSettings/userSettings.html',
        controller: 'userSettingsCtrl'
      });
  }
]);
