(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('topics', topics);

    topics.$inject = ['$resource', 'API_URL', '$rootScope'];

    /* @ngInject */
    function topics($resource, API_URL, $rootScope) {

        return function(){
            return $resource(API_URL + '/topics/', {id: '@id'}, {
                query: {
                    isArray: false,
                    headers: {
                        'Authorization': $rootScope.user.token? 'Token ' + ($rootScope.user.token) : null
                    }
                },

                subscribe: {
                    isArray: false,
                    method: 'GET',
                    url: API_URL + '/topics/subscribe/:id/',
                    headers: {
                        'Authorization': $rootScope.user.token? 'Token ' + ($rootScope.user.token) : null
                    }
                }
            });
        };

    }

})();

