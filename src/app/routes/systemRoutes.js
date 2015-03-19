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
      .state('system.startProject', {
        url: 'start-project',
        templateUrl: '/app/components/startProject/startProject.html',
        controller: 'startProjectCtrl'
      })
      .state('system.project', {
        url: 'project/:projectId',
        templateUrl: '/app/components/project/project.html',
        controller: 'projectCtrl',
        resolve: {
          project: ['$rootScope', '$stateParams', 'projectService', '$q',
            function($rootScope, $stateParams, projectService, $q) {
              var deferred = $q.defer();

              projectService.getProjectById({
                projectId: $stateParams.projectId
              }).then(function success(response) {
                deferred.resolve(response);
              }, function error(response) {
                deferred.resolve(null);
              });

              return deferred.promise;
            }
          ]
        }
      })
      .state('system.user', {
        url: 'user/:userId',
        templateUrl: '/app/components/user/user.html',
        controller: 'userCtrl',
        resolve: {
          project: ['$rootScope', '$stateParams', 'userService', '$q',
            function($rootScope, $stateParams, userService, $q) {
              var deferred = $q.defer();

              userService.getUserById({
                userId: $stateParams.userId
              }).then(function success(response) {
                deferred.resolve(response);
              }, function error(response) {
                deferred.resolve(null);
              });

              return deferred.promise;
            }
          ]
        }
      })
      .state('system.signIn', {
        url: 'signin?email&project',
        templateUrl: '/app/components/signIn/signIn.html',
        controller: 'signInCtrl'
      })
      .state('system.signUp', {
        url: 'signup?project',
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
