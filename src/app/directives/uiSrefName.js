angular.module('throughCompanyApp').directive('uiSrefName', [
  '$compile',
  function($compile) {
    return {
      restrict: 'A',
      priority: 1000,
      compile: function(element) {
        element.removeAttr('ui-sref-name'); // necessary to avoid infinite compile loop
        element.removeAttr('data-ui-sref-name'); // necessary to avoid infinite compile loop
        return {
          pre: function preLink($scope, element, attrs, controller) {
            var rawValue = attrs.uiSrefName;
            var params = rawValue.indexOf('({') != -1 ? rawValue.substring(rawValue.indexOf('({'), rawValue.length) : '';
            var value;
            if (params) {
              value = $scope.$eval(rawValue.substring(rawValue.indexOf('({'), 0));
              value += params;
            } else {
              value = $scope.$eval(attrs.uiSrefName);
            }

            element.attr('ui-sref', value);
            $compile(element)($scope);
          }
        };
      }
    };
  }
]);
