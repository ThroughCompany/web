//https://github.com/dangrossman/bootstrap-daterangepicker
//
angular.module('throughCompanyApp').directive('dateRangePickerSingle', function() {
  'use strict';

  return {
    restrict: 'E',
    replace: true,
    require: 'ngModel',
    template: '<input class="form-control" type="text" />',
    scope: {
      datePickerOptions: '=',
      singleDatePicker: '@',
      parentEl: '@',
      opens: '@'
    },
    link: function(scope, element, attrs, ngModelCtrl) {
      //http://www.chroder.com/2014/02/01/using-ngmodelcontroller-with-custom-directives/
      //

      var $el = angular.element(element);

      var options = {};

      angular.extend(options, scope.datePickerOptions);

      var inlineOptions = {};
      if (scope.parentEl) inlineOptions.parentEl = scope.parentEl;
      if (scope.opens) inlineOptions.opens = scope.opens;
      inlineOptions.singleDatePicker = true; //always a single date picker
      angular.extend(options, inlineOptions);

      var picker = $el.daterangepicker(options, function(start, end, label) {
        ngModelCtrl.$setViewValue(start); //always set the model to just the start date, since this is a single date picker
      });

      ngModelCtrl.$formatters.push(function(modelValue) {
        console.log('modelValue');
        console.log(modelValue);

        return modelValue;
      });

      ngModelCtrl.$render = function() {
        if (ngModelCtrl.$viewValue) picker.data('daterangepicker').setStartDate(ngModelCtrl.$viewValue);
      };

      ngModelCtrl.$parsers.push(function(viewValue) {
        console.log('viewValue');
        console.log(viewValue);

        return viewValue;
      });
    }
  };
});
