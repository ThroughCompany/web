angular.module('throughCompanyApp').controller('homeCtrl', [
  '$scope',
  'projectService',
  '$timeout',
  function($scope, projectService, $timeout) {
    $scope.loaded = false;

    projectService.getProjects({}).then(function success(response) {
      $scope.loaded = true;
      $scope.projects = response;
    });
  }
]);
