angular.module('throughCompanyApp').controller('projectCtrl', [
  '$scope',
  '$rootScope',
  '$modal',
  'projectService',
  'project',
  function($scope, $rootScope, $modal, projectService, project) {
    $rootScope.setMetaTitle(project.name);

    $scope.project = project;
  }
]);
