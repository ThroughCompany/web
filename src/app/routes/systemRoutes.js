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
                userId: userId,
                fields: 'projectApplications()'
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

    /* ------------------------------------------------------------
     * Home
     * ------------------------------------------------------------ */

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

    $urlRouterProvider.when('/', '/home');

    /* ------------------------------------------------------------
     * Home
     * ------------------------------------------------------------ */

    $stateProvider
      .state('system.search', {
        url: 'search?tags',
        templateUrl: '/app/components/search/search.html',
        controller: 'searchCtrl',
        data: {
          meta: {
            title: 'Search',
            description: 'Welcome to Through Company.com'
          }
        }
      });

    /* ------------------------------------------------------------
     * Start Project
     * ------------------------------------------------------------ */

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
      .state('system.createProject', {
        url: 'new-project',
        templateUrl: '/app/components/createProject/createProject.html',
        controller: 'createProjectCtrl',
        data: {
          authenticate: true
        }
      });

    /* ------------------------------------------------------------
     * Start Organization
     * ------------------------------------------------------------ */

    $stateProvider
      .state('system.createOrganization', {
        url: 'new-organization',
        templateUrl: '/app/components/createOrganization/createOrganization.html',
        controller: 'createOrganizationCtrl',
        data: {
          authenticate: true
        }
      });

    /* ------------------------------------------------------------
     * Project
     * ------------------------------------------------------------ */

    $stateProvider
      .state('system.project', {
        url: 'projects/:projectId?section',
        templateUrl: '/app/components/project/project.html',
        controller: 'projectCtrl',
        resolve: {
          project: ['$rootScope', '$stateParams', '$state', 'projectService', '$q',
            function($rootScope, $stateParams, $state, projectService, $q) {
              var deferred = $q.defer();

              projectService.getProjectById({
                projectId: $stateParams.projectId,
                fields: 'projectApplications(), needs(), organizationProject()'
              }).then(function success(response) {
                deferred.resolve(response);
              }, function error(response) {
                $state.go('system.404');
                deferred.resolve(null);
              });

              return deferred.promise;
            }
          ]
        },
        reloadOnSearch: false
      });

    /* ------------------------------------------------------------
     * Organization
     * ------------------------------------------------------------ */

    $stateProvider
      .state('system.organization', {
        url: 'organizations/:organizationId',
        templateUrl: '/app/components/organization/organization.html',
        controller: 'organizationCtrl',
        resolve: {
          organization: ['$rootScope', '$stateParams', '$state', 'organizationService', '$q',
            function($rootScope, $stateParams, $state, organizationService, $q) {
              var deferred = $q.defer();

              organizationService.getOrganizationById({
                organizationId: $stateParams.organizationId,
                //fields: 'organizationApplications()'
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
        reloadOnSearch: false,
        authenticate: true
      });

    /* ------------------------------------------------------------
     * User
     * ------------------------------------------------------------ */

    $stateProvider
      .state('system.user', {
        url: 'users/:userName',
        templateUrl: '/app/components/user/user.html',
        controller: 'userCtrl',
        resolve: {
          user: ['$rootScope', '$stateParams', 'userService', '$q',
            function($rootScope, $stateParams, userService, $q) {
              var deferred = $q.defer();

              userService.getUserById({
                userId: $stateParams.userName,
                fields: 'userApplications(), needs()'
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
      .state('system.user.settings', {
        url: '/settings/:type',
        templateUrl: '/app/components/user/settings/userSettings.html',
        controller: 'userSettingsCtrl',
        reloadOnSearch: false,
        authenticate: true
      });

    /* ------------------------------------------------------------
     * Sign In
     * ------------------------------------------------------------ */

    $stateProvider
      .state('system.signIn', {
        url: 'signin?email&project',
        templateUrl: '/app/components/signIn/signIn.html',
        controller: 'signInCtrl'
      });

    /* ------------------------------------------------------------
     * Sign Up
     * ------------------------------------------------------------ */

    $stateProvider
      .state('system.signUp', {
        url: 'signup?project',
        templateUrl: '/app/components/signUp/signUp.html',
        controller: 'signUpCtrl'
      });

    /* ------------------------------------------------------------
     * 404
     * ------------------------------------------------------------ */

    $stateProvider
      .state('system.404', {
        url: '404',
        templateUrl: '/app/components/notFound/notFound.html',
        controller: 'notFoundCtrl'
      });
  }
]);
