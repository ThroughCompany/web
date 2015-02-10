    angular.module('throughCompanyApp').controller('appController', [
      '$scope',
      '$rootScope',
      '$state',
      'user',
      'userClaims',
      'states',
      function($scope, $rootScope, $state, user, userClaims, states) {
        $rootScope.user = user;
        $rootScope.userClaims = userClaims;
        $rootScope.states = states; //US states
      }
    ]);
