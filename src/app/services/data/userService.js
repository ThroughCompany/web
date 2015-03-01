angular.module('throughCompanyApp').factory('userService', [
  '$resource',
  'appSettings',
  function($resource, appSettings) {

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
      getUserProjectById: {
        method: 'GET',
        url: appSettings.baseUrl + '/users/:userId/projects/:projectId',
        params: {
          projectId: '@projectId'
        }
      }
    });

    var UserService = function() {};

    UserService.prototype.create = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.email) throw new Error('email is required');
      if (!options.password) throw new Error('password is required');

      var self = this;

      return User.create({
        email: options.email,
        password: options.password
      }).$promise;
    };

    UserService.prototype.getUserById = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.userId) throw new Error('userId is required');

      var self = this;

      return User.getUserById({
        userId: options.userId
      }).$promise;
    };

    UserService.prototype.updateUserById = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.userId) throw new Error('userId is required');

      var self = this;

      return User.updateUserById(options).$promise;
    };

    UserService.prototype.getUserProjectById = function(id, companyId) {
      if (!id) throw new Error('userId is required');
      if (!companyId) throw new Error('companyId is required');

      var self = this;

      return User.getUserCompanyById({
        userId: userId,
        companyId: companyId
      }).$promise;
    };

    UserService.prototype.getUserProjects = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.userId) throw new Error('userId is required');

      var self = this;

      return User.getUserProjects({
        userId: options.userId
      }).$promise;
    };

    UserService.prototype.getUserClaims = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.userId) throw new Error('userId is required');

      var self = this;

      return User.getUserClaims({
        userId: options.userId
      }).$promise;
    };

    return new UserService();
  }
]);
