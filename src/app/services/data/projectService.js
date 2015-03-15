angular.module('throughCompanyApp').factory('projectService', [
  '$resource',
  'appSettings',
  '$localStorage',
  '$http',
  '$q',
  'baseService',
  function($resource, appSettings, $localStorage, $http, $q, baseService) {

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

    ProjectService.prototype.uploadImage = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.projectId) throw new Error('projectId is required');
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

      var url = appSettings.baseUrl + '/projects/' + options.projectId + '/images?imageType=' + options.imageType;

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
