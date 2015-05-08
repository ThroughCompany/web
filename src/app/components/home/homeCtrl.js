angular.module('throughCompanyApp').controller('homeCtrl', [
  '$scope',
  '$state',
  '$rootScope',
  'projectService',
  '$timeout',
  'subscribeService',
  'utilsService',
  'skillService',
  'userService',
  'authService',
  'routes',
  function($scope, $state, $rootScope, projectService, $timeout, subscribeService, utilsService, skillService, userService, authService, routes) {
    $scope.loaded = false;

    projectService.getProjects({}).then(function success(response) {
      $scope.loaded = true;
      $scope.projects = response;
    });

    skillService.getAll({}).then(function success(response) {
      $scope.skills = response;
    });

    // ---------------- buttons ----------------
    $scope.registerSubmitting = null;
    $scope.registerResult = null;
    $scope.registerBtnOptions = {
      buttonDefaultText: 'Sign up',
      buttonDefaultClass: 'btn btn-primary',
      buttonSubmittingText: 'Signing up...',
      buttonSubmittingIcon: 'icon-left fa fa-spin fa-refresh',
      buttonSuccessText: 'Sign up successful',
      buttonSuccessIcon: 'icon-left fa fa-check',
      buttonSuccessClass: 'btn-success',
      buttonErrorText: 'Error signing up',
      buttonErrorIcon: 'icon-left fa fa-remove',
      buttonErrorClass: 'btn-danger'
    };

    // subscribe button
    $scope.subscribeSubmitting = null;
    $scope.subscribeResult = null;
    $scope.subscribeBtnOptions = {
      buttonDefaultText: 'Keep in touch',
      buttonDefaultClass: 'btn btn-primary',
      buttonSubmittingText: 'Signing in...',
      buttonSubmittingIcon: 'icon-left fa fa-spin fa-refresh',
      buttonSuccessText: 'You\'ve been subscribed',
      buttonSuccessIcon: 'icon-left fa fa-check',
      buttonSuccessClass: 'btn-success',
      buttonErrorText: 'Error subscribing',
      buttonErrorIcon: 'icon-left fa fa-remove',
      buttonErrorClass: 'btn-danger'
    };

    $scope.getSkillsParams = function(skillName) {
      return skillName;
    };

    // $scope.scrollTo = function(id) {
    //   utilsService.scrollTo(id, 40);
    // };

    $scope.subscribe = function(form) {
      $scope.submitted = true;

      if (!form.$valid) return;

      $scope.subscribeSubmitting = true;

      subscribeService.subscribeToMassChallenge({
        email: $scope.form.email
      }).success(function success(response) {
        $timeout(function() {
          $scope.subscribeSubmitting = false;
          $scope.subscribeResult = 'success';
          $scope.form.email = null;
          $scope.submitted = false;
          form.email.$setPristine();
        }, 600);
      }).error(function error(response) {
        $timeout(function() {
          $scope.subscribeSubmitting = false;
          $scope.subscribeResult = 'error';
        }, 600);
      });
    };

    $scope.form = {};

    // ---------------- Register ---------------- //
    $scope.form = {};
    $scope.errorMsg = null;

    $scope.register = function(registerForm) {

      $scope.submitted = true;

      if (!registerForm.$valid) {
        $timeout(function() {
          $scope.submitted = false;
          $scope.registerForm.$setPristine();
        }, 2000);
        return;
      };

      $scope.registerSubmitting = true;

      $timeout(function() {
        userService.create({
          email: $scope.form.email,
          password: $scope.form.password
        }).then(function success(response) {
          authService.login($scope.form.email, $scope.form.password)
            .then(function success(response) {
              $scope.registerSubmitting = false;
              $rootScope.currentUser = response.user;
              authService.getUserClaims();

              $scope.loginResult = 'success';

              $state.go(routes.user, {
                userName: $scope.currentUser.userName
              });
            }, function error(response) {
              $scope.registerSubmitting = false;
              $scope.registerResult = 'error';
              $scope.errorMsg = 'Invalid email or password';
              $timeout(function() {
                $scope.errorMsg = null;
              }, 3000);
            });
        }, function error(response) {
          $scope.registerSubmitting = false;
          $scope.registerResult = 'error';
          $scope.errorMsg = utilsService.getServerErrorMessage(response);
          $timeout(function() {
            $scope.errorMsg = null;
          }, 3000);
        });
      }, 500);
    };
  }
]);
