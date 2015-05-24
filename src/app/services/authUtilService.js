angular.module('throughCompanyApp').factory('authUtilService', [
  'localStorageService',
  function(localStorageService) {

    function AuthUtilService() {}

    AuthUtilService.prototype.getToken = function() {
      return localStorageService.get('token');
    };

    AuthUtilService.prototype.getUserId = function() {
      return localStorageService.get('userId');
    };

    AuthUtilService.prototype.authTokenExpired = function() {
      var tokenExpires = localStorageService.get('tokenExpires');
      return tokenExpires <= Date.now();
    };

    return new AuthUtilService();
  }
]);
