angular.module('throughCompanyApp').factory('scrollbar', [
  '$document',
  function($document) {

    function Scrollbar() {
      var _this = this;
    }

    Scrollbar.prototype.getCurrentHeight = function() {
      var _this = this;

      return $document.scrollTop();
    };

    return new Scrollbar();
  }
]);
