angular.module('throughCompanyApp').controller('userViewNeedCtrl', [
  '$scope',
  '$modalInstance',
  'user',
  'need',
  function($scope, $modalInstance, user, need) {
    $scope.user = user;
    $scope.need = need;

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.close = function() {
      $modalInstance.close();
    };
  }
]);
