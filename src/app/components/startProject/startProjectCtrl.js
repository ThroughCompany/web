angular.module('throughCompanyApp').controller('startProjectCtrl', [
  '$scope',
  '$rootScope',
  '$timeout',
  '$state',
  'alertService',
  function($scope, $rootScope, $timeout, $state, alertService) {
    $rootScope.setMetaTitle('Start your Project');

    var start = 100;
    $timeout(function() {
      $scope.showTitle = true;
    }, start);
    $timeout(function() {
      $scope.showName = true;
    }, start + 100);
    $timeout(function() {
      $scope.showDesc = true;
    }, start + 200);
    $timeout(function() {
      $scope.showCreate = true;
    }, start + 300);

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
