angular.module('throughCompanyApp').controller('projectSettingsWikiCtrl', [
  '$scope',
  '$rootScope',
  'userService',
  'alertService',
  function($scope, $rootScope, userService, alertService) {

    $scope.form = {
      wiki: $scope.project.wiki
    };
  }
]);
