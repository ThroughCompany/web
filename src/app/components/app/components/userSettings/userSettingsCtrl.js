angular.module('throughCompanyApp').controller('userSettingsCtrl', [
  '$scope',
  '$state',
  function($scope, $state) {
    $state.go('system.app.userSettings.profile');
  }
]);
