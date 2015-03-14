angular.module('throughCompanyApp').controller('projectSettingsWikiCtrl', [
  '$scope',
  '$rootScope',
  'userService',
  'alertService',
  function($scope, $rootScope, userService, alertService) {

    $scope.projectPromise.then(function(response) {
      $scope.form = {
        wiki: $scope.project.wiki
      };
    });

    $scope.updateProject = function() {
      alertService.success('save');
    };
  }
]);
