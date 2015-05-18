angular.module('throughCompanyApp').controller('headerCtrl', [
  '$scope',
  '$timeout',
  function($scope, $timeout) {
    $scope.getUserName = function() {
      if (!$scope.currentUser) return null;

      if ($scope.currentUser.firstName && $scope.currentUser.lastName) {
        return $scope.currentUser.firstName + ' ' + $scope.currentUser.lastName;
      } else {
        return $scope.currentUser.email.split('@')[0];
      }
    };
  }
]);
