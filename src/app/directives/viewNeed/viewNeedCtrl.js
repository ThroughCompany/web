angular.module('throughCompanyApp').controller('viewNeedCtrl', [
  '$scope',
  '$state',
  '$rootScope',
  'applicationService',
  'skillService',
  'alertService',
  'utilsService',
  'modalService',
  function($scope, $state, $rootScope, applicationService, skillService, alertService, utilsService, modalService) {
    skillService.getAll({
      needId: $scope.need._id
    }).then(function success(response) {
      $scope.skills = response;
    });

    if ($scope.need.duration) {
      if ($scope.need.duration.startDate) $scope.need.duration.startDate = moment($scope.need.duration.startDate);
      if ($scope.need.duration.endDate) $scope.need.duration.endDate = moment($scope.need.duration.endDate);
    }

    $scope.durationSting = $scope.need.duration && $scope.need.duration.startDate && $scope.need.duration.endDate ? ($scope.need.duration.startDate.diff($scope.need.endDate), 'months', true) : null;

    $scope.apply = function() {
      if (!$rootScope.currentUser) {
        if ($scope.close) $scope.close();
        $state.go($rootScope.routes.signIn);
      } else {
        modalService.confirm({
          confirmMessage: 'Are you sure you would like to apply?',
          confirmButtonMessage: 'Yes'
        }).then(function confirmed() {
          applicationService.create({
            projectId: $scope.project ? $scope.project._id : null,
            userId: $scope.user ? $scope.user._id : null,
            needId: $scope.need._id
          }).then(function success(response) {
            $rootScope.currentUser.createdApplications.push(response);
            if ($scope.close) $scope.close();
            alertService.success('Your application has been sent, you should hear back shortly.');
          }, function error(response) {
            if ($scope.close) $scope.close();
            alertService.error(utilsService.getServerErrorMessage(response));
          });
        }, function declined() {

        });
      }
    };
  }
]);
