angular.module('throughCompanyApp').factory('projectService', [
  '$resource',
  'appSettings',
  function($resource, appSettings) {

    var Project = $resource(appSettings.baseUrl + '/projects', null, {
      create: {
        method: 'POST',
        url: appSettings.baseUrl + '/projects'
      },
      getProjects: {
        method: 'GET',
        url: appSettings.baseUrl + '/projects',
        isArray: true
      },
      getProjectById: {
        method: 'GET',
        url: appSettings.baseUrl + '/projects/:projectId'
      }
    });

    var ProjectService = function() {};

    ProjectService.prototype.create = function(options) {
      if (!options) throw new Error('options is required');

      var self = this;

      return Project.create(options).$promise;
    };

    ProjectService.prototype.getProjects = function(options) {
      if (!options) throw new Error('options is required');

      var self = this;

      return Project.getProjects(options).$promise;
    };

    ProjectService.prototype.getProjectById = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.projectId) throw new Error('projectId is required');

      var self = this;

      return Project.getProjectById(options).$promise;
    };

    return new ProjectService();
  }
]);
