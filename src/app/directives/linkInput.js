angular.module('throughCompanyApp').directive('linkInput', [
  '$compile',
  function($compile) {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="link-input">' +
        '<form name="addLinkForm" ng-class="{ \'link-added\' : selectedIcon }" novalidate>' +
        '<div class="form-group" ng-class="{ \'has-errors\' : submitted && (!addLinkForm.linkUrl.$valid || !addLinkForm.linkText.$valid) }">' +
        '<div class="link-input-icon-dropdown dropdown">' +
        '<a href="#" data-toggle="dropdown">' +
        '<i class="fa {{ selectedIcon }} selectedIcon" ng-show="selectedIcon"></i>' +
        '<i class="fa fa-caret-down"></i>' +
        '</a>' +
        '<div class="dropdown-menu">' +
        '<a href="#" ng-repeat="icon in icons" ng-click="selectIcon(icon)">' +
        '<i class="fa {{ icon }}"></i>' +
        '</a>' +
        '</div>' +
        '</div>' +
        '<input class="form-control link-input-control-link" name="linkUrl" ng-model="form.linkUrl" ng-pattern="linkUrlRegex" placeholder="Enter your link url (eg. http://www...)" required />' +
        '<input class="form-control link-input-control-text" name="linkText" ng-model="form.linkText" placeholder="Enter your link text" required />' +
        '<a href="#" class="link-input-icon-remove" ng-click="clear()">' +
        '<i class="fa fa-times"></i>' +
        '</a>' +
        '<button class="link-input-btn btn btn-default" ng-click="addLink(addLinkForm)">' +
        'Save' +
        '</button>' +
        '</div>' +
        '</form>' +
        '</div>',
      scope: {
        linkInputHandle: '=',
        link: '=',
        saveLink: '='
      },
      link: function(scope, element, attrs) {
        var iconDropDown = element.find('.link-input-icon-dropdown [data-toggle=dropdown]');

        iconDropDown.dropdown();

        scope.icons = {
          'ICON-FACEBOOK': 'fa-facebook',
          'ICON-twitter': 'fa-twitter',
          'ICON-linkedin': 'fa-linkedin',
          'ICON-pinterest': 'fa-pinterest',
          'ICON-reddit': 'fa-reddit',
          'ICON-GITHUB': 'fa-github',
          'ICON-MEDIUM': 'fa-medium'
        };

        scope.selectedIcon = scope.link ? _findIconName(scope.icons, scope.link.icon) : null;
        scope.selectIcon = function(icon) {
          scope.selectedIcon = icon;
        };

        scope.linkInputHandle = scope.linkInputHandle || {};

        scope.linkUrlRegex = new RegExp("^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$", "i");

        scope.form = {
          linkUrl: scope.link.link,
          linkText: scope.link.name,
          type: scope.link.type
        };

        scope.linkInputHandle.clear = scope.clear = function() {
          scope.selectedIcon = null;
          scope.form.linkUrl = null;
          scope.form.linkText = null;
          scope.form.linkType = null;
        };

        scope.addLink = function(form) {
          scope.submitted = true;

          if (!form.$valid) return;

          scope.saveLink({
            type: scope.form.type,
            link: scope.form.linkUrl,
            name: scope.form.linkText,
            icon: _findIconKey(scope.icons, scope.selectedIcon)
          });
        };

        function _findIconName(icons, icon) {
          var foundIcon = null;

          for (var key in icons) {
            if (key === icon) {
              foundIcon = icons[key];
              break;
            }
          }

          return foundIcon;
        }

        function _findIconKey(icons, icon) {
          var foundIcon = null;

          for (var key in icons) {
            if (icons[key] === icon) {
              foundIcon = key;
              break;
            }
          }

          return foundIcon;
        }
      }
    };
  }
]);
