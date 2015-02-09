(function() {
  'use strict';

  angular.module('system.app.user').controller('userDashboardController', [
    '$scope',
    'userCompanies',
    function($scope, userCompanies) {
      $scope.companies = userCompanies;
    }
  ]);

}());