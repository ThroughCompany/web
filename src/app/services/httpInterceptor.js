angular.module('throughCompanyApp').factory('customHttpInterceptor', [
  'authUtilService',
  function(authUtilService) {
    return {
      request: function(request) {
        var token = authUtilService.getToken();

        if (token) request.headers['x-access-token'] = token;

        return request;
      },
      response: function(response) {
        return response;
      }
    };
  }
]).config([
  '$httpProvider',
  function($httpProvider) {
    $httpProvider.interceptors.push('customHttpInterceptor');
  }
]);
