(function() {
  'use strict';

  angular.module('system').config(['$httpProvider',
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
            } //   responseError: function(rejection) {
            //     if (rejection.status === 401) {
            //       authService.isLoggedIn = false;
            //       $state.transitionTo('system');
            //     }
            //     return $q.reject(rejection);
            //   }
            // };
          };
        }
      ]);

      $httpProvider.interceptors.push(interceptor);

    }
  ]);

}());