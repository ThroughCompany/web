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
      },
      createUserProject: {
        method: 'POST',
        url: appSettings.baseUrl + '/users/:userId/projects'
      },
      updateUserProjectById: {
        method: 'PATCH',
        url: appSettings.baseUrl + '/users/:userId/projects/:projectId',
        params: {
          companyId: '@projectId'
        }
      },
      getUserProjectUsers: {
        method: 'GET',
        url: appSettings.baseUrl + '/users/:userId/projects/:projectId/users',
        isArray: true,
        params: {
          companyId: '@projectId'
        }
      },
      addUserProjectUser: {
        method: 'POST',
        url: appSettings.baseUrl + '/users/:userId/projects/:projectId/users',
        params: {
          companyId: '@projectId'
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
      if (!options.updates) throw new Error('updates is required');

      var self = this;

      updates.userId = options.userId;

      return User.updateUserById(updates).$promise;
    };

    UserService.prototype.getUserProjectById = function(id, companyId) {
      if (!id) throw new Error('id is required');
      if (!companyId) throw new Error('companyId is required');

      var self = this;

      return User.getUserCompanyById({
        userId: id,
        companyId: companyId
      }).$promise;
    };

    UserService.prototype.createUserCompany = function(id, name, companyType, stateOfIncorporation, authorizedSharesCommonStock, parValueCommonStock, preferredStock) {
      if (!id) throw new Error('id is required');
      if (!name) throw new Error('name is required');
      if (!companyType) throw new Error('companyType is required');
      if (!stateOfIncorporation) throw new Error('stateOfIncorporation is required');
      if (!authorizedSharesCommonStock) throw new Error('authorizedSharesCommonStock is required');
      if (!parValueCommonStock) throw new Error('parValueCommonStock is required');
      if (!preferredStock) throw new Error('preferredStock is required');

      var self = this;

      return User.createUserCompany({
        userId: id,
        name: name,
        type: companyType,
        stateOfIncorporation: stateOfIncorporation,
        authorizedSharesCommonStock: authorizedSharesCommonStock,
        parValueCommonStock: parValueCommonStock,
        preferredStock: preferredStock
      }).$promise;
    };

    UserService.prototype.updateUserCompanyById = function(id, companyId, updates) {
      if (!id) throw new Error('id is required');
      if (!companyId) throw new Error('companyId is required');
      if (!updates) throw new Error('updates is required');

      var self = this;

      updates.userId = id;
      updates.companyId = companyId;

      return User.updateUserCompanyById(updates).$promise;
    };

    UserService.prototype.getUserCompanies = function(id) {
      if (!id) throw new Error('id is required');

      var self = this;

      return User.getUserCompanies({
        userId: id
      }).$promise;
    };

    UserService.prototype.getUserClaims = function(id) {
      if (!id) throw new Error('id is required');

      var self = this;

      return User.getUserClaims({
        userId: id
      }).$promise;
    };

    UserService.prototype.getUserCompanyUsers = function(id, companyId) {
      if (!id) throw new Error('id is required');
      if (!companyId) throw new Error('companyId is required');

      var self = this;

      return User.getUserCompanyUsers({
        userId: id,
        companyId: companyId
      }).$promise;
    };

    UserService.prototype.addUserCompanyUser = function(id, companyId, email, emailConfirmation) {
      if (!id) throw new Error('id is required');
      if (!companyId) throw new Error('companyId is required');
      if (!email) throw new Error('email is required');
      if (!emailConfirmation) throw new Error('emailConfirmation is required');

      var self = this;

      return User.addUserCompanyUser({
        userId: id,
        companyId: companyId,
        email: email,
        emailConfirmation: emailConfirmation
      }).$promise;
    };

    return new UserService();
  }
]);
