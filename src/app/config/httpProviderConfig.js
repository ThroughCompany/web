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
            if ($window.localStorage.token) {
              config.headers['x-access-token'] = $window.localStorage.token;
            }
            return config;
          }
        };
      }
    ]);

    $httpProvider.interceptors.push(interceptor);
  }
]);
