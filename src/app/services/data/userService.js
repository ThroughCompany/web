angular.module('throughCompanyApp').factory('userService', [
  '$resource',
  '$http',
  '$q',
  'appSettings',
  function($resource, $http, $q, appSettings) {

    var User = $resource(appSettings.baseUrl + '/users', null, {
      create: {
        method: 'POST',
        url: appSettings.baseUrl + '/users',
      },
      getUserById: {
        method: 'GET',
        url: appSettings.baseUrl + '/users/:userId'
      },
      updateUserById: {
        method: 'PATCH',
        url: appSettings.baseUrl + '/users/:userId',
        params: {
          userId: "@userId"
        }
      },
      getUserClaims: {
        method: 'GET',
        url: appSettings.baseUrl + '/users/:userId/claims'
      },
      //user projects
      getUserProjects: {
        method: 'GET',
        url: appSettings.baseUrl + '/users/:userId/projects',
        isArray: true
      },
      createAssetTag: {
        method: 'POST',
        url: appSettings.baseUrl + '/users/:userId/assettags'
      }
    });

    var UserService = function() {};

    UserService.prototype.create = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.email) throw new Error('email is required');
      if (!options.password) throw new Error('password is required');

      var self = this;

      return User.create(options).$promise;
    };

    UserService.prototype.getUserById = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.userId) throw new Error('userId is required');

      var self = this;

      return User.getUserById(options).$promise;
    };

    UserService.prototype.updateUserById = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.userId) throw new Error('userId is required');

      var self = this;

      return User.updateUserById(options).$promise;
    };

    UserService.prototype.getUserProjects = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.userId) throw new Error('userId is required');

      var self = this;

      return User.getUserProjects(options).$promise;
    };

    UserService.prototype.getUserClaims = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.userId) throw new Error('userId is required');

      var self = this;

      return User.getUserClaims(options).$promise;
    };

    UserService.prototype.uploadImage = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.userId) throw new Error('userId is required');
      if (!options.image) throw new Error('image is required');
      if (!options.imageType) throw new Error('imageType is required');

      var deferred = $q.defer();

      if (!_.contains([
          'image/jpeg',
          'image/png'
        ], options.image.type)) {
        deferred.reject('Invalid File Type');
        return deferred.promise;;
      }
      if (options.image.size > 2000000) {
        deferred.reject('Image Size Cannot Exceed 2mb');
        return deferred.promise;;
      }

      var self = this;

      var formData = new FormData();
      formData.append('image', options.image);

      var url = appSettings.baseUrl + '/users/' + options.userId + '/images?imageType=' + options.imageType;

      $http.post(url, formData, {
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      }).success(function() {
        deferred.resolve.apply(this, arguments);
      }).error(function() {
        deferred.reject.apply(this, arguments);
      });

      return deferred.promise;
    };

    UserService.prototype.createAssetTag = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.userId) throw new Error('options.userId is required');

      var self = this;
      var userId = options.userId;

      delete options.userId;

      return User.createAssetTag({
        userId: userId
      }, options).$promise;
    };

    return new UserService();
  }
]);
