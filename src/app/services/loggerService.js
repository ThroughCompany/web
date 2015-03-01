angular.module('throughCompanyApp').factory('loggerService', [
  'appSettings',
  function(appSettings) {

    function Logger() {}

    Logger.prototype.debug = function debug(message) {
      if (appSettings.ENV === 'production') return;
      console.debug(message);
    };

    Logger.prototype.error = function error(message) {
      if (appSettings.ENV === 'production') return;
      console.error(message);
    };

    Logger.prototype.info = function info(message) {
      if (appSettings.ENV === 'production') return;
      console.info(message);
    };

    Logger.prototype.debug = function debug(message) {
      if (appSettings.ENV === 'production') return;
      console.debug(message);
    };

    return new Logger();
  }
]);
