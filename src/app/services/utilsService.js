angular.module('throughCompanyApp').factory('utilsService', [
  '$timeout',
  '$document',
  'loggerService',
  function($timeout, $document, loggerService) {

    function UtilsService() {}

    UtilsService.prototype.getServerErrorMessage = function getServerErrorMessage(response) {
      if (!response || !response.data) return null;
      if (!response.data.errors || !response.data.errors.length) return null;

      return response.data.errors[0].message;
    };

    UtilsService.prototype.scrollTo = function(_id, _offset, _speed, _delay) {
      var id = (_id) ? _id : null;
      var offset = (_offset) ? _offset : 30;
      var speed = (_speed) ? _speed : 500;
      var delay = (_delay) ? _delay : 0;

      $timeout(function() {
        // https://github.com/durated/angular-scroll/
        try {
          $document.scrollToElement($('#' + id), offset, 500);
        } catch (err) {
          loggerService.error(err);
        }
      }, delay);
    };

    return new UtilsService();
  }
]);
