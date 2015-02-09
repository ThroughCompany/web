(function() {
    'use strict';

    angular.module('system').controller('loginController', [
        '$scope',
        'authService',
        '$state',
        'routes',
        '$timeout',
        function($scope, authService, $state, routes, $timeout) {
            $scope.form = {};

            if (authService.isLoggedIn()) {
                $state.go('system.app.user');
            }

            $scope.login = function(loginForm) {

                $scope.submitted = true;

                if (!loginForm.$valid) return;

                $scope.loggingIn = true;
                $scope.signinFail = false;
                $scope.signinSuccess = false;

                $timeout(function() {
                    authService.login($scope.form.email, $scope.form.password)
                        .then(function success(response) {
                            $scope.loggingIn = false;
                            $scope.signinSuccess = true;

                            $scope.signinFail = false;
                            $scope.signinSuccessMsg = 'Log in successful';

                            $timeout(function() {
                                $state.transitionTo(routes.userDashboard);
                            }, 500);
                        }, function error(response) {
                            $scope.loggingIn = false;

                            $scope.signinSuccess = false;

                            $scope.signinFail = true;
                            $scope.signinFailMsg = response.data.errors.message;
                        });
                }, 500);
            };

            $scope.loginFacebook = function($event) {

                $event.preventDefault();

                $scope.loggingInFacebook = true;

                authService.loginFacebook().then(function success(response) {
                    $timeout(function() {
                        $state.transitionTo(routes.userDashboard);
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

}());
