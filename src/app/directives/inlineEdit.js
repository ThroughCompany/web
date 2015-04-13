// angular.module('throughCompanyApp').directive('inlineEdit', [
//   '$compile',
//   function($compile) {
//     return {
//       restrict: 'A',
//       scope: {
//         show: '=inlineEditShow'
//       },
//       link: function(scope, element, attrs) {
//         element.addClass('inline-edit-element');

//         var $wrapper = $('<div class="inline-edit-wrapper"></div>');

//         $wrapper.css('padding', element.css('padding'))
//           .css('margin', element.css('margin'));

//         element.wrap($wrapper)
//           .css('padding', 0)
//           .css('margin', 0);

//         var val = element.text();
//         var fontSize = element.css('font-size').substring(0, 2);

//         var $inputWrapper = $('<div class="inline-edit"></div>');
//         var $input = $('<input class="form-control" type="text" />');

//         $inputWrapper.append($input);

//         var fontWidth = val.length * (fontSize * .2);

//         $inputWrapper
//           .css('margin-left', -1 * (fontWidth / 2));

//         $input
//           .width(fontWidth)
//           .css('padding', Math.round(fontSize * .5) + 'px');

//         element.after($inputWrapper);

//         element.hover(function(e) {
//           e.stopPropagation();

//           if ($wrapper.hasClass('inline-edit-show')) {
//             $wrapper.removeClass('inline-edit-show');
//           } else {
//             $wrapper.addClass('inline-edit-show');
//           }
//         });

//         scope.$watch('show', function(val) {
//           if (val === false) $input.hide();
//           else $input.show();
//         });

//         //TODO: cleanup event listeners to avoid memory leaks
//       }
//     };
//   }
// ]);
