angular.module('throughCompanyApp').controller('appCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  'routes',
  'user',
  'userClaims',
  function($scope, $rootScope, $state, routes, user, userClaims) {
    $scope.logger.info('APP LOADED...');

    if (!user) {
      $state.go(routes.signIn);
    }

    $rootScope.currentUser = user;
    $rootScope.currentUserClaims = userClaims;
  }
]);
