angular.module('throughCompanyApp').factory('authService', [
  '$rootScope',
  '$http',
  '$q',
  'appSettings',
  '$state',
  'loggerService',
  'userService',
  'localStorageService',
  'authUtilService',
  function($rootScope, $http, $q, appSettings, $state, loggerService, userService, localStorageService, authUtilService) {

    function AuthService() {}

    AuthService.prototype.login = function(email, password) {
      var deferred = $q.defer();

      $http.post(appSettings.baseUrl + '/auth/credentials', {
        email: email,
        password: password
      }).then(function success(response) {
        if (!response || !response.data) return $q.reject(response);

        _saveAuthInfo(response.data);

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

        _saveAuthInfo(response.data, fbToken);

        return response.data;
      });
    };

    AuthService.prototype.logout = function(noRedirect) {
      var fbToken = localStorageService.get('fbToken');

      if (fbToken) FB.logout(function() {});

      _removeAuthInfo();

      $rootScope.currentUser = null
      $rootScope.currentUserClaims = null;

      if (!noRedirect) $state.transitionTo('app.home');
    };

    AuthService.prototype.isLoggedIn = function() {
      var _this = this;

      return (authUtilService.getToken() && authUtilService.getToken().length) && !authUtilService.authTokenExpired() && (authUtilService.getUserId() && authUtilService.getUserId().length);
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
        userId: authUtilService.getUserId()
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
        userId: authUtilService.getUserId()
      }).then(function success(response) {
        $rootScope.currentUserClaims = response;
      }, function error(response) {
        $rootScope.logger.error('Error getting user claims');
        _this.logout();
      });
    };

    function _saveAuthInfo(auth, fbToken) {
      localStorageService.set('tokenExpires', new Date(auth.expires));
      localStorageService.set('token', auth.token);
      localStorageService.set('userId', auth.user._id);
      if (fbToken) {
        localStorageService.set('fbToken', fbToken);
      }
    }

    function _removeAuthInfo(auth) {
      localStorageService.remove('tokenExpires');
      localStorageService.remove('token');
      localStorageService.remove('userId');
      localStorageService.remove('fbToken');
    }

    return new AuthService();
  }
]);
