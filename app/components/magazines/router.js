(function () {
    angular
        .module('app.magazines.router', ['ui.router'])
        .config(config);
    
    config.$inject = ['$stateProvider'];
    
    function config($stateProvider) {
        
        $stateProvider
            
            .state('magazines', {
                url: '/magazines',
                templateUrl: 'components/magazines/magazines.html',
                controller: 'MagazinesController',
                controllerAs: 'magazines',
                resolve: {
                    magazines: function (resources) {
                        return resources.magazines.query({limit: 1000}).$promise;
                    }
                }
            });
        
    }
        
})();