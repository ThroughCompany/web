angular.module('throughCompanyApp').controller('projectSettingsCtrl', [
  '$scope',
  '$stateParams',
  'projectService',
  function($scope, $stateParams, projectService) {
    projectService.getProjectById({
      projectId: $stateParams.projectId
    }).then(function(response) {
      $scope.project = response;
    });
  }
]);
