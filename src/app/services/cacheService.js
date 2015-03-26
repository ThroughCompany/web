angular.module('throughCompanyApp').factory('Cache', [
  function() {

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

    return Cache;
  }
]);
