angular.module('throughCompanyApp').factory('patchService', [
  function() {

    function PatchService() {}

    PatchService.prototype.generatePatches = function generatePatches(original, updates) {
      if (!original || !_.isObject(original)) throw new Error('original is required');
      if (!updates || !_.isObject(updates)) throw new Error('updates is required');

      var patches = [];

      for (var property in updates) {
        var updateValue = updates[property];

        if (_.isArray(updateValue)) {
          console.log('UPDATE PROPERTY : ' + property + ' is an array');

          //TODO: implement for arrays
          // if (!original.hasOwnProperty(property)) {

          // }
        } else {
          console.log('UPDATE PROPERTY : ' + property + ' is NOT an array');

          if (!original.hasOwnProperty(property)) {
            patches.push({
              op: 'add',
              path: '/' + property,
              value: updateValue
            });
          } else {
            if (updateValue !== original[property]) {
              patches.push({
                op: 'replace',
                path: '/' + property,
                value: updateValue
              });
            }
          }
        }
      }

      console.log(patches);

      return patches;
    };

    return new PatchService();
  }
]);
