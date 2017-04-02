(function () {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sideBar', sideBar);

    sideBar.$inject = [];

    /* @ngInject */
    function sideBar() {
        var directive = {
            template:
            '<md-sidenav class="md-sidenav-left md-whiteframe-z2 side-navigation" md-is-locked-open="true">' +
                '<sidebar-content></sidebar-content>' +
            '</md-sidenav>' +

            '<md-sidenav class="md-sidenav-left md-whiteframe-4dp" md-component-id="left">' +
                '<md-toolbar class="md-theme-light">' +
                    '<h1 class="md-toolbar-tools">Sidenav Right</h1>' +
                '</md-toolbar>' +
                '<sidebar-content></sidebar-content>' +
            '</md-sidenav>',
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

