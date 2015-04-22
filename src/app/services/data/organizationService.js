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
        url: appSettings.baseUrl + '/projects'
      }
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

    return new OrganizationService();
  }
]);
