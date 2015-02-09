(function() {
    'use strict';

    angular.module('system.app').controller('appController', [
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

}());
