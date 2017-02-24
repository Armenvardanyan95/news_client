(function () {
    angular
        .module('app.accounts', ['ngStorage'])
        .run(run);

    run.$inject = ['$localStorage', '$rootScope'];

    function run($localStorage, $rootScope) {

        $rootScope.user = $localStorage.user || false;
        $rootScope.isAuth = !!$rootScope.user;

    }
        
})();