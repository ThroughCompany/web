angular.module('throughCompanyApp').controller('userSettingsProfileCtrl', [
  '$scope',
  '$rootScope',
  'userService',
  'alertService',
  function($scope, $rootScope, userService, alertService) {
    $rootScope.setMetaTitle('Your Profile');

    $scope.form = {
      userId: $scope.currentUser._id
    };

    $scope.updateUser = function(form) {
      if (!form.$valid) return;

      userService.updateUserById($scope.form).then(function(response) {
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

    $scope.updateProfilePic = function(files) {

      var file = files[0];

      $scope.isSubmittingProfilePic = true;
      $scope.profilePicResult = null;

      userService.uploadImage({
        userId: $scope.currentUser._id,
        image: file,
        imageType: 'PROFILE_PIC'
      }).then(function success(response) {
        $scope.currentUser.profilePic = response.profilePic;

        alertService.success('Image Saved');

        $scope.isSubmittingProfilePic = false;
        $scope.profilePicResult = 'success';
      }, function error(response) {
        alertService.error(response);
        $scope.isSubmittingProfilePic = false;
        $scope.profilePicResult = 'error';
      });
    };
  }
]);
