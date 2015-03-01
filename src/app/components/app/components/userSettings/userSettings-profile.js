angular.module('throughCompanyApp').controller('userSettingsProfileCtrl', [
  '$scope',
  'userService',
  'alertService',
  function($scope, userService, alertService) {

    $scope.form = {
      userId: $scope.currentUser._id
    };

    $scope.updateUser = function(form) {
      if (!form.$valid) return;

      userService.updateUserById($scope.form).then(function(response) {
        alertService.success('Settings Saved');
      }, function(response) {
        $scope.logger.error(response);
      });
    }
  }
]);
