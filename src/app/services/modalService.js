angular.module('throughCompanyApp').factory('modalService', [
  '$modal',
  function($modal) {

    function ModalService() {}

    ModalService.prototype.confirm = function confirm(confirmMessage, confirmButtonMessage) {
      var modalInstance = $modal.open({
        template: '<div class="modal-body" ng-bind-html="message"></div>' +
          '<div class="modal-footer">' +
          '<button class="btn btn-default" ng-click="cancel()">Cancel</button><button class="btn btn-primary" ng-click="ok()">' + (confirmButtonMessage || 'Confirm') + '</button>' +
          '</div>',
        controller: [
          '$scope',
          '$modalInstance',
          function($scope, $modalInstance) {
            $scope.message = confirmMessage;

            $scope.ok = function() {
              $modalInstance.close();
            };

            $scope.cancel = function() {
              $modalInstance.dismiss('cancel');
            };
          }
        ]
      });

      return modalInstance.result; //return the promise
    };

    return new ModalService();
  }
]);
