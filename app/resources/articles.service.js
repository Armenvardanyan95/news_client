(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('articles', articles);

    articles.$inject = ['$resource', 'API_URL', '$rootScope'];

    /* @ngInject */
    function articles($resource, API_URL, $rootScope) {

        return function() {
            return $resource(API_URL + '/articles/', {id: '@id'}, {
                query: {
                    isArray: false,
                    headers: {
                        'Authorization': $rootScope.user.token? 'Token ' + ($rootScope.user.token) : null
                    }
                },
                store: {
                    url: API_URL + '/articles/save/:id/',
                    method: 'GET',
                    isArray: false,
                    headers: {
                        'Authorization': $rootScope.user.token? 'Token ' + ($rootScope.user.token) : null
                    }
                },
                remove: {
                    url: API_URL + '/articles/remove/:id/',
                    method: 'GET',
                    isArray: false,
                    headers: {
                        'Authorization': $rootScope.user.token? 'Token ' + ($rootScope.user.token) : null
                    }
                },
                saved_articles: {
                    url: API_URL + '/articles/saved/',
                    isArray: false,
                    headers: {
                        'Authorization': $rootScope.user.token? 'Token ' + ($rootScope.user.token) : null
                    }
                },
                history: {
                    url: API_URL + '/articles/custom/history/',
                    method: 'GET',
                    isArray: false,
                    headers: {
                        'Authorization': $rootScope.user.token? 'Token ' + ($rootScope.user.token) : null
                    }
                }

            });
        };

    }

})();

