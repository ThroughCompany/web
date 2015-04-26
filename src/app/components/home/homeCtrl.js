angular.module('throughCompanyApp').controller('homeCtrl', [
  '$scope',
  '$rootScope',
  'projectService',
  '$timeout',
  'subscribeService',
  'utilsService',
  'skillService',
  function($scope, $rootScope, projectService, $timeout, subscribeService, utilsService, skillService) {
    $scope.loaded = false;

    projectService.getProjects({}).then(function success(response) {
      $scope.loaded = true;
      $scope.projects = response;
    });

    skillService.getAll({}).then(function success(response) {
      $scope.skills = response;
    });

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

    // $scope.scrollTo = function(id) {
    //   utilsService.scrollTo(id, 40);
    // };

    $scope.subscribe = function(form) {
      $scope.submitted = true;

      if (!form.$valid) return;

      $scope.subscribeSubmitting = true;

      subscribeService.subscribeToMassChallenge({
        email: $scope.form.email
      }).success(function success(response) {
        $timeout(function() {
          $scope.subscribeSubmitting = false;
          $scope.subscribeResult = 'success';
          $scope.form.email = null;
          $scope.submitted = false;
          form.email.$setPristine();
        }, 600);
      }).error(function error(response) {
        $timeout(function() {
          $scope.subscribeSubmitting = false;
          $scope.subscribeResult = 'error';
        }, 600);
      });
    };

    $scope.form = {};
  }
]);
