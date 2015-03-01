angular.module('throughCompanyApp').controller('systemCtrl', [
  '$scope',
  '$rootScope',
  'loggerService',
  function($scope, $rootScope, logger) {
    logger.info('system controller loaded...');

    $scope.getUserName = function() {
      if (!$scope.currentUser) return null;

      if ($scope.currentUser.firstname && $scope.currentUser.lastname) {
        return $scope.currentUser.firstname + ' ' + $scope.currentUser.lastname;
      } else {
        return $scope.currentUser.email;
      }
    };
  }
]);
