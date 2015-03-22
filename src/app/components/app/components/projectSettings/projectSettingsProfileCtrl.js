angular.module('throughCompanyApp').controller('projectSettingsProfileCtrl', [
  '$scope',
  '$rootScope',
  'userService',
  'alertService',
  'projectService',
  function($scope, $rootScope, userService, alertService, projectService) {
    $scope.projectPromise.then(function() {
      $rootScope.setMetaTitle($scope.project.name + ' Profile');

      $scope.form = {
        projectId: $scope.project._id
      };
    });

    $scope.updateProject = function(form) {
      if (!form.$valid) return;

      projectService.updateProjectById($scope.form).then(function(response) {
        alertService.success('Settings Saved');
      }, function(response) {
        $scope.logger.error(response);
      });
    };

    $scope.isSubmittingProfilePic = null;
    $scope.profilePicResult = null;
    $scope.profilePicBtnOptions = {
      buttonInitialIcon: 'icon-left fa fa-image',
      buttonSubmittingIcon: 'icon-left fa fa-spin fa-refresh',
      buttonDefaultText: 'Upload Profile Pic',
      buttonDefaultIcon: 'icon-left fa fa-image',
      buttonSubmittingText: 'Saving Profile Pic...',
      buttonSuccessIcon: 'icon-left fa fa-check',
      buttonSuccessText: 'Profile Pic Updated',
      buttonErrorIcon: 'icon-left fa fa-remove',
      buttonErrorText: 'Error Uploading Profile Pic',
      buttonErrorClass: 'animated-button-error'
    };

    $scope.isSubmittingBannerPic = null;
    $scope.bannerPicResult = null;
    $scope.bannerPicBtnOptions = {
      buttonInitialIcon: 'icon-left fa fa-image',
      buttonSubmittingIcon: 'icon-left fa fa-spin fa-refresh',
      buttonDefaultText: 'Upload Banner Pic',
      buttonDefaultIcon: 'icon-left fa fa-image',
      buttonSubmittingText: 'Saving Banner Pic...',
      buttonSuccessIcon: 'icon-left fa fa-check',
      buttonSuccessText: 'Banner Pic Updated',
      buttonErrorIcon: 'icon-left fa fa-remove',
      buttonErrorText: 'Error Uploading Banner Pic',
      buttonErrorClass: 'animated-button-error'
    };

    $scope.updateProfilePic = function(files) {

      var file = files[0];

      $scope.isSubmittingProfilePic = true;
      $scope.profilePicResult = null;

      projectService.uploadImage({
        projectId: $scope.project._id,
        image: file,
        imageType: 'PROFILE_PIC_PROJECT'
      }).then(function success(response) {
        $scope.project.profilePic = response.profilePic;

        alertService.success('Image Saved');

        $scope.isSubmittingProfilePic = false;
        $scope.profilePicResult = 'success';
      }, function error(response) {
        alertService.error(response);
        $scope.isSubmittingProfilePic = false;
        $scope.profilePicResult = 'error';
      });
    };

    $scope.updateBannerPic = function(files) {

      var file = files[0];

      $scope.isSubmittingBannerPic = true;
      $scope.profilePicResult = null;

      projectService.uploadImage({
        projectId: $scope.project._id,
        image: file,
        imageType: 'BANNER_PIC_PROJECT'
      }).then(function success(response) {
        $scope.project.bannerPic = response.bannerPic;

        alertService.success('Image Saved');

        $scope.isSubmittingBannerPic = false;
        $scope.bannerPicResult = 'success';
      }, function error(response) {
        alertService.error(response);
        $scope.isSubmittingBannerPic = false;
        $scope.bannerPicResult = 'error';
      });
    };
  }
]);
