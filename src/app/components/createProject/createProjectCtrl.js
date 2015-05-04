angular.module('throughCompanyApp').controller('createProjectCtrl', [
  '$scope',
  '$rootScope',
  '$timeout',
  '$state',
  'projectService',
  'alertService',
  'utilsService',
  'authService',
  'userService',
  function($scope, $rootScope, $timeout, $state, projectService, alertService, utilsService, authService, userService) {
    $scope.setMetaTitle('Create a New Project');
    $scope.setMetaDescription('Have an great idea! Start a new project now.');

    userService.getUserOrganizations({
      userId: $scope.currentUser._id
    }).then(function success(response) {
      $scope.userOrganizations = response;
    }, function error(response) {
      alertService.success(response);
    });

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
          $state.go($scope.routes.user, {
            userName: $scope.currentUser.userName
          });

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
