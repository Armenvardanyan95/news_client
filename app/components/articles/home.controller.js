(function () {
    'use strict';

    angular
        .module('app.articles.router')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['resources', 'articleActions'];

    /* @ngInject */
    function HomeController(resources, articleActions) {
        var vm = this;
        vm.articles = [];
        vm.share = articleActions.share;
        vm.store = articleActions.store;

        resources.articles.query({limit: 50, ordering: 'created'}, function (res) {
            Array.prototype.push.apply(vm.articles, res.results);
        });
        
    }

})();

