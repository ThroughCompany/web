angular.module('throughCompanyApp').factory('subscribeService', [
  '$http',
  'appSettings',
  function($http, appSettings) {

    function SubscribeService() {}

    SubscribeService.prototype.subscribe = function subsribe(options) {
      if (!options) throw new Error('options is required');
      if (!options.email) throw new Error('email is required');

      return $http.post(appSettings.baseUrl + '/subscribe', options);
    };

    return new SubscribeService();
  }
]);
