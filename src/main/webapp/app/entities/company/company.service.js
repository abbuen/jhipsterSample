(function() {
    'use strict';
    angular
        .module('testApp')
        .factory('Company', Company);

    Company.$inject = ['$resource', 'DateUtils'];

    function Company ($resource, DateUtils) {
        var resourceUrl =  'api/companies/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.dateCreated = DateUtils.convertLocalDateFromServer(data.dateCreated);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.dateCreated = DateUtils.convertLocalDateToServer(copy.dateCreated);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.dateCreated = DateUtils.convertLocalDateToServer(copy.dateCreated);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
