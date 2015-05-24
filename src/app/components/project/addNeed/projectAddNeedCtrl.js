angular.module('throughCompanyApp').controller('projectAddNeedCtrl', [
  '$scope',
  '$modalInstance',
  'project',
  function($scope, $modalInstance, project) {
    $scope.project = project;

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.close = function() {
      $modalInstance.close();
    };
  }
]);
