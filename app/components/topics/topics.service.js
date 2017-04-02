(function () {
    'use strict';

    angular
        .module('app.topics')
        .service('topicActions', topicActions);

    topicActions.$inject = ['topics', '$rootScope', 'accounts'];

    /* @ngInject */
    function topicActions(topics, $rootScope, accounts) {

        this.subscribe = subscribe;

        function subscribe(topic) {
            if(!$rootScope.isAuth){
                var notice = '"' + topic.title + '" թեմայի նորություններին բաժանորդագրվելու համար անհրաժեշտ է մուտք գործել';
                accounts.requireAuthorization(notice, subscribe, [topic]);
                return false;
            }

            topics().subscribe({id: topic.id}, function (res) {
                topic.is_subscribed = !topic.is_subscribed;
            });
        }

    }

})();

