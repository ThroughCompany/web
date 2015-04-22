angular.module('throughCompanyApp').factory('organizationService', [
  '$resource',
  'appSettings',
  '$http',
  '$q',
  'baseService',
  function($resource, appSettings, $http, $q, baseService) {

    var Organization = $resource(appSettings.baseUrl + '/organizations', null, {
      create: {
        method: 'POST',
        url: appSettings.baseUrl + '/organizations'
      },
      getOrganizationById: {
        method: 'GET',
        url: appSettings.baseUrl + '/organizations/:organizationId'
      },
    });

    function OrganizationService() {
      var _this = this;

      baseService.prototype.constructor.call(_this, 'Organization');
    }
    OrganizationService.prototype = Object.create(baseService);

    OrganizationService.prototype.create = function(options) {
      if (!options) throw new Error('options is required');

      var self = this;

      return Organization.create(options).$promise;
    };

    OrganizationService.prototype.getOrganizationById = function(options) {
      if (!options) throw new Error('options is required');
      if (!options.organizationId) throw new Error('organizationId is required');

      var _this = this;
      var deferred = $q.defer();

      var organization = _this.cache.get(options.organizationId);

      if (organization) {
        deferred.resolve(organization);
      } else {
        Organization.getOrganizationById(options).$promise.then(function success(response) {
          _this.cache.set(options.organizationId, response);

          deferred.resolve(response);
        }, function error(response) {
          deferred.reject(response);
        });
      }

      return deferred.promise;
    };

    return new OrganizationService();
  }
]);
