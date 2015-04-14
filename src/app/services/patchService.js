angular.module('throughCompanyApp').factory('patchService', [
  function() {

    function PatchService() {}

    PatchService.prototype.generatePatches = function generatePatches(original, updates) {
      if (!original || !_.isObject(original)) throw new Error('original is required');
      if (!updates || !_.isObject(updates)) throw new Error('updates is required');

      removeAngularKeys(original);
      removeAngularKeys(updates);

      return diff(original, updates);

      // var patches = [];

      // for (var property in updates) {
      //   var updateValue = updates[property];

      //   if (_.isArray(updateValue)) {
      //     console.log('UPDATE PROPERTY : ' + property + ' is an array');

      //     //TODO: implement for arrays
      //     if (!original.hasOwnProperty(property)) {
      //       patches.push({
      //         op: 'add',
      //         path: '/' + property,
      //         value: updateValue
      //       });
      //     } else {
      //       _.each(updateValue, function(val) {
      //         if (arrayContains(original[property], val)) {
      //           var index = arrayIndexOfVal(original[property], val);

      //           patches.push({
      //             op: 'replace',
      //             path: '/' + property + '/' + index,
      //             value: updateValue
      //           });
      //         } else {
      //           patches.push({
      //             op: 'add',
      //             // path: '/' + property + '/' + original[property].length,
      //             path: '/' + property + '/-', //add it to the end of the array
      //             value: updateValue
      //           });
      //         }
      //       });
      //     }
      //   } else {
      //     console.log('UPDATE PROPERTY : ' + property + ' is NOT an array');

      //     if (!original.hasOwnProperty(property)) {
      //       patches.push({
      //         op: 'add',
      //         path: '/' + property,
      //         value: updateValue
      //       });
      //     } else {
      //       if (updateValue !== original[property]) {
      //         patches.push({
      //           op: 'replace',
      //           path: '/' + property,
      //           value: updateValue
      //         });
      //       }
      //     }
      //   }
      // }

      // console.log(patches);

      // return patches;
    };

    // function objectsAreEqual(obj1, obj2) {
    //   var areEqual = true;

    //   for (var property in obj1) {
    //     if (!obj2.hasOwnProperty(property)) {
    //       areEqual = false;
    //       break;
    //     }
    //   }

    //   return areEqual;
    // }

    // function arrayContains(arry, obj) {
    //   var contains = false;

    //   for (var i = 0; i < arry.length; i++) {
    //     var currentProp = arry[i];

    //     if (objectsAreEqual(currentProp, obj)) {
    //       contains = true;
    //       break;
    //     }
    //   }

    //   return contains;
    // }

    // function arrayIndexOfVal(arry, obj) {
    //   var index = false;

    //   for (var i = 0; i < arry.length; i++) {
    //     var currentProp = arry[i];

    //     if (objectsAreEqual(currentProp, obj)) {
    //       index = i;
    //       break;
    //     }
    //   }

    //   return index;
    // }

    function removeAngularKeys(obj) {
      if (!_.isObject(obj)) return;

      for (var key in obj) {
        if (key.indexOf('$') === 0) {
          delete obj[key];
        } else if (_.isArray(obj[key])) {
          removeAngularKeysFromArray(obj[key]);
        }
      }
    }

    function removeAngularKeysFromArray(arry) {
      for (var i = 0; i < arry.length; i++) {
        removeAngularKeys(arry[i]);
      }
    }

    return new PatchService();
  }
]);
