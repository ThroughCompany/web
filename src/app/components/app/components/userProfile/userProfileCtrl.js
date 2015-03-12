angular.module('throughCompanyApp').controller('userProfileCtrl', [
  '$scope',
  '$rootScope',
  '$modal',
  'userService',
  function($scope, $rootScope, $modal, userService) {
    $rootScope.setMetaTitle($scope.currentUser.email);

    $scope.projects = [];

    _getProjects();

    $scope.addAssetTags = function() {
      var modalInstance = $modal.open({
        templateUrl: '/app/components/app/components/userAddAssetTags/userAddAssetTags.html',
        controller: 'userAddAssetTagsCtrl'
      });
    };

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
