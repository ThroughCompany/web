angular.module('throughCompanyApp').controller('projectCtrl', [
  '$scope',
  '$rootScope',
  '$modal',
  '$timeout',
  'projectService',
  'alertService',
  'project',
  'utilsService',
  function($scope, $rootScope, $modal, $timeout, projectService, alertService, project, utilsService) {
    $rootScope.setMetaTitle(project.name);

    $scope.project = project;
    $scope.savingWiki = false;
    $scope.loaded = false;

    projectService.getProjectUsers({
      projectId: $scope.project._id
    }).then(function success(response) {
      $scope.projectUsers = response;
    });

    $scope.getProjectUserName = function(projectUser) {
      if (projectUser.firstName && projectUser.lastName) return projectUser.firstName + ' ' + projectUser.lastName;
      return projectUser.email;
    };

    $scope.form = {
      projectId: $scope.project._id,
      wiki: $scope.project.wiki
    };

    $scope.$watch('form.wiki', function(val) {
      if (!$scope.loaded) return;

      if (val !== undefined && val !== null && val !== '') {
        $scope.updateProjectThrottled();
      }
    });

    $scope.scrollTo = function(id) {
      utilsService.scrollTo(id, 40);
    };

    $timeout(function() {
      $scope.loaded = true;
    }, 300);

    $scope.updateProject = function(form) {
      $scope.savingWiki = true;

      projectService.updateProjectById($scope.form).then(function(response) {
        $timeout(function() {
          $scope.savingWiki = false;
        }, 500);
        $scope.project = _.extend($scope.project, response);
      }, function(response) {
        $timeout(function() {
          $scope.savingWiki = false;
        }, 500);

        $scope.logger.error(response);
      });
    };

    $scope.updateProjectThrottled = _.throttle($scope.updateProject, 2700);
  }
]);
