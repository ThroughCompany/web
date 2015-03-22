angular.module('throughCompanyApp').factory('authService', [
  '$rootScope',
  '$window',
  '$http',
  '$q',
  'appSettings',
  '$state',
  'loggerService',
  'userService',
  function($rootScope, $window, $http, $q, appSettings, $state, loggerService, userService) {

    function AuthService() {}

    AuthService.prototype.login = function(email, password) {
      return $http.post(appSettings.baseUrl + '/auth/credentials', {
        email: email,
        password: password
      }).then(function success(response) {
        if (!response || !response.data) return $q.reject(response);

        $window.sessionStorage.tokenExpires = new Date(response.data.expires);
        $window.sessionStorage.token = response.data.token;
        $window.sessionStorage.userId = response.data.user._id;

        $rootScope.user = response.data.user;

        return response;
      });
    };

    AuthService.prototype.loginFacebook = function() {
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

        $window.sessionStorage.tokenExpires = new Date(response.data.expires);
        $window.sessionStorage.token = response.data.token;
        $window.sessionStorage.userId = response.data.user._id;
        $window.sessionStorage.fbToken = fbToken;

        $rootScope.user = response.data.user;
        return response;
      }, function error(response) {
        return response;
      });
    };

    AuthService.prototype.logout = function() {

      if ($window.sessionStorage.fbToken) FB.logout(function() {});

      delete $window.sessionStorage.token;
      delete $window.sessionStorage.userId;
      delete $window.sessionStorage.fbToken;

      $state.transitionTo('system.home');
    };

    AuthService.prototype.getToken = function() {
      return $window.sessionStorage.token;
    };

    AuthService.prototype.getUserId = function() {
      return $window.sessionStorage.userId;
    };

    AuthService.prototype.authTokenExpired = function() {
      var tokenExpires = $window.sessionStorage.tokenExpires;
      return tokenExpires <= Date.now();
    };

    AuthService.prototype.isLoggedIn = function() {
      var _this = this;

      return (_this.getToken() && _this.getToken().length) && !_this.authTokenExpired() && (_this.getUserId() && _this.getUserId().length);
    };

    AuthService.prototype.hasProjectIdClaim = function(projectId) {
      var _this = this;

      var claims = $rootScope.currentUserClaims;

      if (!claims) return false;

      var projectIds = claims.projectIds;

      return _.contains(projectIds, projectId);
    };

    AuthService.prototype.getUser = function() {

      var _this = this;

      userService.getUserById({
        userId: _this.getUserId()
      }).then(function success(response) {
        $rootScope.currentUser = response;
      }, function error(response) {
        $rootScope.logger.error('Error getting user');
        _this.logout();
      });
    };

    AuthService.prototype.getUserClaims = function() {

      var _this = this;

      userService.getUserClaims({
        userId: _this.getUserId()
      }).then(function success(response) {
        $rootScope.currentUserClaims = response;
      }, function error(response) {
        $rootScope.logger.error('Error getting user claims');
        _this.logout();
      });
    };

    return new AuthService();
  }
]);
