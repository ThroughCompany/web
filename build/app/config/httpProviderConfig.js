angular.module('throughCompanyApp').config(['$httpProvider',
  function($httpProvider) {

    var interceptor = ([
      '$location',
      '$q',
      '$window',
      function($location, $q, $window) {

        return {
          request: function(config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
              config.headers['x-access-token'] = $window.sessionStorage.token;
            }
            return config;
          }
        };
      }
    ]);

    $httpProvider.interceptors.push(interceptor);
  }
]);
