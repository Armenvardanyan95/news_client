(function () {
    'use strict';

    angular
        .module('app.articles')
        .service('articleActions', articleActions);

    articleActions.$inject = ['resources', 'FB', '$mdToast'];

    /* @ngInject */
    function articleActions(resources, FB) {

        this.share = share;
        this.store = store;

        function share(article) {
            console.log(article);
            FB.ui({
                method: 'share',
                href: article.reference
            }, function(response){
                console.log('shared');
            });
        }
        function store(article) {
            resources.articles.store({id: article.id}, {}, function () {
                article.is_saved = true;
                $mdToast.show($mdToast.simple().textContent('Հղումը հաջողությամբ պահպանվել է'));
            });
        }
    }

})();

