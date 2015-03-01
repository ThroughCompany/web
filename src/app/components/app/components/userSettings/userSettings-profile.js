angular.module('throughCompanyApp').controller('userSettingsProfileCtrl', [
  '$scope',
  '$rootScope',
  'userService',
  'alertService',
  function($scope, $rootScope, userService, alertService) {
    $rootScope.setMetaTitle('Your Profile');

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
