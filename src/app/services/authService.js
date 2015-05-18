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
      var deferred = $q.defer();

      $http.post(appSettings.baseUrl + '/auth/credentials', {
        email: email,
        password: password
      }).then(function success(response) {
        if (!response || !response.data) return $q.reject(response);

        $window.localStorage.tokenExpires = new Date(response.data.expires);
        $window.localStorage.token = response.data.token;
        $window.localStorage.userId = response.data.user._id;

        return deferred.resolve(response.data);
      }, function error(response) {
        return deferred.reject(response.data);
      });

      return deferred.promise;
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

        $window.localStorage.tokenExpires = new Date(response.data.expires);
        $window.localStorage.token = response.data.token;
        $window.localStorage.userId = response.data.user._id;
        $window.localStorage.fbToken = fbToken;

        return response.data;
      });
    };

    AuthService.prototype.logout = function(noRedirect) {

      if ($window.localStorage.fbToken) FB.logout(function() {});

      delete $window.localStorage.token;
      delete $window.localStorage.userId;
      delete $window.localStorage.fbToken;
      $rootScope.currentUser = null
      $rootScope.currentUserClaims = null;

      if (!noRedirect) $state.transitionTo('app.home');
    };

    AuthService.prototype.getToken = function() {
      return $window.localStorage.token;
    };

    AuthService.prototype.getUserId = function() {
      return $window.localStorage.userId;
    };

    AuthService.prototype.authTokenExpired = function() {
      var tokenExpires = $window.localStorage.tokenExpires;
      return tokenExpires <= Date.now();
    };

    AuthService.prototype.isLoggedIn = function() {
      var _this = this;

      return (_this.getToken() && _this.getToken().length) && !_this.authTokenExpired() && (_this.getUserId() && _this.getUserId().length);
    };

    AuthService.prototype.hasCurrentUserIdClaim = function(userId) {
      var _this = this;

      var claims = $rootScope.currentUserClaims;

      if (!claims) return false;

      return claims.userId === userId;
    };

    AuthService.prototype.hasProjectIdClaim = function(projectId) {
      var _this = this;

      var claims = $rootScope.currentUserClaims;

      if (!claims) return false;

      var projectIds = claims.projectIds;

      return _.contains(projectIds, projectId);
    };

    AuthService.prototype.hasOrganizationIdClaim = function(organizationId) {
      var _this = this;

      var claims = $rootScope.currentUserClaims;

      if (!claims) return false;

      var organizationIds = claims.organizationIds;

      return _.contains(organizationIds, organizationId);
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
