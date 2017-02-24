(function () {
   angular
       .module('app.articles.router', [
           'ui.router',
       ])
       .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');


        
        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: 'components/articles/home.html',
                controller: 'HomeController',
                controllerAs: 'home'
            });
    }

})();