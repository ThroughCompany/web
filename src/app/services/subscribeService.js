angular.module('throughCompanyApp').factory('subscribeService', [
  '$http',
  'appSettings',
  function($http, appSettings) {

    function SubscribeService() {}

    SubscribeService.prototype.subscribeToMassChallenge = function subscribeToMassChallenge(options) {
      if (!options) throw new Error('options is required');
      if (!options.email) throw new Error('email is required');

      options.list = 'massChallenge';

      return $http.post(appSettings.baseUrl + '/subscribe', options);
    };

    SubscribeService.prototype.subscribeToProjectNeed = function subscribeToProjectNeed(options) {
      if (!options) throw new Error('options is required');
      if (!options.email) throw new Error('email is required');
      if (!options.need) throw new Error('need is required');

      options.list = 'projectNeed';

      return $http.post(appSettings.baseUrl + '/subscribe', options);
    };

    return new SubscribeService();
  }
]);
