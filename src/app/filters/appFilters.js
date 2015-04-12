angular.module('throughCompanyApp').filter('iconlink', function() {
  return function(input, uppercase) {
    var icons = {
      FACEBOOK: 'fa-facebook',
      GITHUB: 'fa-github',
      LINKEDIN: 'fa-linkedin',
      TWITTER: 'fa-twitter',
      MEETUP: 'fa-meetup',
      DRIBBBLE: 'fa-dribbble',
      BEHANCE: 'fa-behance',
      YELP: 'fa-yelp',
      GOODREADS: 'GOODREADS',
      INSTAGRAM: 'fa-instagram',
      WEBSITE: 'fa-link',
      MEDIUM: 'fa-medium',
      BLOG: 'fa-link'
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
