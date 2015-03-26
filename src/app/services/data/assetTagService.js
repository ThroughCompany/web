angular.module('throughCompanyApp').factory('assetTagService', [
  '$resource',
  '$http',
  '$q',
  'appSettings',
  function($resource, $http, $q, appSettings) {

    var AssetTag = $resource(appSettings.baseUrl + '/assettags', null, {
      getAll: {
        method: 'GET',
        url: appSettings.baseUrl + '/assettags',
        isArray: true
      }
    });

    var AssetTagService = function() {};

    AssetTagService.prototype.getAll = function(options) {
      if (!options) throw new Error('options is required');

      var self = this;

      return AssetTag.getAll(options).$promise;
    };

    return new AssetTagService();
  }
]);
