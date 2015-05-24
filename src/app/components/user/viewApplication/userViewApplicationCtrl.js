angular.module('throughCompanyApp').controller('userViewApplicationCtrl', [
  '$scope',
  '$stateParams',
  'applicationService',
  'loggerService',
  function($scope, $stateParams, applicationService, loggerService) {
    applicationService.getById($stateParams.applicationId).then(function _success(response) {

    }, function _error(response) {
      loggerService.error(response);
    });
  }
]);
