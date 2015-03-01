angular.module('throughCompanyApp').controller('createProjectCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  'projectService',
  'alertService',
  function($scope, $rootScope, $state, projectService, alertService) {
    $rootScope.setMetaTitle('Create a New Project');

    $scope.submitted = false;
    $scope.form = {};

    $scope.createProject = function(form) {
      $scope.submitted = true;

      if (!form.$valid) return;

      projectService.create($scope.form).then(function success(response) {
        $rootScope.currentUserProjects.push(response);
        $state.go($scope.routes.userProfile);
        alertService.success('Project Created');
      }, function error(response) {
        alertService.error('Something wrong happened when trying to create your project.');
      });
    };
  }
]);
