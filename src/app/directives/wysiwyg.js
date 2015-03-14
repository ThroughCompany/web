angular.module('throughCompanyApp').directive('wysiwyg', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      replace: true,
      template: '<textarea></textarea>',
      link: function(scope, element, attrs) {
        element.wysihtml5();
      }
    };
  }
]);
