(function () {
    'use strict';

    angular
        .module('app.articles')
        .service('articleActions', articleActions);

    articleActions.$inject = ['articles', 'FB', '$mdToast', 'stats', '$localStorage', '$rootScope', 'accounts'];

    /* @ngInject */
    function articleActions(articles, FB, $mdToast, stats, $localStorage, $rootScope, accounts) {

        this.share = share;
        this.store = store;
        this.viewAsAuth = viewAsAuth;
        this.viewAsNotAuth = viewAsNotAuth;


        function share(article) {
            FB.ui({
                method: 'share',
                href: article.reference
            }, function(response){
                console.log('shared');
            });
        }

        function viewAsNotAuth(article){
            if(!angular.isArray($localStorage.viewed_articles)){
                $localStorage.viewed_articles =  [];
            }
            $localStorage.viewed_articles.push(article.id);
        }

        function viewAsAuth(article) {
            stats.viewArticle({id: article.id});
        }

        function store(article) {
            if(!$rootScope.isAuth){
                var notice = 'Հոդվածի հղումը պահպանելու համար անհրաժեշտ է մուտք գործել';
                accounts.requireAuthorization(notice, store, [article]);
                return false;
            }

            articles().store({id: article.id}, {}, function () {
                article.is_saved = !article.is_saved;
                $mdToast.show($mdToast.simple().textContent('Հղումը հաջողությամբ պահպանվել է'));
            });

        }
    }

})();

