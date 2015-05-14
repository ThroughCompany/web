angular.module('throughCompanyApp').factory('loggerService', [
  'appSettings',
  function(appSettings) {
    function Logger() {}

    var log = appSettings.ENV === 'production' || appSettings.ENV === 'development';

    Logger.prototype.debug = function debug(message) {
      if (log) {
        Rollbar.debug(message);
        return;
      }
      console.debug(message);
    };

    Logger.prototype.error = function error(message) {
      if (log) {
        Rollbar.error(message);
        return;
      }
      console.error(message);
    };

    Logger.prototype.info = function info(message) {
      if (log) {
        Rollbar.info(message);
        return;
      }
      console.info(message);
    };

    Logger.prototype.warning = function warning(message) {
      if (log) {
        Rollbar.warning(message);
        return;
      }
      console.warn(message);
    };

    return new Logger();
  }
]);
