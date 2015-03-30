angular.module('throughCompanyApp').controller('startProjectCtrl', [
  '$scope',
  '$rootScope',
  '$timeout',
  '$state',
  'alertService',
  'subscribeService',
  function($scope, $rootScope, $timeout, $state, alertService, subscribeService) {
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

    // ---------------- buttons ----------------
    // subscribe button
    $scope.subscribeSubmitting = null;
    $scope.subscribeResult = null;
    $scope.subscribeBtnOptions = {
      buttonDefaultText: 'Keep in touch',
      buttonDefaultClass: 'btn btn-primary',
      buttonSubmittingText: 'Signing in...',
      buttonSubmittingIcon: 'icon-left fa fa-spin fa-refresh',
      buttonSuccessText: 'You\'ve been subscribed',
      buttonSuccessIcon: 'icon-left fa fa-check',
      buttonSuccessClass: 'btn-success',
      buttonErrorText: 'Error subscribing',
      buttonErrorIcon: 'icon-left fa fa-remove',
      buttonErrorClass: 'btn-danger'
    };

    $scope.form = {};

    $scope.createProject = function(form) {
      $scope.submitted = true;

      if (!form.$valid) return;

      $state.go('system.signUp', {
        project: JSON.stringify($scope.form)
      });
    };

    $scope.subscribe = function(form) {
      $scope.submitted = true;

      if (!form.$valid) return;

      $scope.subscribeSubmitting = true;

      subscribeService.subscribe({
        email: $scope.form.email
      }).success(function success(response) {
        console.log(response);
        $scope.subscribeSubmitting = false;
        $scope.subscribeResult = 'success';
      }).error(function error(response) {
        console.log(response);
        $scope.subscribeSubmitting = false;
        $scope.subscribeResult = 'error';
      });
    };
  }
]);
