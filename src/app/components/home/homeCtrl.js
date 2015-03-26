angular.module('throughCompanyApp').controller('homeCtrl', [
  '$scope',
  'projectService',
  '$timeout',
  function($scope, projectService, $timeout) {
    $scope.loaded = false;

    $timeout(function() {
      $scope.showName = true;
      $timeout(function() {
        $scope.showCta = true;
      }, 300);
    }, 100);

    projectService.getProjects({}).then(function success(response) {
      $scope.loaded = true;
      $scope.projects = response;
    });
  }
]);
