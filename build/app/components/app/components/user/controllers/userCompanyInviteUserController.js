  angular.module('throughCompanyApp').controller('userCompanyInviteUserController', [
    '$scope',
    'userEntityService',
    function($scope, userEntityService) {
      $scope.form = {};

      $scope.inviteUser = function(inviteCompanyUserForm) {
        $scope.submitted = true;

        if (!inviteCompanyUserForm.$valid) return;

        userEntityService.addUserCompanyUser($scope.user._id, $scope.company._id, $scope.form.email, $scope.form.emailConfirmation).then(function success(response) {
          alert('yyyyeeeea hawwwww');
        });

      };
    }
  ]);
