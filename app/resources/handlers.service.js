(function () {
    'use strict';

    angular
        .module('app.resources')
        .service('handlers', handlers);

    handlers.$inject = ['$mdToast', '$localStorage', '$rootScope'];

    /* @ngInject */
    function handlers($mdToast, $localStorage, $rootScope) {
        this.errorHandler = errorHandler;

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

    }

})();

