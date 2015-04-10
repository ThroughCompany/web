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
                authService.logout(true);
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
                authService.logout(true);
              });

              return deferred.promise;
            }
          ]
        }
      });

    $stateProvider
      .state('system.home', {
        url: 'home',
        templateUrl: '/app/components/home/home.html',
        controller: 'homeCtrl',
        data: {
          meta: {
            title: 'Welcome',
            description: 'Welcome to Through Company.com'
          }
        }
      });

    $stateProvider
      .state('system.startProject', {
        url: 'start-project',
        templateUrl: '/app/components/startProject/startProject.html',
        controller: 'startProjectCtrl',
        data: {
          meta: {
            title: 'Start a new Project',
            description: 'Start a new Project'
          }
        }
      });

    $stateProvider
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
      });

    $stateProvider
      .state('system.project.settings', {
        url: '/settings/:type',
        templateUrl: '/app/components/project/settings/projectSettings.html',
        controller: 'projectSettingsCtrl',
        reloadOnSearch: false
      });

    $stateProvider
      .state('system.user', {
        url: 'user/:userName',
        templateUrl: '/app/components/user/user.html',
        controller: 'userCtrl',
        resolve: {
          user: ['$rootScope', '$stateParams', 'userService', '$q',
            function($rootScope, $stateParams, userService, $q) {
              var deferred = $q.defer();

              userService.getUserById({
                userId: $stateParams.userName
              }).then(function success(response) {
                deferred.resolve(response);
              }, function error(response) {
                deferred.resolve(null);
              });

              return deferred.promise;
            }
          ]
        }
      });

    $stateProvider
      .state('system.signIn', {
        url: 'signin?email&project',
        templateUrl: '/app/components/signIn/signIn.html',
        controller: 'signInCtrl'
      });

    $stateProvider
      .state('system.signUp', {
        url: 'signup?project',
        templateUrl: '/app/components/signUp/signUp.html',
        controller: 'signUpCtrl'
      });

    $stateProvider
      .state('system.404', {
        url: '404',
        templateUrl: '/app/components/notFound/notFound.html',
        controller: 'notFoundCtrl'
      });

    //user routes
    $stateProvider
      .state('system.userProfile', {
        url: 'profile',
        templateUrl: '/app/components/userProfile/userProfile.html',
        controller: 'userProfileCtrl'
      });

    $stateProvider
      .state('system.userSettings', {
        url: 'settings',
        templateUrl: '/app/components/userSettings/userSettings.html',
        controller: 'userSettingsCtrl',
        abstract: true,
        data: {
          authenticate: true
        }
      });

    $stateProvider
      .state('system.userSettings.profile', {
        url: 'profile',
        templateUrl: '/app/components/userSettings/userSettingsProfile.html',
        controller: 'userSettingsProfileCtrl',
        data: {
          authenticate: true
        }
      });

    $stateProvider
      .state('system.createProject', {
        url: 'new-project',
        templateUrl: '/app/components/createProject/createProject.html',
        controller: 'createProjectCtrl',
        data: {
          authenticate: true
        }
      });

    $urlRouterProvider.when('/', '/home');
  }
]);
