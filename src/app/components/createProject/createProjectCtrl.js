angular.module('throughCompanyApp').controller('createProjectCtrl', [
  '$scope',
  '$timeout',
  '$state',
  'projectService',
  'alertService',
  'utilsService',
  'authService',
  function($scope, $timeout, $state, projectService, alertService, utilsService, authService) {
    $scope.setMetaTitle('Create a New Project');
    $scope.setMetaDescription('Have an great idea! Start a new project now.');

    // ---------------- buttons ----------------
    // create project button
    $scope.createProjectSubmitting = null;
    $scope.createProjectResult = null;
    $scope.createProjectBtnOptions = {
      buttonDefaultText: 'Create Project',
      buttonDefaultClass: 'btn btn-primary',
      buttonSubmittingText: 'Creating Project...',
      buttonSubmittingIcon: 'icon-left fa fa-spin fa-refresh',
      buttonSuccessText: 'Project Created',
      buttonSuccessIcon: 'icon-left fa fa-check',
      buttonSuccessClass: 'btn-success',
      buttonErrorText: 'Error creating project',
      buttonErrorIcon: 'icon-left fa fa-remove',
      buttonErrorClass: 'btn-danger'
    };

    $scope.submitted = false;
    $scope.form = {};

    $scope.createProject = function(form) {
      $scope.submitted = true;

      if (!form.$valid) return;

      $scope.createProjectSubmitting = true;

      projectService.create($scope.form).then(function success(response) {
        $scope.createProjectSubmitting = false;
        $scope.createProjectResult = 'success';

        $timeout(function() {
          $rootScope.currentUserProjects.push(response);
          $state.go($scope.routes.userProfile);

          alertService.success('Project Created');

          authService.getUserClaims();
        }, 500);
      }, function error(response) {
        $scope.createProjectSubmitting = false;
        $scope.createProjectResult = 'error';
        $scope.createProjectBtnOptions.buttonErrorText = utilsService.getServerErrorMessage(response);
      });
    };
  }
]);
