(function () {
    'use strict';

    angular
        .module('app.header')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['magazines', 'topics', '$mdSidenav', '$timeout', '$mdBottomSheet', '$mdMenu', 'accounts'];

    /* @ngInject */
    function HeaderController(magazines, topics, $mdSidenav, $timeout, $mdBottomSheet, $mdMenu, accounts) {
        var vm = this;
        
        vm.showList = false;
        vm.toggleSideNav = toggleSideNav;
        vm.search = search;
        vm.toggleSearchBox = toggleSearchBox;
        vm.showAccountMenu = showAccountMenu;
        vm.action = action;

        vm.menu = [
            {
                label: 'Բլոգներ',
                url: 'magazines'
            },
            {
                label: 'Թեմաներ',
                url: 'magazines'
            }
        ];

        vm.items = [
            { id: 1, name: 'Մուտք', icon: 'assets/img/login.svg' },
            { id: 2, name: 'Իմ տվյալները' },
            { id: 3, name: 'Կարգավորումներ'},
        ];

        function action(value) {
            if(value == 1){
                accounts.requireAuthorization();
            }
        }
        
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

        function showAccountMenu() {
            $mdBottomSheet.show({
                templateUrl: 'components/bottom-menu/bottom-menu.html',
                controller: 'BottomMenuController as vm'
            })
        }
        
    }

})();

