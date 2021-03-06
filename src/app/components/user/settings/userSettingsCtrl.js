angular.module('throughCompanyApp').controller('userSettingsCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  '$location',
  'userService',
  'alertService',
  'utilsService',
  'patchService',
  function($scope, $state, $stateParams, $location, userService, alertService, utilsService, patchService) {

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
    }, {
      name: 'Applications',
      icon: 'fa fa-file-code-o'
    }];

    $scope.changeCurrentSettingsType($stateParams.type ? _.find($scope.settingTypes, function(type) {
      return type.name.toLowerCase() === $stateParams.type.toLowerCase();
    }) : $scope.settingTypes[0]);

    $scope.form = {
      userId: $scope.currentUser._id
    };

    $scope.unsavedSocialLinks = [];

    $scope.newLink = function() {
      $scope.unsavedSocialLinks.push({});
    };

    $scope.deleteLink = function(link) {
      var updates = angular.copy($scope.currentUser.toJSON());
      var foundLink = _.find(updates.socialLinks, function(socialLink) {
        return socialLink._id === link._id;
      });

      if (!foundLink) {
        alertService.error('Link not found');
        return;
      }

      updates.socialLinks.splice(updates.socialLinks.indexOf(foundLink), 1);

      var patches = patchService.generatePatches({
        socialLinks: $scope.currentUser.toJSON().socialLinks
      }, {
        socialLinks: updates.socialLinks
      });

      userService.updateUserById({
        userId: $scope.currentUser._id,
        patches: patches
      }).then(function(response) {
        alertService.success('Settings Saved');

        $scope.currentUser.socialLinks = response.socialLinks;

      }, function(response) {
        $scope.logger.error(response);
        alertService.error(utilsService.getServerErrorMessage(response));
      });
    };

    $scope.addLink = function(link) {
      var updates = angular.copy($scope.currentUser.toJSON());

      updates.socialLinks.push(link);

      var patches = patchService.generatePatches({
        socialLinks: $scope.currentUser.toJSON().socialLinks
      }, {
        socialLinks: updates.socialLinks
      });

      userService.updateUserById({
        userId: $scope.currentUser._id,
        patches: patches
      }).then(function(response) {
        alertService.success('Settings Saved');

        $scope.currentUser.socialLinks.push(link);

      }, function(response) {
        $scope.logger.error(response);
        alertService.error(utilsService.getServerErrorMessage(response));
      });

      $scope.unsavedSocialLinks.length = 0;
    };

    $scope.updateLink = function(link) {
      var updates = angular.copy($scope.currentUser.toJSON());
      var foundLink = _.find(updates.socialLinks, function(socialLink) {
        return socialLink._id === link._id;
      });

      if (!foundLink) {
        alertService.error('Link not found');
        return;
      }

      foundLink.type = link.type;
      foundLink.name = link.name;
      foundLink.link = link.link;

      var patches = patchService.generatePatches({
        socialLinks: $scope.currentUser.toJSON().socialLinks
      }, {
        socialLinks: updates.socialLinks
      });

      userService.updateUserById({
        userId: $scope.currentUser._id,
        patches: patches
      }).then(function(response) {
        alertService.success('Settings Saved');

        $scope.currentUser.socialLinks = response.socialLinks;

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

    $scope.userUpdates = _.clone($scope.user.toJSON());

    $scope.updateUser = function(form) {
      if (!form.$valid) return;

      var patches = patchService.generatePatches($scope.currentUser, $scope.userUpdates);

      userService.updateUserById({
        userId: $scope.currentUser._id,
        patches: patches
      }).then(function(response) {
        alertService.success('Settings Saved');

        $scope.currentUser.description = response.description;
        $scope.currentUser.location = response.location;

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

    $scope.updateProfilePic = function(files) {

      var file = files[0];

      $scope.isSubmittingProfilePic = true;
      $scope.profilePicResult = null;

      userService.uploadImage({
        userId: $scope.currentUser._id,
        image: file,
        imageType: 'PROFILE_PIC_USER'
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

    function _changeCurrentSettingsType(type) {
      if (!type) return $state.go('system.404');

      $scope.currentSettingsType = type;
      //$location.path('/user/' + $scope.user.userName + '/settings/' + type.name.toLowerCase());
    }
  }
]);
