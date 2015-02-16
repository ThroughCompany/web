  angular.module('throughCompanyApp').controller('userDashboardController', [
    '$scope',
    'userService',
    function($scope, userService) {

      $scope.projects = [];

      userService.getUserProjects({
        userId: $scope.user.id
      }).then(function success(response) {
        $scope.projects = $scope.projects.concat(response);
      }, function error(response) {
      	console.log(response);
      });
    }
  ]);
