angular.module('throughCompanyApp').controller('createOrganizationCtrl', [
  '$scope',
  '$rootScope',
  '$timeout',
  '$state',
  'organizationService',
  'alertService',
  'utilsService',
  'authService',
  function($scope, $rootScope, $timeout, $state, organizationService, alertService, utilsService, authService) {
    $scope.setMetaTitle('Create a New Organization');
    //$scope.setMetaDescription('Have an great idea! Start a new project now.');

    // ---------------- buttons ----------------
    // create organization button
    $scope.createOrganizationSubmitting = null;
    $scope.createOrganizationResult = null;
    $scope.createOrganizationBtnOptions = {
      buttonDefaultText: 'Create Organization',
      buttonDefaultClass: 'btn btn-primary',
      buttonSubmittingText: 'Creating Organization...',
      buttonSubmittingIcon: 'icon-left fa fa-spin fa-refresh',
      buttonSuccessText: 'Organization Created',
      buttonSuccessIcon: 'icon-left fa fa-check',
      buttonSuccessClass: 'btn-success',
      buttonErrorText: 'Error creating organization',
      buttonErrorIcon: 'icon-left fa fa-remove',
      buttonErrorClass: 'btn-danger'
    };

    $scope.submitted = false;
    $scope.form = {};

    $scope.createOrganization = function(form) {
      $scope.submitted = true;

      if (!form.$valid) return;

      $scope.createOrganizationSubmitting = true;

      organizationService.create($scope.form).then(function success(response) {
        $scope.createOrganizationSubmitting = false;
        $scope.createProjectResult = 'success';

        $timeout(function() {
          $rootScope.currentUserOrganizations.push(response);
          $state.go($scope.routes.user, {
            userName: $scope.currentUser.userName
          });

          alertService.success('Organization Created');

          authService.getUserClaims();
        }, 500);
      }, function error(response) {
        $scope.createOrganizationSubmitting = false;
        $scope.createProjectResult = 'error';
        $scope.createOrganizationBtnOptions.buttonErrorText = utilsService.getServerErrorMessage(response);
      });
    };
  }
]);
