angular.module('throughCompanyApp').controller('appController', [
  '$scope',
  '$rootScope',
  '$state',
  'user',
  'userClaims',
  function($scope, $rootScope, $state, user, userClaims) {
    console.log('APP LOADED...');

    $rootScope.user = user;
    $rootScope.userClaims = userClaims;
  }
]);
