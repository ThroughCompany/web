angular.module('throughCompanyApp').directive('equalHeights', [
  '$timeout',
  function($timeout) {
    return {
      restrict: 'A',
      scope: {
        items: '='
      },
      link: function(scope, element, attrs) {

        var selector = attrs.equalHeights;

        scope.$watch('items', function(newVal) {
          if (newVal && newVal.length) {
            $timeout(function() {
              equalize();
            });
          }
        });

        function equalize() {
          var height = 0;

          var $elements = angular.element(selector);

          _.each($elements, function(el) {
            $el = angular.element(el);
            var elHeight = $el.height();

            if (elHeight > height) height = elHeight;
          });

          $elements.height(height);
        }
      }
    };
  }
]);
