angular.module('throughCompanyApp').controller('userAddAssetTagsCtrl', [
  '$scope',
  '$rootScope',
  '$modalInstance',
  'userService',
  'assetTagService',
  'alertService',
  function($scope, $rootScope, $modalInstance, userService, assetTagService, alertService) {
    $rootScope.setMetaTitle('Add Your Assets');

    $scope.form = {};

    $scope.ok = function() {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.onItemSelected = function(itemSelected) {
      userService.createAssetTag({
        userId: $scope.currentUser._id,
        name: itemSelected.name
      }).then(function success(response) {
        alertService.success('Asset added.');
      }, function error(response) {
        alertService.error('Error adding asset.');
      });
    };

    $scope.getAssetTags = _.throttle(function() {
      if (!$scope.form.name || !$scope.form.name.length) {
        $scope.tags = [];
        return;
      };

      assetTagService.getAll({
        name: $scope.form.name
      }).then(function success(response) {
        $scope.tags = response;
      });
    }, 100);
  }
]);
