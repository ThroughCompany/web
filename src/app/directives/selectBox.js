angular.module('throughCompanyApp').directive('selectBox', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        items: '=',
        itemDisplayProp: '=',
        onItemSelected: '='
      },
      template: '<div class="select-box" ng-transclude></div>',
      link: function(scope, element, attrs) {

        var $el = angular.element(element);
        var itemDisplayProp = scope.itemDisplayProp || 'value';

        scope.onItemSelected = scope.onItemSelected || function() {};

        scope.isClosed = function() {
          if (!scope.items || !scope.items.length) return true;
          return false;
        };

        var $dropdown = angular.element('<ul class="dropdown-menu" ng-hide="isClosed()">' +
          '<li class="item" ng-repeat="item in items" data-index="{{ $index }}">' +
          '<a href="#" ng-click="selectCurrentItem(item, $event)">{{ item.name }}</a>' +
          '</li>' +
          '</ul>');

        var template = $compile($dropdown)(scope);

        $el.on('blur', function() {
          scope.$apply(function() {
            scope.items = [];
            scope.close = true;
            console.log("BLUR");
          });
        });

        $el.keydown(function(e) {
          switch (e.which) {
            case 40: // down
              scope.selectNextItem();
              break;
            case 13: // enter
              scope.selectCurrentItem();
              break;
            case 27: // esc
              scope.close = true;
              break;

            default:
              return; // exit this handler for other keys
          }

          e.preventDefault(); // prevent the default action (scroll / move caret)
        });

        $el.append(template);

        scope.selectNextItem = function() {
          var selectedItem = $el.find('.item.selected')[0];

          if (!selectedItem) {
            var firstItem = $el.find('.item')[0];
            if (firstItem) {
              var $firstItem = angular.element(firstItem);

              var index = $firstItem.index();

              $firstItem.addClass('selected');

              var item = scope.items[index];
              item.selected = true;

              console.log('first item');
            }
          } else {
            var $selectItem = angular.element(selectedItem);

            var index = $selectItem.index();

            var item = (index + 1) <= scope.items.length ? scope.items[index + 1] : scope.items[0];
            item.selected = true;

            console.log('next item');
          }
        };

        scope.unselectItems = function() {
          $el.find('.item').removeClass('selected');

          if (scope.items && scope.items.length) {
            for (var i = 0; i < scope.items.length; i++) {
              var item = scope.items[i];
              item.selected = false;
            }
          }
        };

        scope.selectCurrentItem = function(item, $event) {
          if ($event) $event.preventDefault();

          if (item) {
            scope.onItemSelected(item);
          } else {
            var selectedItem = $el.find('.item.selected')[0];
            var $selectItem = angular.element(selectedItem);
            var index = $selectItem.index();

            var item = scope.items[index];

            scope.onItemSelected(item);
          }

          scope.close = true;
          scope.items = [];
        };
      }
    };
  }
]);
