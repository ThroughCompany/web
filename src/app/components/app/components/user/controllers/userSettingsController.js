  angular.module('throughCompanyApp').controller('userSettingsController', [
    '$scope',
    'userEntityService',
    function($scope, userEntityService) {
      $scope.isSubmitting = null;
      $scope.result = null;
      $scope.btnOptions = {
        buttonSubmittingIcon: 'fa fa-refresh',
        buttonSuccessIcon: 'fa fa-check',
        buttonDefaultText: 'Save'
      };

      $scope.updateUserSettings = function() {
        $scope.isSubmitting = true;

        userEntityService.updateUserById($scope.user._id, {
          firstname: $scope.user.firstname,
          lastname: $scope.user.lastname
        }).then(function success(response) {
          $scope.result = 'success';
        }, function error(response) {
          $scope.result = 'error';
        });
      };
    }
  ]);
