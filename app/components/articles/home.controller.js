(function () {
    'use strict';

    angular
        .module('app.articles.router')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['articles', '$stateParams', '$rootScope'];

    /* @ngInject */
    function HomeController(articles, $stateParams, $rootScope) {
        var vm = this;
        vm.articles = [];

        articles = articles();

        var mapping = {
            views: '-views',
            random: '?',
            created: '-created'
        };
        vm.ordering = mapping[$stateParams.orderingType || 'created'];
        vm.page = 1;
        vm.count = Infinity;
        vm.loadArticles = loadArticles;

        function loadArticles() {
            if(vm.articles.length >= vm.count || $rootScope.xhrLoading) return;
            articles.query({page: vm.page, ordering: vm.ordering}, function (res) {
                Rx.Observable.from(res.results)
                    .filter(function(article){
                        return !vm.articles.filter(function (element) {
                                return element.id == article.id;
                            }).length;
                    })
                    .subscribe(function (article) { if(vm.articles.indexOf(article) == -1) vm.articles.push(article); });
                vm.count = res.count;
                vm.page++;
            });
        }
        
    }

})();

