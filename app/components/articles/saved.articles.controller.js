(function () {
    'use strict';

    angular
        .module('app.articles')
        .controller('SavedArticlesController', SavedArticlesController);

    SavedArticlesController.$inject = ['articles', '$rootScope'];

    /* @ngInject */
    function SavedArticlesController(articles, $rootScope) {
        var vm = this;
        vm.articles = [];

        articles = articles();
        vm.page = 1;
        vm.count = Infinity;
        vm.loadArticles = loadArticles;
        vm.loadArticles();

        function loadArticles() {
            articles.saved_articles({page: vm.page}, function (res) {
                Rx.Observable.from(res.results)
                    .map(function(article){article.article.is_saved = true; return article.article})
                    .filter(function(article){
                        return !vm.articles.filter(function (element) {
                            return element.id == article.id;
                        }).length;
                    })
                    .subscribe(function (article) {if(vm.articles.indexOf(article) == -1) vm.articles.push(article); });
                vm.count = res.count;
                vm.page++;
            });
        }
    }

})();

