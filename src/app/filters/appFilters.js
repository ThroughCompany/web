angular.module('throughCompanyApp').filter('iconlink', function() {
  return function(input, uppercase) {
    var icons = {
      'ICON-FACEBOOK': 'fa-facebook',
      'ICON-twitter': 'fa-twitter',
      'ICON-linkedin': 'fa-linkedin',
      'ICON-pinterest': 'fa-pinterest',
      'ICON-reddit': 'fa-reddit',
      'ICON-GITHUB': 'fa-github',
      'ICON-MEDIUM': 'fa-medium'
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

    return _findIconName(icons, input);
  };
});
