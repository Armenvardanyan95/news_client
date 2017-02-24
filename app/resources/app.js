(function () {
    angular
        .module('app.resources', ['ngResource', 'ngStorage'])
        .config(config)
        .constant('API_URL', 'http://127.0.0.1\\:8000');
    
    config.$inject = ['$resourceProvider'];
    
    function config($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }

})();