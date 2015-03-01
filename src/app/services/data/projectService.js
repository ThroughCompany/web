angular.module('throughCompanyApp').factory('projectService', [
  '$resource',
  'appSettings',
  function($resource, appSettings) {

    var Project = $resource(appSettings.baseUrl + '/projects', null, {
      create: {
        method: 'POST',
        url: appSettings.baseUrl + '/projects'
      }
    });

    var ProjectService = function() {};

    ProjectService.prototype.create = function(options) {
      if (!options) throw new Error('options is required');

      var self = this;

      return Project.create(options).$promise;
    };

    return new ProjectService();
  }
]);
