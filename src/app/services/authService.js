angular.module('throughCompanyApp').factory('authService', [
  '$rootScope',
  '$window',
  '$http',
  '$q',
  'appSettings',
  '$state',
  function($rootScope, $window, $http, $q, appSettings, $state) {

    var authService = {},
      tokenExpires = null;

    authService.hasCompanyClaim = function(userClaims, claim, companyId) {
      return userClaims[claim + '-' + companyId];
    };

    authService.login = function(email, password) {
      return $http.post(appSettings.baseUrl + '/auth/credentials', {
        email: email,
        password: password
      }).then(function success(response) {
        if (!response || !response.data) return $q.reject(response);

        $window.sessionStorage.token = response.data.token;
        $window.sessionStorage.userId = response.data.user._id;
        tokenExpires = new Date(response.data.expires);
        $rootScope.user = response.data.user;
        return response;
      });
    };

    authService.loginFacebook = function() {
      var deferred = $q.defer();

      var accessToken;
      var fbToken;

      FB.login(function(response) {
        if (response && response.authResponse) {
          accessToken = response.authResponse.accessToken;

          deferred.resolve(accessToken);
        } else {
          deferred.reject(response);
        }
      }, {
        scope: ['public_profile', 'email', 'user_friends']
      });

      return deferred.promise.then(function authenticateWithApi(token) {
        fbToken = token;

        return $http.post(appSettings.baseUrl + '/auth/facebook', {
          facebookAccessToken: token
        });
      }, function error(response) {
        return response;
      }).then(function storeToken(response) {
        if (!response || !response.data) return $q.reject(response);

        $window.sessionStorage.token = response.data.token;
        $window.sessionStorage.userId = response.data.user._id;
        $window.sessionStorage.fbToken = fbToken;

        tokenExpires = new Date(response.data.expires);
        $rootScope.user = response.data.user;
        return response;
      }, function error(response) {
        return response;
      });
    };

    authService.logout = function() {

      if ($window.sessionStorage.fbToken) FB.logout(function() {});

      delete $window.sessionStorage.token;
      delete $window.sessionStorage.userId;
      delete $window.sessionStorage.fbToken;

      $state.transitionTo('system.home');
    };

    authService.getToken = function() {
      return $window.sessionStorage.token;
    };

    authService.getUserId = function() {
      return $window.sessionStorage.userId;
    };

    authService.authTokenExpired = function() {
      return authTokenExpires <= Date.now();
    };

    authService.isLoggedIn = function() {
      return (authService.getToken() && authService.getToken().length) && (authService.getUserId() && authService.getUserId().length);
    };

    return authService;
  }
]);
