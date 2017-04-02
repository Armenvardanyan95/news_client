(function () {
    'use strict';

    angular
        .module('app.articles')
        .controller('HistoryController', HistoryControler);

    HistoryControler.$inject = ['articles', '$rootScope'];

    /* @ngInject */
    function HistoryControler(articles, $rootScope) {
        var vm = this;
        articles = articles();

        vm.articles = [];

        vm.page = 1;
        vm.count = Infinity;
        vm.loadArticles = loadArticles;

        function loadArticles() {
            if(vm.articles.length >= vm.count || $rootScope.xhrLoading) return;
            articles.history({page: vm.page}, function (res) {
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
