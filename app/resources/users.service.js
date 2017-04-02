(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('users', users);

    users.$inject = ['$resource', 'API_URL', '$rootScope', 'handlers'];

    /* @ngInject */
    function users($resource, API_URL, $rootScope, handlers) {

        return $resource(API_URL + '/users/',
            {id: '@id'},
            {
                query: {
                    isArray: false
                },
                save: {
                    method: 'POST',
                    interceptor: {
                        responseError: handlers.errorHandler
                    }
                },
                login: {
                    url: API_URL + '/get-auth-token/',
                    method: 'POST',
                    interceptor: {
                        responseError: handlers.errorHandler
                    }
                },
                headers: {
                    'Authorization': $rootScope.user.token? 'Token ' + ($rootScope.user.token) : null
                }

            });

    }

})();

