angular.module('throughCompanyApp').controller('userProfileCtrl', [
  '$scope',
  '$rootScope',
  'userService',
  function($scope, $rootScope, userService) {
    $rootScope.setMetaTitle($scope.currentUser.email);

    $scope.projects = [];

    userService.getUserProjects({
      userId: $scope.currentUser.id
    }).then(function success(response) {
      $scope.projects = $scope.projects.concat(response);
    }, function error(response) {
      console.log(response);
    });
  }
]);
