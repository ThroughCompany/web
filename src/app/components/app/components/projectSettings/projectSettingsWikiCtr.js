angular.module('throughCompanyApp').controller('projectSettingsWikiCtrl', [
  '$scope',
  '$rootScope',
  'userService',
  'alertService',
  function($scope, $rootScope, userService, alertService) {
    $rootScope.setMetaTitle($scope.project.name + ' Wiki');

    
  }
]);
