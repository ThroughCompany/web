angular.module('throughCompanyApp').controller('projectSettingsCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  '$location',
  '$rootScope',
  'userService',
  'alertService',
  'projectService',
  'utilsService',
  function($scope, $state, $stateParams, $location, $rootScope, userService, alertService, projectService, utilsService) {
    $rootScope.setMetaTitle($scope.project.name + ' Profile');

    $scope.changeCurrentSettingsType = _changeCurrentSettingsType;

    $scope.settingTypes = [{
      name: 'Profile',
      icon: 'fa fa-building'
    }, {
      name: 'Images',
      icon: 'fa fa-image'
    }, {
      name: 'Links',
      icon: 'fa fa-link'
    }];

    $scope.changeCurrentSettingsType($stateParams.type ? _.find($scope.settingTypes, function(type) {
      return type.name.toLowerCase() === $stateParams.type.toLowerCase();
    }) : $scope.settingTypes[0]);

    $scope.form = {
      projectId: $scope.project._id
    };

    $scope.addUpdateLink = function(link) {
      console.log('ADD/UPDATE LINK');
      console.log(link);

      var patches = [{
        op: 'add',
        path: '/socialLinks/2',
        value: link
      }];

      projectService.updateProjectById({
        projectId: $scope.project._id,
        patches: patches
      }).then(function(response) {
        alertService.success('Settings Saved');

        $scope.project.socialLinks = response.socialLinks;

      }, function(response) {
        $scope.logger.error(response);
        alertService.error(utilsService.getServerErrorMessage(response));
      });
    };

    $scope.linkInputHandle = {};
    $scope.showHideAddLinks = function() {
      if ($scope.addLinks) {
        $scope.addLinks = false;
        $scope.linkInputHandle.clear();
      } else {
        $scope.addLinks = true;
      }
    };

    $scope.projectUpdates = _.clone($scope.project);

    $scope.updateProject = function(form) {
      if (!form.$valid) return;

      var patches = [];

      if ($scope.projectUpdates.description !== $scope.project.description) {
        patches.push({
          op: 'replace',
          path: '/description',
          value: $scope.projectUpdates.description
        });
      }

      if ($scope.projectUpdates.location !== $scope.project.location) {
        patches.push({
          op: 'replace',
          path: '/location',
          value: $scope.projectUpdates.location
        });
      }

      projectService.updateProjectById({
        projectId: $scope.project._id,
        patches: patches
      }).then(function(response) {
        alertService.success('Settings Saved');

        $scope.project.description = response.description;
        $scope.project.location = response.location;

      }, function(response) {
        $scope.logger.error(response);
        alertService.error(utilsService.getServerErrorMessage(response));
      });
    };

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

    $scope.isSubmittingBannerPic = null;
    $scope.bannerPicResult = null;
    $scope.bannerPicBtnOptions = {
      buttonInitialIcon: 'icon-left fa fa-image',
      buttonSubmittingIcon: 'icon-left fa fa-spin fa-refresh',
      buttonDefaultText: 'Upload Banner Pic',
      buttonDefaultIcon: 'icon-left fa fa-image',
      buttonDefaultClass: 'btn-default',
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

    function _changeCurrentSettingsType(type) {
      if (!type) return $state.go('system.404');

      $scope.currentSettingsType = type;
      $location.path('/project/' + $scope.project.slug + '/settings/' + type.name.toLowerCase());
    };
  }
]);
