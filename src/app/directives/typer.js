angular.module('throughCompanyApp').directive('typer', [
  '$compile',
  '$timeout',
  function($compile, $timeout) {
    return {
      restrict: 'A',
      scope: {
        typer: '@',
        typerInterval: '@'
      },
      template: function(element, attrs) {
        var text = attrs.typer;
        return element.attr('data-typer-targets', text);
      },
      link: function(scope, element, attrs) {
        console.log(scope.typerInterval);

        element.typer({
          highlightSpeed: 2,
          typeSpeed: 100,
          clearDelay: 500,
          typeDelay: 200,
          clearOnHighlight: true,
          typerDataAttr: 'data-typer-targets',
          typerInterval: scope.typerInterval || 2000
        });

        // scope.$on('destroy', function() {
          
        // });
      }
    };
  }
]);
