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
        var options = {
          highlightSpeed: 10,
          typeSpeed: 80,
          clearDelay: 20,
          typeDelay: 100,
          clearOnHighlight: true,
          typerDataAttr: 'data-typer-targets',
          typerInterval: scope.typerInterval || 2000
        };

        $.typer.options = options;

        element.typer();

        // scope.$on('destroy', function() {

        // });
      }
    };
  }
]);
