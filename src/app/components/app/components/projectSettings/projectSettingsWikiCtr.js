angular.module('throughCompanyApp').controller('projectSettingsWikiCtrl', [
  '$scope',
  '$rootScope',
  'projectService',
  'alertService',
  function($scope, $rootScope, projectService, alertService) {

    $scope.projectPromise.then(function(response) {
      $scope.form = {
        projectId: $scope.project._id,
        wiki: $scope.project.wiki
      };
    });

    $scope.updateProject = function(form) {
      if (!form.$valid) return;

      projectService.updateProjectById($scope.form).then(function(response) {
        alertService.success('Wiki Saved');
      }, function(response) {
        $scope.logger.error(response);
      });
    };
  }
]);
