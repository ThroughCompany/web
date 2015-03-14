angular.module('throughCompanyApp').controller('projectSettingsProfileCtrl', [
  '$scope',
  '$rootScope',
  'userService',
  'alertService',
  function($scope, $rootScope, userService, alertService) {
    $rootScope.setMetaTitle($scope.project.name + ' Profile');

    $scope.form = {
      projectId: $scope.project._id
    };

  }
]);
