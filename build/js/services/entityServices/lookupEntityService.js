(function() {
    'use strict';

    angular.module('system').factory('lookupEntityService', [
        '$resource',
        'appSettings',
        function($resource, appSettings) {

            var CompanyType = $resource(appSettings.baseUrl + '/companyTypes');
            var State = $resource(appSettings.baseUrl + '/states', null, {
                query: {
                    isArray: true,
                    transformResponse: function(data, headers) {
                        return angular.fromJson(data).map(function(state) {
                            return {
                                name: state
                            };
                        });
                    }
                }
            });

            var LookupEntityService = function() {};

            LookupEntityService.prototype.getCompanyTypes = function() {
                return CompanyType.query().$promise;
            };

            LookupEntityService.prototype.getStates = function() {
                return State.query().$promise;
            };

            return new LookupEntityService();
        }
    ]);

}());
