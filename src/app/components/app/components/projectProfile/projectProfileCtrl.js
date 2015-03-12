angular.module('throughCompanyApp').controller('projectProfileCtrl', [
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
