(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('magazines', magazines);

    magazines.$inject = ['$resource', 'API_URL', '$rootScope'];

    /* @ngInject */
    function magazines($resource, API_URL, $rootScope) {

        return function () {
            return $resource(API_URL + '/magazines/:id/',
                {id: '@id'},
                {
                    query: {
                        isArray: false,
                        headers: {
                            'Authorization': $rootScope.user.token? 'Token ' + ($rootScope.user.token) : null
                        }
                    },
                    get: {
                        isArray: false,
                        headers: {
                            'Authorization': $rootScope.user.token? 'Token ' + ($rootScope.user.token) : null
                        }
                    },
                    subscribe: {
                        url: API_URL + '/magazines/subscribe/:slug/',
                        method: 'GET',
                        isArray: false,
                        headers: {
                            'Authorization': $rootScope.user.token? 'Token ' + ($rootScope.user.token) : null
                        }
                    },
                    unsubscribe: {
                        url: API_URL + '/magazines/unsubscribe/:slug/',
                        method: 'GET',
                        isArray: false,
                        headers: {
                            'Authorization': $rootScope.user.token? 'Token ' + ($rootScope.user.token) : null
                        }
                    },

                });
        };

    }

})();

