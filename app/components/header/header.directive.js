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
                                '<md-content flex="85">' +
                                    '<div class="md-toolbar-tools">' +
                                        '<a ui-sref="magazines">Բլոգներ</a>' +
                                        '<span flex></span>' +
                                        '<input type="search" ng-model="header.query" placeholder="Որոնել․․․" ' +
                                        'ng-blur="header.showList = false" ng-focus="header.showList = true" ' +
                                        'ng-model-options="{debounce: 300}" ng-change="header.search(header.query)">' +
                                    '</div>' +
                                    '<md-content class="search-results">' +
                                        '<md-list ng-if="header.showList && (header.topics.length)" flex>' +
                                            '<md-subheader class="md-no-sticky">Թեմաներ</md-subheader>' +
                                            '<md-list-item class="md-2-line list-item" ' +
                                            'ng-repeat="topic in header.topics">' +
                                                '<div class="md-list-item-text">' +
                                                    '<p>{{ topic.title }}</p>' +
                                                '</div>' +
                                            '</md-list-item>' +
                                        '</md-list>' +
                                    '</md-content>' +
                                '</md-content>' +
                            '</md-content>' +
                      '</md-toolbar>' +
                      '<md-divider></md-divider>',
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

