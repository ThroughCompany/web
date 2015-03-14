angular.module('throughCompanyApp').directive('wysiwyg', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      replace: true,
      template: '<textarea class="form-control"></textarea>',
      link: function(scope, element, attrs) {
        element.wysihtml5();
      }
    };
  }
]);
