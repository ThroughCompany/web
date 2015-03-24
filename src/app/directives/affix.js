// angular.module('throughCompanyApp').directive('affix', [
//   '$rootScope',
//   '$timeout',
//   function($rootScope, $timeout) {
//     return {
//       restrict: 'A',
//       scope: {
//         offsetTop: '='
//       },
//       link: function(scope, element, attrs) {
//         var $el = angular.element(element);

//         scope.offsetTopTablet = attrs.offsetTopTablet;
//         scope.offsetTopMobile = attrs.offsetTopMobile;
//         scope.offsetBottom = attrs.offsetBottom;

//         var $document = $(document);
//         var $window = $(window);
//         var originalOffsetTop = scope.offsetTop;

//         var docHeight = $document.height();
//         scope.offsetBottom = scope.offsetBottom > 0 ? scope.offsetBottom : null;

//         $document.scroll(function() {
//           $timeout(function() {
//             var windowWidth = $window.width();

//             if (windowWidth <= 992 && windowWidth >= 768 && scope.offsetTopTablet) {
//               scope.offsetTop = scope.offsetTopTablet;
//             } else if (windowWidth <= 768 && scope.offsetTopMobile) {
//               scope.offsetTop = scope.offsetTopMobile;
//             } else {
//               scope.offsetTop = originalOffsetTop;
//             }

//             var y = $(this).scrollTop();

//             if (y >= scope.offsetTop) {
//               element.addClass('affix');
//             } else {
//               element.removeClass('affix');
//             }
//           });

//           // if (scope.offsetBottom !== undefined && scope.offsetBottom !== null) {
//           //   if (y >= (docHeight - scope.offsetBottom)) {
//           //     element.removeClass('affix');
//           //   }
//           // }
//         });

//         if (scope.offsetTopTablet || scope.offsetTopMobile) {
//           $window.resize(function() {
//             var windowWidth = $window.width();

//             if (windowWidth <= 992 && windowWidth >= 768) {
//               scope.offsetTop = scope.offsetTopTablet;
//             } else if (windowWidth <= 768) {
//               scope.offsetTop = scope.offsetTopMobile;
//             } else {
//               scope.offsetTop = originalOffsetTop;
//             }
//           });
//         }

//         $rootScope.$on('$stateChangeStart', function(event, toState, toParams) { //remove affix to avoid memory leaks
//           $document.off('.affix');
//           $window.off('.resize');
//         });
//       }
//     };
//   }
// ]);

// // angular.module('throughCompanyApp').directive('dynamicAffix', [
// //   '$rootScope',
// //   function($rootScope) {
// //     'use strict';

// //     return {
// //       restrict: 'A',
// //       link: function(scope, element, attrs) {
// //         var $el = angular.element(element);
// //         var offsetEl = attrs.offsetEl;

// //         var $document = $(document);

// //         $el.affix({
// //           offset: {
// //             top: $(offsetEl).height()
// //           }
// //         });

// //         $rootScope.$on('$stateChangeStart', function(event, toState, toParams) { //remove affix to avoid memory leaks
// //           $document.off('.affix');
// //         });
// //       }
// //     };
// //   }
// // ]);
