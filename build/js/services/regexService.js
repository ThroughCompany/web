(function() {
    'use strict';

    angular.module('system').factory('regexService', [

        function() {
            return {
                email: new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/),
                date: new RegExp(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/)
            };
        }
    ]);
}());
