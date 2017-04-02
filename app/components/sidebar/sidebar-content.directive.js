(function () {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebarContent', sidebarContent);

    sidebarContent.$inject = ['$state', '$mdDialog'];

    /* @ngInject */
    function sidebarContent($state, $mdDialog) {
        var directive = {
            template: '<md-content layout-padding >' +
            '<md-list>' +
                '<md-subheader>' +
                    '<md-icon md-svg-src="assets/img/person.svg"></md-icon>' +
                        'Անձնական' +
                '</md-subheader>' +
                '<md-list-item ng-repeat="item in ::vm.personal">' +
                        '<md-button href="" ui-sref="{{ item.url }}">' +
                            '<md-icon md-svg-src="assets/img/{{ item.img }}.svg"></md-icon>' +
                            '{{ item.label }}' +
                        '</md-button>' +
                '</md-list-item>' +
                '<md-subheader hide-gt-xs>' +
                    '<md-icon md-svg-src="assets/img/people.svg"></md-icon>' +
                        'Ընդհանուր' +
                '</md-subheader>' +
                '<md-list-item hide-gt-xs ng-repeat="item in ::vm.overall">' +
                    '<md-button href="">' +
                        '<md-icon md-svg-src="assets/img/{{ item.img }}.svg"></md-icon>' +
                        '{{ item.label }}' +
                    '</md-button>' +
                '</md-list-item>' +
            '</md-list>' +
        '</md-content>',
            bindToController: true,
            controller: SidebarContentController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    SidebarContentController.$inject = ['$state', '$mdDialog'];
    function SidebarContentController($state, $mdDialog) {
        var vm = this;

        vm.personal = [
            {
                label: 'Իմ Հետաքրքրություները',
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
                img: 'history',
                url: 'history'
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
        ];

    }

})();

