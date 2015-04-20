//https://github.com/dangrossman/bootstrap-daterangepicker
//
angular.module('throughCompanyApp').directive('characterCounter', [
  '$compile',
  function($compile) {
    'use strict';

    return {
      restrict: 'A',
      scope: {
        characterCounterMax: '@',
        characterCounter: '='
      },
      link: function(scope, element, attrs) {
        //http://www.chroder.com/2014/02/01/using-ngmodelcontroller-with-custom-directives/
        //

        var $el = angular.element(element);

        scope.charsLeft = scope.characterCounterMax || 500;

        var charCount = $('<div class="char-count" ng-class="{ low : charsLeft <= 10 }">{{ charsLeft }}</div>');
        var charCountCompiled = $compile(charCount)(scope);

        $el.after(charCountCompiled);

        scope.$watch('characterCounter', function(val) {
          if (!val || !val.length) {
            scope.charsLeft = scope.characterCounterMax;
            return;
          }
          scope.charsLeft = scope.characterCounterMax - val.length;

          if (scope.charsLeft <= 0) {
            scope.characterCounter = scope.characterCounter.substring(0, scope.characterCounterMax);
          }
        });
      }
    };
  }
]);
