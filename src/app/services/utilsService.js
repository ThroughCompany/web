angular.module('throughCompanyApp').factory('utilsService', [
  function() {

    function UtilsService() {}

    UtilsService.prototype.getServerErrorMessage = function getServerErrorMessage(response) {
      if (!response || !response.data) return null;
      if (!response.data.errors || !response.data.errors.length) return null;

      return response.data.errors[0].message;
    };

    return new UtilsService();
  }
]);
