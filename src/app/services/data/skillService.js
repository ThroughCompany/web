angular.module('throughCompanyApp').factory('skillService', [
  '$resource',
  '$http',
  '$q',
  'appSettings',
  function($resource, $http, $q, appSettings) {

    var Skill = $resource(appSettings.baseUrl + '/skills', null, {
      getAll: {
        method: 'GET',
        url: appSettings.baseUrl + '/skills',
        isArray: true
      }
    });

    var SkillService = function() {};

    SkillService.prototype.getAll = function(options) {
      if (!options) throw new Error('options is required');

      var self = this;

      return Skill.getAll(options).$promise;
    };

    return new SkillService();
  }
]);
