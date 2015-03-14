angular.module('throughCompanyApp').factory('baseService', [
  '$resource',
  'appSettings',
  '$localStorage',
  '$q',
  function($resource, appSettings, $localStorage, $q) {

    function BaseService(collectionName) {
      var _this = this;
      _this.collectionName = collectionName;

      if (!_this.collectionName) throw new Error('collectionName is required');

      _this.cache = new Cache(collectionName);
    }

    function Cache(collectionName) {
      var _this = this;
      _this.collectionName = collectionName;
    }

    Cache.prototype.get = function(key) {
      var _this = this;

      var collection = JSON.parse(localStorage[_this.collectionName] || '[]') || [];

      return collection[key];
    };

    Cache.prototype.set = function(key, value) {
      var _this = this;

      var collection = JSON.parse(localStorage[_this.collectionName] || '[]') || [];
      collection[key] = value;

      localStorage[_this.collectionName] = JSON.stringify(collection);

      return collection[key];
    };

    return BaseService;
  }
]);
