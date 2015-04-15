angular.module('throughCompanyApp').directive('autoFocus', [
  function($timeout) {
    'use strict';

    return {
      restrict: 'A',
      scope: {
        autoFocus: '='
      },
      link: function(scope, element, attrs) {

        scope.$watch('autoFocus', function(currentValue) {
          if (currentValue) {
            $timeout(function() {
              element[0].focus();
            })
          }
        })
      }
    };
  }
]);
