angular.module('throughCompanyApp').controller('projectViewNeedCtrl', [
  '$scope',
  '$state',
  '$rootScope',
  '$modalInstance',
  'project',
  'projectNeed',
  'projectService',
  'skillService',
  'alertService',
  'utilsService',
  function($scope, $state, $rootScope, $modalInstance, project, projectNeed, projectService, skillService, alertService, utilsService) {
    $scope.project = project;
    $scope.projectNeed = projectNeed;

    skillService.getAll({
      projectNeedId: $scope.projectNeed._id
    }).then(function success(response) {
      $scope.skills = response;
    });

    if ($scope.projectNeed.duration) {
      if ($scope.projectNeed.duration.startDate) $scope.projectNeed.duration.startDate = moment($scope.projectNeed.duration.startDate);
      if ($scope.projectNeed.duration.endDate) $scope.projectNeed.duration.endDate = moment($scope.projectNeed.duration.endDate);
    }

    $scope.durationSting = $scope.projectNeed.duration && $scope.projectNeed.duration.startDate && $scope.projectNeed.duration.endDate ? ($scope.projectNeed.duration.startDate.diff($scope.projectNeed.endDate), 'months', true) : null;

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.apply = function() {
      if (!$scope.currentUser) {
        $modalInstance.close();
        $state.go($scope.routes.signIn);
      } else {
        projectService.createApplication({
          projectId: $scope.project._id,
          needId: $scope.projectNeed._id
        }).then(function success(response) {
          $scope.currentUser.projectApplications.push(response);
          alertService.success('Your application has been sent to the project admins, you should hear back from them shortly.');
        }, function error(response) {
          alertService.error(utilsService.getServerErrorMessage(response));
        });
      }
    };
  }
]);
