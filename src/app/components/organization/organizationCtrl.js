angular.module('throughCompanyApp').controller('organizationCtrl', [
  '$scope',
  '$state',
  '$rootScope',
  'organization',
  function($scope, $state, $rootScope, organization) {
    $scope.setMetaTitle(organization.name);
    $scope.setMetaDescription(organization.name);

    $scope.organization = organization;
    //$scope.loaded = false;
    $scope.loaded = true;

    // projectService.getProjectUsers({
    //   projectId: $scope.project._id
    // }).then(function success(response) {
    //   $scope.projectUsers = response;
    // });

    // $scope.getProjectUserName = function(projectUser) {
    //   if (projectUser.firstName && projectUser.lastName) return projectUser.firstName + ' ' + projectUser.lastName;
    //   return projectUser.email;
    // };
  }
]);
