angular.module('throughCompanyApp').controller('startProjectCtrl', [
  '$scope',
  '$rootScope',
  '$timeout',
  '$state',
  'alertService',
  function($scope, $rootScope, $timeout, $state, alertService) {
    $rootScope.setMetaTitle('Start your Project');

    $scope.form = {};

    $scope.createProject = function(form) {
      $scope.submitted = true;

      if (!form.$valid) return;

      $state.go('system.signUp', {
        project: JSON.stringify($scope.form)
      });
    };
  }
]);
