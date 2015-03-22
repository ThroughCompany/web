angular.module('throughCompanyApp').directive('imgUpload', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      template: '<span ng-transclude></span>',
      //scope: {},
      link: function(scope, element, attrs) {
        scope.fileSelectedFn = scope.$eval(attrs.fileSelected);
        scope.selectImage = function() {
          fileInput.click();
        };

        var btnClass = attrs.btnClass;
        var fileInput = angular.element('<input type="file" style="display:none" />');

        element.after(fileInput);

        fileInput.on('change', function() {
          if (this.files) scope.fileSelectedFn(this.files);
        });
      }
    };
  }
]);
