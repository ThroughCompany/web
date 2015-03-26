angular.module('throughCompanyApp').directive('fileUpload', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      template: '<span ng-transclude></span>',
      scope: {
        fileSelected: '='
      },
      link: function(scope, element, attrs) {
        scope.fileUploadTrigger = element.find('[file-upload-trigger]');
        //scope.fileSelected = scope.$eval(attrs.fileSelected);

        if (!scope.fileUploadTrigger) throw new Error('fileUpload must have child element with file-upload-trigger attribute');

        // scope.selectFile = function() {
        //   fileInput.click();
        // };

        scope.fileUploadTrigger.on('click', function() {
          fileInput.click();
        });

        scope.selectFile = function() {
          alert('asdfdsf');
        };

        var btnClass = attrs.btnClass;
        var fileInput = angular.element('<input type="file" style="display:none" />');

        element.after(fileInput);

        fileInput.on('change', function() {
          if (this.files) scope.fileSelected(this.files);
        });
      }
    };
  }
]);
