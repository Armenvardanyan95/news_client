(function () {
    'use strict';

    angular
        .module('app.magazines')
        .controller('MagazineController', MagazineController);

    MagazineController.$inject = ['magazine', 'articles', 'magazineActions'];

    /* @ngInject */
    function MagazineController(magazine, articles, magazineActions) {
        var vm = this;

        vm.magazine = magazine;
        vm.articles = [];

        vm.page = 1;
        vm.count = Infinity;
        vm.loadArticles = loadArticles;

        function loadArticles() {
            if(vm.articles.length >= vm.count) return;
            articles().query({page: vm.page, ordering: 'created', magazine: vm.magazine.id}, function (res) {
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

