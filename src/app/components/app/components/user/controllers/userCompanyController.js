(function() {
  'use strict';

  angular.module('system.app.user').controller('userCompanyController', [
    '$scope',
    'company',
    'companyUsers',
    function($scope, company, companyUsers) {
      $scope.company = company;
      $scope.companyUsers = companyUsers;
    }
  ]);

}());