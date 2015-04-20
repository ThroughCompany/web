angular.module('throughCompanyApp').controller('projectViewNeedCtrl', [
  '$scope',
  '$state',
  '$rootScope',
  '$modalInstance',
  'project',
  'projectNeed',
  function($scope, $state, $rootScope, $modalInstance, project, projectNeed) {
    $scope.project = project;
    $scope.projectNeed = projectNeed;

    if ($scope.projectNeed.duration) {
      if ($scope.projectNeed.duration.startDate) $scope.projectNeed.duration.startDate = moment($scope.projectNeed.duration.startDate);
      if ($scope.projectNeed.duration.endDate) $scope.projectNeed.duration.endDate = moment($scope.projectNeed.duration.endDate);
    }

    $scope.durationSting = $scope.projectNeed.duration && $scope.projectNeed.duration.startDate && $scope.projectNeed.duration.endDate ? ($scope.projectNeed.duration.startDate.diff($scope.projectNeed.endDate), 'months', true) : null;

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  }
]);
