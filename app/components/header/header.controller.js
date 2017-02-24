(function () {
    'use strict';

    angular
        .module('app.header')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['resources'];

    /* @ngInject */
    function HeaderController(resources) {
        var vm = this;
        
        vm.showList = false;
        
        vm.search = search;
        
        function search(query) {
            if(query.length < 3){
                vm.topics = [];
                return false;
            }
            resources.topics.query({search: query, limit: 3}, function (res) {
                vm.topics = res.results;
            });
        }
        
    }

})();

