angular.module('throughCompanyApp').directive('addNeed', [
  '$rootScope',
  '$timeout',
  function($rootScope, $timeout) {
    return {
      restrict: 'E',
      scope: {
        project: '=',
        user: '=',
        cancel: '=',
        close: '='
      },
      templateUrl: '/app/directives/addNeed/addNeed.html',
      controller: 'addNeedCtrl'
    };
  }
]);
