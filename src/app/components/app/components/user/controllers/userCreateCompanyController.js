    angular.module('throughCompanyApp').controller('userCreateCompanyController', [
      '$scope',
      '$state',
      '$timeout',
      'userEntityService',
      'companyTypes',
      'routes',
      function($scope, $state, $timeout, userEntityService, companyTypes, routes) {

        $scope.currentStep = 1;

        $scope.form = {
          dateOfIncorporationUnformatted: null,
          preferredStocks: []
        };

        $scope.$watch('form.dateOfIncorporationUnformatted', function(newValue) {
          if (newValue) {
            $scope.form.dateOfIncorporation = moment(newValue).format('MM/DD/YYYY');
          }
        });

        $scope.companyTypes = companyTypes;

        $scope.form.selectedCompanyType = $scope.companyTypes[0].type;

        $scope.goToStep = function(step, $event) {
          $event.preventDefault();

          if (step === 1) {
            $scope.currentStep = 1;
            return;
          } else if (step === 2) {
            if ($scope.form.selectedState) {
              $scope.currentStep = 2;
              return;
            }

            return;
          } else {
            if ($scope.form.selectedState && $scope.form.name) {
              $scope.currentStep = 3;
              return;
            }
            return;
          }
        };


        $scope.goToStep2 = function(createUserCompanyForm1) {

          $scope.submitted = true;

          if (!createUserCompanyForm1.$valid) return;

          $scope.currentStep = 2;
          $scope.submitted = false;
        };

        $scope.goToStep3 = function(createUserCompanyForm2) {

          $scope.submitted = true;

          if (!createUserCompanyForm2.$valid) return;

          $scope.currentStep = 3;
          $scope.submitted = false;
        };

        $scope.goToStep4 = function(createUserCompanyForm3) {

          $scope.submitted = true;

          if (!createUserCompanyForm3.$valid) return;

          $scope.currentStep = 4;
          $scope.submitted = false;
        };

        $scope.addPreferredStock = function(createUserCompanyForm4) {
          $scope.submitted = true;

          if (!createUserCompanyForm4.$valid) return;

          $scope.form.preferredStocks.push({
            name: $scope.form.preferredStockName,
            amount: $scope.form.preferredStockAmount
          });
          $scope.form.preferredStockName = null;
          $scope.form.preferredStockAmount = null;

          $scope.submitted = false;
        };

        $scope.removePreferredStock = function(stock, $event) {
          $event.preventDefault();

          $scope.form.preferredStocks.splice($scope.form.preferredStocks.indexOf(stock), 1);
        };

        //create new company
        $scope.createUserCompany = function() {
          userEntityService.createUserCompany(
            $scope.user._id,
            $scope.form.name,
            $scope.form.selectedCompanyType,
            $scope.form.selectedState.name,
            $scope.form.commonStock,
            $scope.form.parValue,
            $scope.form.preferredStocks).then(function success(response) {
            $timeout(function() {
              $state.transitionTo(routes.userCompanyDashboard, {
                companyId: response._id
              });
            }, 500);
          });
        };

      }
    ]);
