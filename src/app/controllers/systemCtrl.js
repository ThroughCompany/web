angular.module('throughCompanyApp').controller('systemCtrl', [
  '$scope',
  '$rootScope',
  'loggerService',
  function($scope, $rootScope, logger) {
    logger.info('system controller loaded...');

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
