angular.module('throughCompanyApp').controller('searchCtrl', [
  '$scope',
  '$stateParams',
  'loggerService',
  'projectService',
  function($scope, $stateParams, loggerService, projectService) {

    if ($stateParams.tags) {
      $scope.skills = $stateParams.tags;
      _getProjects();
    }

    function _getProjects() {
      projectService.getProjects({
        skills: $scope.skills
      }).then(function success(response) {
        $scope.projects = response;
      });
    }
  }
]);
