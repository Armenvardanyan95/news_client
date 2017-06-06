(function () {
    'use strict';

    angular
        .module('app.header')
        .directive('mdHeader', mdHeader);

    mdHeader.$inject = [];

    /* @ngInject */
    function mdHeader() {
        var directive = {
            template: '<md-toolbar layout="row" class="md-whiteframe-z3 fixed-header">' +
                            '<md-content flex layout="row" layout-align="center">' +
                                '<a hide-gt-sm class="sidebar-open" ng-click="header.toggleSideNav()">' +
                                    '<md-icon md-svg-src="assets/img/list.svg"></md-icon>' +
                                '</a>' +
                                '<md-content flex="70">' +
                                    '<div class="md-toolbar-tools">' +
                                        '<div hide-xs hide-sm>' +
                                            '<a ui-sref="{{item.url}}" ng-repeat="item in header.menu">' +
                                                '{{ item.label }}' +
                                            '</a>' +
                                        '</div>' +
                                        '<span flex></span>' +
                                        '<a hide-gt-xs ng-click="header.showAccountMenu()"><md-icon md-svg-src="assets/img/account.svg"></a>' +
                                        '<md-menu-bar hide-xs>' +
                                            '<md-menu>' +
                                                '<button ng-click="$mdMenu.open()">' +
                                                        '<md-icon md-svg-src="assets/img/account.svg">' +
                                                '</button>' +
                                                '<md-menu-content>' +
                                                    '<md-menu-item ng-repeat="item in header.items">' +
                                                        '<md-button ng-click="header.action(item.id)">{{ item.name }}</md-button>' +
                                                    '</md-menu-item>' +
                                                '<md-menu-divider></md-menu-divider>' +
                                                '</md-menu-content>' +
                                            '</md-menu>' +
                                        '</md-menu-bar>' +
                                        '<a><md-icon md-svg-src="assets/img/notification.svg"></a>' +
                                        '<input type="search" ng-model="header.query" placeholder="Որոնել․․․" ' +
                                        'ng-blur="header.toggleSearchBox(false)" ng-focus="header.showList = true" ' +
                                        'ng-model-options="{debounce: 300}" ng-change="header.search(header.query)">' +
                                    '</div>' +
                                '</md-content>' +
                            '</md-content>' +
                      '</md-toolbar>' +
                      '<md-divider class="under-header"></md-divider>' +
                      '<md-content class="search-results">' +
                            '<md-list>' +
                                '<md-subheader ng-if="header.showList && header.query.length" class="md-no-sticky">' +
                                    'Որոնել \'{{ header.query }}\'' +
                                '</md-subheader>' +
                                '<md-list-item ng-if="header.showList && (header.magazines.length)" class="md-2-line list-item" ' +
                                'ng-repeat="magazine in header.magazines">' +
                                    '<img class="search-avatar" ng-src="{{ magazine.main_pic }}">' +
                                        '<div class="md-list-item-text">' +
                                            '<a ui-sref="magazine({slug: magazine.slug})">{{ magazine.title }}</a>' +
                                        '</div>' +
                                    '<md-divider></md-divider>' +
                                '</md-list-item>' +
                            '</md-list>' +
                          '<md-list ng-if="header.showList && (header.topics.length)" flex>' +
                              '<md-list-item class="md-2-line list-item" ' +
                              'ng-repeat="topic in header.topics">' +
                                  '<div class="md-list-item-text">' +
                                    '<a>#{{ topic.title }}</a>' +
                                  '</div>' +
                                  '<md-divider></md-divider>' +
                              '</md-list-item>' +
                          '</md-list>' +
                      '</md-content>',
            bindToController: true,
            replace: false,
            controller: 'HeaderController',
            controllerAs: 'header',
            link: link,
            restrict: 'E',
            scope: '@'
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

})();

