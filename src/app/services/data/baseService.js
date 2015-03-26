angular.module('throughCompanyApp').factory('baseService', [
  '$resource',
  'appSettings',
  '$q',
  'Cache',
  function($resource, appSettings, $q, Cache) {

    function BaseService(collectionName) {
      var _this = this;
      _this.collectionName = collectionName;

      if (!_this.collectionName) throw new Error('collectionName is required');

      _this.cache = new Cache(collectionName);
    }

    return BaseService;
  }
]);
