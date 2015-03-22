angular.module('throughCompanyApp').controller('signInCtrl', [
  '$scope',
  '$stateParams',
  'authService',
  'utilsService',
  'projectService',
  '$state',
  'routes',
  '$timeout',
  function($scope, $stateParams, authService, utilsService, projectService, $state, routes, $timeout) {
    $scope.project = $state.params.project ? JSON.parse($state.params.project) : null;

    var start = 100;
    $timeout(function() {
      $scope.showEmail = true;
    }, start);
    $timeout(function() {
      $scope.showPassword = true;
    }, start + 100);
    $timeout(function() {
      $scope.showLoginBtn = true;
    }, start + 200);
    $timeout(function() {
      $scope.showNoAccount = true;
    }, start + 300);

    // ---------------- buttons ----------------
    // signin button
    $scope.loginSubmitting = null;
    $scope.loginResult = null;
    $scope.loginBtnOptions = {
      buttonDefaultText: 'Sign in',
      buttonDefaultClass: 'btn btn-primary',
      buttonSubmittingText: 'Signing in...',
      buttonSubmittingIcon: 'icon-left fa fa-spin fa-refresh',
      buttonSuccessText: 'Sign in successful',
      buttonSuccessIcon: 'icon-left fa fa-check',
      buttonSuccessClass: 'btn-success',
      buttonErrorText: 'Error signing in',
      buttonErrorIcon: 'icon-left fa fa-remove',
      buttonErrorClass: 'btn-danger'
    };

    $scope.form = {
      email: $stateParams.email
    };

    $scope.login = function(loginForm) {

      $scope.submitted = true;

      if (!loginForm.$valid) return;

      $scope.loginSubmitting = true;

      $timeout(function() {
        authService.login($scope.form.email, $scope.form.password)
          .then(function success(response) {
            $scope.loginSubmitting = false;

            $timeout(function() {
              $scope.loginResult = 'success';

              if ($scope.project) {
                projectService.create($scope.project).then(function success(response) {
                  $state.go($scope.routes.project, {
                    projectId: response._id
                  });
                }, function error(response) {
                  $state.go($scope.routes.userProfile);
                });
              } else {
                $state.go(routes.userProfile, {
                  project: $scope.project
                });
              }
            }, 500);
          }, function error(response) {
            $scope.loginSubmitting = false;
            $scope.loginResult = 'error';
            $scope.loginBtnOptions.buttonErrorText = utilsService.getServerErrorMessage(response);
          });
      }, 500);
    };

    // $scope.loginFacebook = function($event) {

    //   $event.preventDefault();

    //   $scope.loggingInFacebook = true;

    //   authService.loginFacebook().then(function success(response) {
    //     $timeout(function() {
    //       $state.go(routes.userProfile);
    //     }, 500);
    //   }, function error(response) {
    //     $scope.loggingInFacebook = false;
    //     $scope.loginFacebookError = true;

    //     $timeout(function() {
    //       $scope.loginFacebookError = false;
    //     }, 2500);
    //   });
    // };
  }
]);
