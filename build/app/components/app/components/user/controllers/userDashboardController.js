  angular.module('throughCompanyApp').controller('userDashboardController', [
    '$scope',
    'userCompanies',
    function($scope, userCompanies) {
      $scope.companies = userCompanies;
    }
  ]);
