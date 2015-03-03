angular.module('throughCompanyApp').directive('imgUpload', function() {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    template: '<span ng-transclude></span>',
    link: function(scope, element, attrs) {

      var btnClass = attrs.btnClass;
      var fileInput = angular.element('<input type="file" style="display:none" />');
      var fileSelectedFn = scope.$eval(attrs.fileSelected);

      element.after(fileInput);

      scope.selectImage = function() {
        fileInput.click();
      };

      fileInput.on('change', function() {
        if (this.files) fileSelectedFn(this.files);
      });
    }
  };
});
