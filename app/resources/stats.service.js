(function () {
    'use strict';

    angular
        .module('app.resources')
        .factory('stats', stats);

    stats.$inject = ['$resource', 'API_URL', '$rootScope'];

    /* @ngInject */
    function stats($resource, API_URL, $rootScope) {

        return $resource(API_URL,
            {id: '@id'},
            {
                viewArticle: {
                    method: 'GET',
                    url: API_URL + '/stats-auth/:id/',
                    headers: {
                        'Authorization': $rootScope.user.token? 'Token ' + ($rootScope.user.token) : null
                    }
                }

            });

    }

})();

