angular.module('throughCompanyApp').controller('userCompanyController', [
  '$scope',
  'company',
  'companyUsers',
  function($scope, company, companyUsers) {
    $scope.company = company;
    $scope.companyUsers = companyUsers;
  }
]);
