angular.module('throughCompanyApp').controller('userSettingsProfileCtrl', [
  '$scope',
  'userService',
  function($scope, userService) {

    $scope.form = {
      userId: $scope.currentUser._id
    };

    $scope.updateUser = function(form) {
      if (!form.$valid) return;

      userService.updateUserById($scope.form).then(function(response) {

      }, function(response) {
        $scope.logger.error(response);
      });
    }
  }
]);
