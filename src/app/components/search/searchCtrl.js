angular.module('throughCompanyApp').controller('searchCtrl', [
  '$scope',
  '$stateParams',
  'loggerService',
  'needService',
  function($scope, $stateParams, loggerService, needService) {

    if ($stateParams.tags) {
      $scope.skills = $stateParams.tags;
    }

    _getNeeds();

    function _getNeeds() {
      needService.getAll({
        skills: $scope.skills,
        fields: 'user(), project(), organization()'
      }).then(function success(response) {
        $scope.needs = response;
      });
    }
  }
]);
