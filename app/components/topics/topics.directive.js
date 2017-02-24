(function () {
    'use strict';

    angular
        .module('app.topics')
        .directive('topics', topics);

    topics.$inject = [];

    /* @ngInject */
    function topics() {
        var directive = {
            template: '<md-card class="topics">'+
                        '<md-card-header>' +
                            '<md-card-header-text>' +
                                '<span class="md-title">' +
                                    'Հետաքրքիր թեմաներ' +
                                    '<md-card-content>' +
                                        '<md-chips>' +
                                            '<md-chip ng-repeat="topic in topics.topics">' +
                                                '{{ topic.title }}' + 
                                            '</md-chip>' +
                                        '</md-chips>' +
                                    '</md-card-content>' +
                                '</span>' +
                            '</md-card-header-text>' +
                        '</md-card-header>' +
                      '</md-card>',
            // template: '<md-content class="topics">' +
            //             '<div>' +
            //                 '<h3 >Թեմաներ</h3>' +
            //                 '<md-button  ' +
            //                     'ng-click="topics.reload()" aria-label="Reload">' +
            //                     '<md-icon md-svg-src="assets/img/reload.svg"></md-icon>' +
            //                 '</md-button>' +
            //             '</div>' +
            //             '<md-divider></md-divider>' +
            //             '<md-chips>' +
            //                 '<md-chip ng-repeat="topic in topics.topics | orderBy:\'-title.length\'">{{ topic.title }}</md-chip>' +
            //             '</md-chips>' +
            //           '</md-content>',
            bindToController: true,
            controller: topicsRandom,
            controllerAs: 'topics',
            link: link,
            replace: true,
            restrict: 'E',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs) {
            
        }
    }

    topicsRandom.$inject = ['resources'];

    /* @ngInject */
    function topicsRandom(resources) {

        var vm = this;

        vm.reload = reload;

        reload();

        function reload() {
            resources.topics.query({limit: 24, ordering: '?'}, function (res) {
                vm.topics = res.results;
            });
        }
    }

})();

