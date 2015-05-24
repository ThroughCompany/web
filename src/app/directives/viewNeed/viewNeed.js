angular.module('throughCompanyApp').directive('viewNeed', [
  '$rootScope',
  '$timeout',
  function($rootScope, $timeout) {
    return {
      restrict: 'E',
      scope: {
        project: '=',
        user: '=',
        need: '=',
        cancel: '=',
        close: '='
      },
      templateUrl: '/app/directives/viewNeed/viewNeed.html',
      controller: 'viewNeedCtrl'
    };
  }
]);
