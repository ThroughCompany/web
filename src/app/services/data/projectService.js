angular.module('throughCompanyApp').factory('projectService', [
  '$resource',
  'appSettings',
  '$localStorage',
  '$q',
  'baseService',
  function($resource, appSettings, $localStorage, $q, baseService) {

    var Project = $resource(appSettings.baseUrl + '/projects', null, {
      create: {
        method: 'POST',
        url: appSettings.baseUrl + '/projects'
      },
      updateProjectById: {
        method: 'PATCH',
        url: appSettings.baseUrl + '/projects/:projectId',
        params: {
          projectId: "@projectId"
        }
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

    function ProjectService() {
      var _this = this;
      _this.cache = localStorage = [];

      baseService.prototype.constructor.call(_this, 'Projects');
    }
    ProjectService.prototype = Object.create(baseService);

    ProjectService.prototype.create = function(options) {
      if (!options) throw new Error('options is required');

      var self = this;

      return Project.create(options).$promise;
    };

    ProjectService.prototype.updateProjectById = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.projectId) throw new Error('projectId is required');

      var self = this;

      return Project.updateProjectById(options).$promise;
    };

    ProjectService.prototype.getProjects = function(options) {
      if (!options) throw new Error('options is required');

      var self = this;

      return Project.getProjects(options).$promise;
    };

    ProjectService.prototype.getProjectById = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.projectId) throw new Error('projectId is required');

      var _this = this;
      var deferred = $q.defer();

      var project = _this.cache.get(options.projectId);

      if (project) {
        deferred.resolve(project);
      } else {
        Project.getProjectById(options).$promise.then(function success(response) {
          _this.cache.set(options.projectId, response);

          deferred.resolve(response);
        }, function error(response) {
          deferred.reject(response);
        });
      }

      return deferred.promise;
    };

    return new ProjectService();
  }
]);
