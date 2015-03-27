angular.module('throughCompanyApp').controller('projectApplyCtrl', [
  '$scope',
  '$rootScope',
  'userService',
  'alertService',
  'projectService',
  function($scope, $rootScope, userService, alertService, projectService) {
    $rootScope.setMetaTitle('Join ' + $scope.project.name);
    
  }
]);
