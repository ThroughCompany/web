angular.module('throughCompanyApp').controller('jobCtrl', [
  '$scope',
  'job',
  'skillService',
  'userService',
  'loggerService',
  function($scope, job, skillService, userService, loggerService) {
    $scope.job = job;

    if ($scope.job.duration) {
      if ($scope.job.duration.startDate) $scope.job.duration.startDate = moment($scope.job.duration.startDate);
      if ($scope.job.duration.endDate) $scope.job.duration.endDate = moment($scope.job.duration.endDate);
    }

    $scope.job.durationSting = $scope.job.duration && $scope.job.duration.startDate && $scope.job.duration.endDate ? ($scope.job.duration.startDate.diff($scope.job.endDate), 'months', true) : null;

    skillService.getAll({
      needId: $scope.job._id
    }).then(function success(response) {
      $scope.skills = response;
    }, function error(response) {
      loggerService.error(response);
    });

    if ($scope.job.type === 'User') {
      userService.getUserById({
        userId: $scope.job.user
      }).then(function success(response) {
        $scope.user = response;
      }, function error(response) {
        loggerService.error(response);
      });
    } else if ($scope.job.type === 'Organization') {
      throw new Error('Not Implemented');
    } else if ($scope.job.type === 'Project') {
      throw new Error('Not Implemented');
    }
  }
]);
