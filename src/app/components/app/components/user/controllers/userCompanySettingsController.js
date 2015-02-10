angular.module('throughCompanyApp').controller('userCompanySettingsController', [
  '$scope',
  'userEntityService',
  function($scope, userEntityService) {
    $scope.form = {
      dateOfIncorporationUnformatted: $scope.company.dateOfIncorporation
    };

    $scope.$watch('form.dateOfIncorporationUnformatted', function(newValue) {
      if (newValue) {
        $scope.form.dateOfIncorporation = moment(newValue).format('MM/DD/YYYY');
      }
    });

    $scope.isSubmitting = null;
    $scope.result = null;
    $scope.btnOptions = {
      buttonSubmittingIcon: 'fa fa-refresh',
      buttonSuccessIcon: 'fa fa-check',
      buttonDefaultText: 'Save'
    };

    //create new company
    $scope.updateUserCompany = function(updateUserCompanyForm) {

      $scope.submitted = true;

      if (!updateUserCompanyForm.$valid) return;

      // userEntityService.createUserCompany(
      //   $scope.user._id, 
      //   $scope.form.name, 
      //   $scope.form.selectedCompanyType,
      //   $scope.form.dateOfIncorporation,
      //   $scope.form.selectedState.name).then(function success(response) {
      //     $state.transitionTo(routes.userCompanyDashboard, {
      //         companyId: response._id
      //     });
      // });
    };
  }
]);
