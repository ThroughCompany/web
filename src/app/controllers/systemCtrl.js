angular.module('throughCompanyApp').controller('systemCtrl', [
  '$scope',
  '$rootScope',
  'loggerService',
  'user',
  'userClaims',
  function($scope, $rootScope, logger, user, userClaims) {
    logger.info('system controller loaded...');

    $rootScope.currentUser = user;
    $rootScope.currentUserClaims = userClaims;
    $rootScope.currentUserProjects = [];
    $scope.currentYear = (new Date()).getFullYear();

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
