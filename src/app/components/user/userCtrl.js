angular.module('throughCompanyApp').controller('userCtrl', [
  '$scope',
  '$state',
  '$rootScope',
  'userService',
  'skillService',
  'alertService',
  'utilsService',
  'user',
  '$modal',
  function($scope, $state, $rootScope, userService, skillService, alertService, utilsService, user, $modal) {
    $rootScope.setMetaTitle(user.email);

    $scope.user = user;
    $scope.addingAssetTags = false;
    $scope.organizations = [];
    $scope.projects = [];
    $scope.createAssetTag = _createAssetTag;
    $scope.getAssetTags = _getAssetTags;
    $scope.newAssetTag = function(tag) {
      return {
        name: tag
      };
    };

    _getOrganizations();
    _getProjects();

    $scope.addAssetTagForm = {
      tags: []
    };
    $scope.assetTags = [];

    $scope.$watch('addAssetTagForm.tags', function(val) {
      if (!val || !val.length) return;

      var currentTags = $scope.user.assetTags && $scope.user.assetTags.length ? _.pluck($scope.user.assetTags, 'name') : [];
      var newTags = _.filter(val, function(tag) {
        return !_.contains(currentTags, tag);
      });

      if (newTags && newTags.length) {
        _.each(newTags, function(newTag) {
          $scope.createAssetTag(newTag.name);
        });
        $scope.addAssetTagForm.tags = [];
        $scope.assetTags.selected = undefined;
      }
    });

    $scope.addNeed = function() {
      $modal.open({
        templateUrl: '/app/components/user/addNeed/userAddNeed.html',
        controller: 'userAddNeedCtrl',
        resolve: {
          user: function() {
            return $scope.user;
          }
        }
      });
    };

    $scope.viewNeed = function(projectNeed) {
      $modal.open({
        templateUrl: '/app/components/user/viewNeed/userViewNeed.html',
        controller: 'userViewNeedCtrl',
        resolve: {
          user: function() {
            return $scope.user;
          },
          need: function() {
            return projectNeed;
          }
        }
      });
    };


    function _createAssetTag(tagName) {
      userService.createAssetTag({
        userId: $scope.currentUser._id,
        name: tagName
      }).then(function success(response) {
        $scope.currentUser.assetTags.push(response);

        alertService.success('Asset added.');
      }, function error(response) {
        alertService.error(utilsService.getServerErrorMessage(response));
      });
    }

    function _getAssetTags(tagName) {
      if (!tagName || !tagName.length) return;

      skillService.getAll({
        name: tagName
      }).then(function success(response) {
        var indexedTags = _.indexBy($scope.currentUser.assetTags, 'name');

        $scope.assetTags = _.filter(response, function(tag) {

          var exists = indexedTags[tag.name];
          return exists ? false : true;
        });
      });
    }

    function _getOrganizations() {
      userService.getUserOrganizations({
        userId: $scope.user.id
      }).then(function success(response) {
        $scope.organizations = $scope.organizations.concat(response);
      }, function error(response) {
        console.log(utilsService.getServerErrorMessage(response));
      });
    }

    function _getProjects() {
      userService.getUserProjects({
        userId: $scope.user.id
      }).then(function success(response) {
        $scope.projects = $scope.projects.concat(response);
      }, function error(response) {
        console.log(utilsService.getServerErrorMessage(response));
      });
    }
  }
]);
