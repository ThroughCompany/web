angular.module('throughCompanyApp').controller('userProfileCtrl', [
  '$scope',
  'userService',
  function($scope, userService) {

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
