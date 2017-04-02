(function () {
    angular
        .module('app.magazines.router', ['ui.router'])
        .config(config);
    
    config.$inject = ['$stateProvider'];
    
    function config($stateProvider) {
        
        $stateProvider
            
            .state('magazines', {
                url: '/magazines/all',
                templateUrl: 'components/magazines/magazines.html',
                controller: 'MagazinesController',
                controllerAs: 'magazines',
                resolve: {
                    magazines: function (magazines) {
                        return magazines().query({limit: 1000}).$promise;
                    }
                }
            })

            .state('magazine', {
                url: '/magazines/:slug',
                template: `<articles articles="magazine.articles" magaz="magazine.magazine" load-articles="magazine.loadArticles()"></articles>`,
                controllerAs: 'magazine',
                controller: 'MagazineController',
                resolve: {
                    magazine: function (magazines, $stateParams) {
                        return magazines().get({id: $stateParams.slug}).$promise;
                    }
                }
            })
        
    }
        
})();