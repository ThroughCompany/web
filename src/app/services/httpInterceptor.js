angular.module('throughCompanyApp').factory('customHttpInterceptor', [
  'authUtilService',
  function(authUtilService) {
    return {
      request: function(data) {
        var token = authUtilService.getToken();

        if (token) data.headers['x-access-token'] = token;

        return data;
      }
    };
  }
]).config([
  '$httpProvider',
  function($httpProvider) {
    $httpProvider.interceptors.push('customHttpInterceptor');
  }
]);
