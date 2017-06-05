(function () {
    'use strict';

    angular
        .module('app.header')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['magazines', 'topics', '$mdSidenav', '$timeout'];

    /* @ngInject */
    function HeaderController(magazines, topics, $mdSidenav, $timeout) {
        var vm = this;
        
        vm.showList = false;
        vm.toggleSideNav = toggleSideNav;
        vm.search = search;
        vm.toggleSearchBox = toggleSearchBox;

        vm.menu = [
            {
                label: 'Բլոգներ',
                url: 'magazines'
            },
            {
                label: 'Թեմաներ',
                url: 'magazines'
            },
            {
                label: 'Ռեյթինգային',
                url: 'custom({orderingType: \'views\'})'
            },
            {
                label: 'Թարմ',
                url: 'magazines'
            },
            {
                label: 'Խառը',
                url: 'custom({orderingType: \'random\'})'
            }
        ];
        
        function search(query) {
            if(query.length < 3){
                vm.topics = [];
                vm.magazines = [];
                return false;
            }
            topics().query({search: query, limit: 3}, function (res) {
                vm.topics = res.results;
            });
            magazines().query({search: query, limit: 3}, function (res) {
                vm.magazines = res.results;
            })
        }

        function toggleSideNav() {
            $mdSidenav('left').toggle();
        }

        function toggleSearchBox(value) {
            $timeout(function () {
                vm.showList = value;
                console.log(value, vm.showList, 'agrrr')
            }, 100);
        }
        
    }

})();

