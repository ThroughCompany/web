angular.module('throughCompanyApp').directive('loading', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      scope: {
        loading: '='
      },
      template: '<p class="center" ng-show="loading"><i class="fa fa-load fa-spin"></i></p>',
      link: function(scope, element, attrs) {

      }
    };
  }
]);
