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
        controller: 'systemCtrl',
        abstract: true,
        resolve: {
          user: ['$rootScope', 'userService', 'authService', '$q',
            function($rootScope, userService, authService, $q) {
              var deferred = $q.defer();

              var userId = authService.getUserId();

              if (!userId) return deferred.resolve(null);

              userService.getUserById({
                userId: userId
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

              var userId = authService.getUserId();

              if (!userId) return deferred.resolve(null);

              userService.getUserClaims({
                userId: userId
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
          project: ['$rootScope', '$stateParams', '$state', 'projectService', '$q',
            function($rootScope, $stateParams, $state, projectService, $q) {
              var deferred = $q.defer();

              projectService.getProjectById({
                projectId: $stateParams.projectId
              }).then(function success(response) {
                deferred.resolve(response);
              }, function error(response) {
                $state.go('system.404');
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
          user: ['$rootScope', '$stateParams', 'userService', '$q',
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
      })
      //user routes
      .state('system.userProfile', {
        url: 'profile',
        templateUrl: '/app/components/userProfile/userProfile.html',
        controller: 'userProfileCtrl'
      })
      .state('system.userSettings', {
        url: 'settings',
        templateUrl: '/app/components/userSettings/userSettings.html',
        controller: 'userSettingsCtrl',
        abstract: true
      })
      .state('system.userSettings.profile', {
        url: 'profile',
        templateUrl: '/app/components/userSettings/userSettingsProfile.html',
        controller: 'userSettingsProfileCtrl'
      })
      .state('system.createProject', {
        url: 'new-project',
        templateUrl: '/app/components/createProject/createProject.html',
        controller: 'createProjectCtrl'
      })
      .state('system.projectSettings', {
        url: 'project/:projectId/settings',
        templateUrl: '/app/components/projectSettings/projectSettings.html',
        controller: 'projectSettingsCtrl',
        abstract: true,
        data: {
          authenticate: true
        }
      })
      .state('system.projectSettings.profile', {
        url: '/profile',
        templateUrl: '/app/components/projectSettings/projectSettingsProfile.html',
        controller: 'projectSettingsProfileCtrl'
      });
  }
]);
