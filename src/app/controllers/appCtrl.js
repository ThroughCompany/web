angular.module('throughCompanyApp').controller('appCtrl', [
  '$scope',
  '$rootScope',
  'loggerService',
  'user',
  'userClaims',
  'userService',
  function($scope, $rootScope, loggerService, user, userClaims, userService) {
    loggerService.info('app controller loaded...');

    $rootScope.currentUser = user;
    $rootScope.currentUserClaims = userClaims;
    $rootScope.currentUserProjects = [];
    $rootScope.currentUserOrganizations = [];
    $scope.currentYear = (new Date()).getFullYear();

    $rootScope.currentUserMessages = [];

    $scope.getUserMessages = function() {
      if (!$scope.currentUser) return;

      userService.getUserMessages({
        userId: $rootScope.currentUser._id
      }).then(function _success(response) {
        $rootScope.currentUserMessages = response;
        // $rootScope.currentUserMessages = [{
        //   user: '123123123',
        //   messageBody: 'Hey Tim!',
        //   type: 'Received'
        // }, {
        //   user: '123123123',
        //   messageBody: 'Hey John!',
        //   type: 'Sent'
        // }];
      }, function _error(response) {
        loggerService.error(response);
      });
    };

    $scope.getUserMessages();
  }
]);
