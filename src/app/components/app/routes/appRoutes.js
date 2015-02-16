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
          user: ['userService', 'authService', 'routes', '$q', '$state',
            function(userService, authService, routes, $q, $state) {
              var deferred = $q.defer();

              userService.getUserById({
                userId: authService.getUserId()
              }).then(function success(response) {
                return deferred.resolve(response);
              }, function error(response) {
                return $state.go(routes.login);
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
                return deferred.resolve(response);
              }, function error(response) {
                return $state.go(routes.login);
              });

              return deferred.promise;
            }
          ]
        },
        data: {
          authenticate: true
        }
      });

  }
]);
