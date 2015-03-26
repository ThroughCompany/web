angular.module('throughCompanyApp').controller('signUpCtrl', [
  '$scope',
  '$state',
  'authService',
  'userService',
  'utilsService',
  'routes',
  '$timeout',
  function($scope, $state, authService, userService, utilsService, routes, $timeout) {
    $scope.project = $state.params.project;

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
    // signup button
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

    $scope.form = {};
    $scope.errorMsg = null;

    $scope.register = function(registerForm) {

      $scope.submitted = true;

      if (!registerForm.$valid) return;

      $scope.registerSubmitting = true;

      $timeout(function() {
        userService.create({
          email: $scope.form.email,
          password: $scope.form.password
        }).then(function success(response) {
          $scope.registerSubmitting = false;

          $timeout(function() {
            $scope.registerResult = 'success';
            $scope.registerBtnOptions.buttonSuccessText = 'Your account has been created. Please sign in.';

            $timeout(function() {
              $state.transitionTo(routes.signIn, {
                email: response.email,
                project: $scope.project
              });
            }, 2500);
          }, 1000);
        }, function error(response) {
          $scope.registerResult = 'error';
          $scope.errorMsg = utilsService.getServerErrorMessage(response);
          $timeout(function() {
            $scope.errorMsg = null;
          }, 3000);
        });
      }, 500);
    };

    // $scope.loginFacebook = function($event) {

    //   $event.preventDefault();

    //   $scope.loggingInFacebook = true;

    //   authService.loginFacebook().then(function success(response) {
    //     $timeout(function() {
    //       $state.go(routes.userDashboard);
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
