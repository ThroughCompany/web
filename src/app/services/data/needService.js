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
      }
    });

    var NeedService = function() {};

    NeedService.prototype.create = function(options) {
      if (!options) throw new Error('options is required');

      var self = this;

      return Need.create(options).$promise;
    };

    return new NeedService();
  }
]);
