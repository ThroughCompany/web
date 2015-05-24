angular.module('throughCompanyApp').factory('applicationService', [
  '$resource',
  '$http',
  '$q',
  'appSettings',
  function($resource, $http, $q, appSettings) {

    var Application = $resource(appSettings.baseUrl + '/applications', null, {
      create: {
        method: 'POST',
        url: appSettings.baseUrl + '/applications',
      },
      getApplicationById: {
        method: 'GET',
        url: appSettings.baseUrl + '/applications/:applicationId'
      },
    });

    var ApplicationService = function() {};

    ApplicationService.prototype.create = function(options) {
      if (!options) throw new Error('options is required');

      var self = this;

      return Application.create(options).$promise;
    };

    ApplicationService.prototype.getApplicationById = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.applicationId) throw new Error('userId is required');

    var self = this;

      return Application.getApplicationById(options).$promise;
    };

    return new ApplicationService();
  }
]);
