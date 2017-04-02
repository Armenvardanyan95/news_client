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
                                // '<span class="md-title">' +
                                    '<md-card-content>' +
                                        '<md-chips>' +
                                            '<md-chip ng-repeat="topic in topics.topics">' +
                                                '<a href="" ng-class="{\'forest-green\': topic.is_subscribed}">{{ topic.title }} &nbsp; &nbsp;</a>' +
                                                '<a href="" ng-click="topics.subscribe(topic)">' +
                                                    '<md-icon md-svg-icon="assets/img/{{ topic.is_subscribed ? \'topic-added\' : \'add-topic\'}}.svg">' +
                                                    '</md-icon>' +
                                                    '<md-tooltip md-direction="bottom">' +
                                                        '{{ topic.is_subscribed ? \'Ապաբաժանորդագրվել\' : \'Բաժանորդագրվել\' }} ' +
                                                    '</md-tooltip>' +
                                                '</a>' +
                                            '</md-chip>' +
                                        '</md-chips>' +
                                    '</md-card-content>' +
                                // '</span>' +
                            '</md-card-header-text>' +
                        '</md-card-header>' +
                      '</md-card>',
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

    topicsRandom.$inject = ['topics', 'topicActions'];

    /* @ngInject */
    function topicsRandom(topics, topicActions) {

        var vm = this;

        vm.reload = reload;
        vm.subscribe = subscribe;

        reload();

        function reload() {
            topics().query({page: 1, ordering: '?', not_mine: true}, function (res) {
                vm.topics = res.results;
            });
        }

        function subscribe(topic) {
            topicActions.subscribe(topic);
        }
    }

})();

