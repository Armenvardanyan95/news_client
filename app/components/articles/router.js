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
                template: '<articles articles="home.articles" load-articles="home.loadArticles()"></articles>',
                controller: 'HomeController',
                controllerAs: 'home'
            })

            .state('history', {
                url: '/history',
                template: '<articles articles="history.articles" load-articles="history.loadArticles()"></articles>',
                controller: 'HistoryController',
                controllerAs: 'history',
                isAuth: true
            })
            .state('saved', {
                url: '/saved',
                template: '<articles articles="saved.articles" load-articles="saved.loadArticles()"></articles>',
                controller: 'SavedArticlesController',
                controllerAs: 'saved',
                isAuth: true
            })
            .state('custom', {
                url: '/:orderingType',
                template: '<articles articles="home.articles" load-articles="home.loadArticles()"></articles>',
                controller: 'HomeController',
                controllerAs: 'home'
            });


    }

})();