angular.module('throughCompanyApp').controller('organizationCtrl', [
  '$scope',
  '$state',
  '$rootScope',
  'organization',
  'organizationService',
  'loggerService',
  'alertService',
  function($scope, $state, $rootScope, organization, organizationService, loggerService, alertService) {
    $scope.setMetaTitle(organization.name);
    $scope.setMetaDescription(organization.name);

    $scope.organization = organization;
    $scope.loaded = true;

    $scope.isSubmittingProfilePic = null;
    $scope.profilePicResult = null;
    $scope.profilePicBtnOptions = {
      buttonInitialIcon: 'icon-left fa fa-image',
      buttonSubmittingIcon: 'icon-left fa fa-spin fa-refresh',
      buttonDefaultText: 'Upload Profile Pic',
      buttonDefaultIcon: 'icon-left fa fa-image',
      buttonDefaultClass: 'btn-default',
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

      organizationService.uploadImage({
        organizationId: $scope.organization._id,
        image: file,
        imageType: 'PROFILE_PIC_ORGANIZATION'
      }).then(function success(response) {
        $scope.organization.profilePic = response.profilePic;

        alertService.success('Image Saved');

        $scope.isSubmittingProfilePic = false;
      }, function error(response) {
        alertService.error(response);
        loggerService.error(response);
        $scope.isSubmittingProfilePic = false;
      });
    };
  }
]);
