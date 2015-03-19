angular.module('throughCompanyApp').controller('userProfileCtrl', [
  '$scope',
  '$state',
  '$rootScope',
  'userService',
  'projectService',
  'assetTagService',
  'alertService',
  function($scope, $state, $rootScope, userService, projectService, assetTagService, alertService) {
    $rootScope.setMetaTitle($scope.currentUser.email);

    $scope.addingAssetTags = false;
    $scope.projects = [];
    $scope.createAssetTag = _createAssetTag;
    $scope.getAssetTags = _getAssetTags;
    $scope.newAssetTag = function(tag) {
      console.log('new asset tag:');
      console.log(tag);

      return {
        name: tag
      };
    };

    _getProjects();

    $scope.addAssetTagForm = {
      tags: []
    };
    $scope.assetTags = [];

    $scope.$watch('addAssetTagForm.tags', function(val) {
      console.log('TAGS = ');
      console.log(val);

      if (!val || !val.length) return;
      // if (!val || !val.length) return;

      // var currentTags = $scope.currentUser.assetTags && $scope.currentUser.assetTags.length ? _.pluck($scope.currentUser.assetTags, 'name') : [];
      // var newTags = _.filter(val, function(tag) {
      //   return !_.contains(currentTags, tag);
      // });

      // if (newTags && newTags.length) {
      //   _.each(newTags, function(newTag) {
      //     $scope.createAssetTag(newTag.name);
      //   });
      // }
      //$scope.createAssetTag(val.name);
    });

    function _createAssetTag(tagName) {
      userService.createAssetTag({
        userId: $scope.currentUser._id,
        name: tagName
      }).then(function success(response) {
        alertService.success('Asset added.');
      }, function error(response) {
        alertService.error('Error adding asset.');
      });
    }

    function _getAssetTags(tagName) {
      if (!tagName || !tagName.length) return;

      assetTagService.getAll({
        name: tagName
      }).then(function success(response) {
        $scope.assetTags = response;
      });
    }

    function _getProjects() {
      userService.getUserProjects({
        userId: $scope.currentUser.id
      }).then(function success(response) {
        $scope.projects = $scope.projects.concat(response);
      }, function error(response) {
        console.log(response);
      });
    }
  }
]);
