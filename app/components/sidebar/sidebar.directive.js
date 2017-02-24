(function () {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sideBar', sideBar);

    sideBar.$inject = [];

    /* @ngInject */
    function sideBar() {
        var directive = {
            templateUrl: 'components/sidebar/sidebar.html',
            bindToController: true,
            controller: SideBarController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    SideBarController.$inject = ['$state', '$mdDialog'];

    /* @ngInject */
    function SideBarController($state, $mdDialog) {
        var vm = this;

        vm.personal = [
            {
                label: 'Թեմաներ',
                img: 'label',
                url: 'topics.list'
            },
            {
                label: 'Լրատվականներ',
                img: 'globe'
            },
            {
                label: 'Դիտել Հետո',
                img: 'bookmark-add'
            },
            {
                label: 'Պատմություն',
                img: 'history'
            }
        ];

        vm.overall = [
            {
                label: 'Ռեյթինգային',
                img: 'trending'
            },
            {
                label: 'Թարմ',
                img: 'new'
            },
            {
                label: 'Խառը',
                img: 'xary'
            }
        ]
        
        vm.goTo = goTo;
        
        function goTo(urlName) {
            if(false) {
                $state.go(urlName);
            }
            else {
                $mdDialog.show({
                    controller: 'LoginController as vm',
                    templateUrl: 'components/accounts/login.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true
                })
            }
        }
    }

})();

