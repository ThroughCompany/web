angular.module('throughCompanyApp').controller('projectViewNeedCtrl', [
  '$scope',
  '$modalInstance',
  'project',
  'need',
  function($scope, $modalInstance, project, need) {
    $scope.project = project;
    $scope.need = need;

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.close = function() {
      $modalInstance.close();
    };
  }
]);
