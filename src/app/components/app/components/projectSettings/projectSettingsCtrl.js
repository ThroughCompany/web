angular.module('throughCompanyApp').controller('projectSettingsCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'projectService',
  function($scope, $state, $stateParams, projectService) {
    projectService.getProjectById({
      projectId: $stateParams.projectId
    }).then(function(response) {
      $state.go('system.app.projectSettings.profile');
      $scope.project = response;
    });
  }
]);
