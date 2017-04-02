(function () {
    'use strict';

    angular
        .module('app.magazines')
        .service('magazineActions', magazineActions);

    magazineActions.$inject = ['magazines', '$rootScope', 'accounts'];

    /* @ngInject */
    function magazineActions(magazines, $rootScope, accounts) {
        this.subscribe = subscribe;
        this.unsubscribe = unsubscribe;

        function subscribe(magazine) {
            if(!$rootScope.isAuth){
                var notice = '"' + magazine.title + '" լրատվականի նորություններին բաժանորդագրվելու համար անհրաժեշտ է մուտք գործել';
                accounts.requireAuthorization(notice, subscribe, [magazine]);
                return;
            }
            magazines().subscribe({slug: magazine.slug}, function (res) {
                magazine.is_subscribed = true;
            });
        }

        function unsubscribe(magazine) {
            if(!$rootScope.isAuth){
                var notice = '"' + magazine.title + '" լրատվականի նորություններից ապաբաժանորդագրվելու համար անհրաժեշտ է մուտք գործել';
                accounts.requireAuthorization(notice, subscribe, [magazine]);
                return;
            }
            magazines().unsubscribe({slug: magazine.slug}, function (res) {
                magazine.is_subscribed = false;
            });
        }
    }

})();

