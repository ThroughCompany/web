angular.module('throughCompanyApp').controller('signUpController', [
  '$scope',
  '$state',
  'authService',
  'userService',
  'utilsService',
  'routes',
  '$timeout',
  function($scope, $state, authService, userService, utilsService, routes, $timeout) {
    $scope.form = {};

    $scope.register = function(registerForm) {

      $scope.submitted = true;

      if (!registerForm.$valid) return;

      userService.create({
        email: $scope.form.email,
        password: $scope.form.password
      }).then(function success(response) {
        $scope.registerSuccess = true;
        $scope.registerFail = false;
        $scope.registerSuccessMsg = 'Account created';

        $timeout(function() {
          $state.transitionTo(routes.login);
        }, 1000);
      }, function error(response) {
        if (response.status === 400) {
          $scope.registerFail = true;
          $scope.registerFailMsg = utilsService.getServerErrorMessage(response);
        }
      });
    };

    $scope.loginFacebook = function($event) {

      $event.preventDefault();

      $scope.loggingInFacebook = true;

      authService.loginFacebook().then(function success(response) {
        $timeout(function() {
          $state.go(routes.userDashboard);
        }, 500);
      }, function error(response) {
        $scope.loggingInFacebook = false;
        $scope.loginFacebookError = true;

        $timeout(function() {
          $scope.loginFacebookError = false;
        }, 2500);
      });
    };
  }
]);
