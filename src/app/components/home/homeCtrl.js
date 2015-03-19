angular.module('throughCompanyApp').controller('homeCtrl', [
  '$scope',
  'projectService',
  function($scope, projectService) {
    projectService.getProjects({

    }).then(function success(response) {
      $scope.projects = response;
    });
  }
]);
