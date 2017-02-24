(function () {
    'use strict';

    angular
        .module('app.resources')
        .service('resources', resources);

    resources.$inject = ['$resource', 'API_URL', '$mdToast', '$localStorage', '$rootScope'];

    /* @ngInject */
    function resources($resource, API_URL, $mdToast, $localStorage, $rootScope) {

        this.topics = $resource(API_URL + '/topics/', {id: '@id'}, {
            query: {
                isArray: false,
                headers: {
                    'Authorization': 'Token ' + ($rootScope.user.token || '')
                }
            }
        });

        this.articles = $resource(API_URL + '/articles/', {id: '@id'}, {
            query: {
                isArray: false,
                headers: {
                    'Authorization': 'Token ' + ($rootScope.user.token || '')
                }
            },
            store: {
                url: API_URL + '/articles/save/:id/',
                method: 'GET',
                isArray: false,
                headers: {
                    'Authorization': 'Token ' + ($rootScope.user.token || '')
                }
            }
        });

        this.magazines = $resource(API_URL + '/magazines/',
            {id: '@id'},
            {
                query: {
                    isArray: false,
                    headers: {
                        'Authorization': 'Token ' + ($rootScope.user.token || '')
                    }
                }

            });

        this.users = $resource(API_URL + '/users/',
            {id: '@id'},
            {
                query: {
                    isArray: false
                },
                save: {
                    method: 'POST',
                    interceptor: {
                        responseError: errorHandler
                    }
                },
                login: {
                    url: API_URL + '/get-auth-token/',
                    method: 'POST',
                    interceptor: {
                        responseError: errorHandler,
                        response: loginHandler
                    }
                },
                headers: {
                    'Authorization': 'Token ' + ($rootScope.user.token || '')
                }

            });

        function reformatHeader(text) {
            var res = text.replace(/_/g, ' ');
            res = res.charAt(0).toUpperCase() + res.slice(1);
            return res;
        }
        
        function errorHandler(error) {
            error = error.data || error;
            if(!angular.isObject(error) && !angular.isArray(error)) return false;
            var shown = false;
            angular.forEach(error, function (value, key) {
                if(shown) return false;
                if(angular.isObject(value)) errorHandler(value);
                if(angular.isArray(value)){
                    angular.forEach(value, function (subvalue) {
                        subvalue = reformatHeader(subvalue);
                        key = reformatHeader(key);
                        $mdToast.show($mdToast.simple().textContent(key + ': ' + subvalue));
                        shown = true;
                    });
                }
            });
        }

        function loginHandler(res) {
            $localStorage.user = res.data;
            $rootScope.user = $localStorage.user;
            $rootScope.isAuth = true;
        }
    }

})();


