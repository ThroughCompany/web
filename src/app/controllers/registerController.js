(function() {
    'use strict';

    angular.module('system').controller('registerController', [
        '$scope',
        '$state',
        'userEntityService',
        'routes',
        '$timeout',
        function($scope, $state, userEntityService, routes, $timeout) {
            $scope.form = {};

            $scope.register = function(registerForm) {

                $scope.submitted = true;

                if (!registerForm.$valid) return;

                userEntityService.create($scope.form.email, $scope.form.emailConfirmation, $scope.form.password).then(function success(response) {
                    $scope.registerSuccess = true;
                    $scope.registerFail = false;
                    $scope.registerSuccessMsg = 'Account created';

                    $timeout(function() {
                        $state.transitionTo(routes.userDashboard);
                    }, 1000);
                }, function error(response) {
                    if (response.status === 400) {
                        $scope.registerFail = true;
                        $scope.registerFailMsg = response.data.errors.message;
                    }
                });

            };
        }
    ]);

}());
