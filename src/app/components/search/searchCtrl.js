angular.module('throughCompanyApp').controller('searchCtrl', [
  '$scope',
  '$stateParams',
  'loggerService',
  'needService',
  function($scope, $stateParams, loggerService, needService) {

    if ($stateParams.skill) {
      $scope.skill = $stateParams.skill;
    }

    _getNeeds();

    function _getNeeds() {
      needService.getAll({
        skillName: $scope.skill,
        fields: 'user(), project(), organization()'
      }).then(function success(response) {
        $scope.needs = response;
      });
    }
  }
]);
