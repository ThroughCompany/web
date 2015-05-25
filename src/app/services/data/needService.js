angular.module('throughCompanyApp').factory('needService', [
  '$resource',
  '$http',
  '$q',
  'appSettings',
  function($resource, $http, $q, appSettings) {

    var Need = $resource(appSettings.baseUrl + '/needs', null, {
      create: {
        method: 'POST',
        url: appSettings.baseUrl + '/needs',
        isArray: false
      },
      getById: {
        method: 'GET',
        url: appSettings.baseUrl + '/needs/:needId',
        isArray: false
      },
      getAll: {
        method: 'GET',
        url: appSettings.baseUrl + '/needs',
        isArray: true
      }
    });

    var NeedService = function() {};

    NeedService.prototype.create = function(options) {
      if (!options) throw new Error('options is required');

      var self = this;

      return Need.create(options).$promise;
    };

    NeedService.prototype.getById = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.needId) throw new Error('options.needId is required');

      var self = this;

      return Need.getById(options).$promise;
    };

    NeedService.prototype.getAll = function(options) {
      if (!options) throw new Error('options is required');

      var self = this;

      return Need.getAll(options).$promise;
    };

    return new NeedService();
  }
]);
