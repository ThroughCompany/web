angular.module('throughCompanyApp').factory('projectService', [
  '$resource',
  'appSettings',
  function($resource, appSettings) {

    var Project = $resource(appSettings.baseUrl + '/projects', null, {
      // create: {
      //   method: 'GET',
      //   url: appSettings.baseUrl + '/projects',
      // }
    });

    var ProjectService = function() {};

    // ProjectService.prototype.create = function(options) {
    //   if (!options) throw new Error('options is required');
    //   if (!options.email) throw new Error('email is required');
    //   if (!options.password) throw new Error('password is required');

    //   var self = this;

    //   return User.create({
    //     email: options.email,
    //     password: options.password
    //   }).$promise;
    // };

    return new ProjectService();
  }
]);
