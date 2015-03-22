angular.module('throughCompanyApp').controller('projectSettingsCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'projectService',
  function($scope, $state, $stateParams, projectService) {
    $scope.projectPromise = projectService.getProjectById({
      projectId: $stateParams.projectId
    });

    $scope.projectPromise.then(function(response) {
      $scope.project = response;
    });
  }
]);
