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
          user: ['$rootScope', 'userService', 'authService', '$q',
            function($rootScope, userService, authService, $q) {
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
          userClaims: ['userService', 'authService', '$q',
            function(userService, authService, $q) {
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
      //user routes
      .state('system.app.userProfile', {
        url: '/profile',
        templateUrl: '/app/components/app/components/userProfile/userProfile.html',
        controller: 'userProfileCtrl'
      })
      .state('system.app.userSettings', {
        url: '/settings',
        templateUrl: '/app/components/app/components/userSettings/userSettings.html',
        controller: 'userSettingsCtrl'
      })
      .state('system.app.userSettings.profile', {
        url: '/profile',
        templateUrl: '/app/components/app/components/userSettings/userSettingsProfile.html',
        controller: 'userSettingsProfileCtrl'
      })
      .state('system.app.createProject', {
        url: '/new-project',
        templateUrl: '/app/components/app/components/createProject/createProject.html',
        controller: 'createProjectCtrl'
      });
  }
]);
