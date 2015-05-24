angular.module('throughCompanyApp').controller('userAddNeedCtrl', [
  '$scope',
  '$modalInstance',
  'user',
  function($scope, $modalInstance, user) {
    $scope.user = user;

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.close = function() {
      $modalInstance.close();
    };
  }
]);
