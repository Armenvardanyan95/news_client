(function () {
    'use strict';

    angular
        .module('app.articles')
        .directive('articles', articles);

    articles.$inject = [];

    /* @ngInject */
    function articles() {
        var directive = {
            bindToController: true,
            template:
            `<md-content flex layout="column" class="articles" scrollbar>
                <md-content flex="100" layout="row" layout-align="center">
                    <md-content flex-sm="95" flex-gt-xs="35">
                        <magazine magaz="home.magaz" ng-if="home.magaz"></magazine>
                        <md-divider ng-if="home.magaz"></md-divider>
                        <div infinite-scroll="home.loadArticles()" infinite-scroll-distance="1">
                        <md-card ng-repeat-start="article in home.articles track by article.id">
                            <md-card-header>
                                <md-card-avatar>
                                    <img class="md-user-avatar" ng-src="{{ article.magazine_details.main_pic }}">
                                </md-card-avatar>
                                <md-card-header-text>
                                    <span class="md-title">
                                        <a ui-sref="magazine({slug: article.magazine_details.slug})" class="innerLink">{{ article.magazine_details.title }}</a>
                                        <span flex></span>
                                        <span class="rightFloat">{{ article.created | date : "mediumDate" | armenianDate }}</span>
                                    </span>
                                <span class="md-subhead">
                                    <a href="{{ article.magazine_details.website }}" class="outerLink" target="_blank">
                                        {{ article.magazine_details.site_name }}
                                    </a>
                                </span>
                                </md-card-header-text>
                            </md-card-header>
                            <a href="{{ article.reference }}" ng-click="home.viewArticle(article)" class="in-article-link" target="_blank">
                                <img ng-src="{{ article.image }}" class="md-card-image" alt="image caption">
                    
                                <md-card-title>
                                    <md-card-title-text>
                                        <span class="md-subhead">
                                            {{ article.title }}
                                        </span>
                                    </md-card-title-text>
                                </md-card-title>
                            </a>
            
                            <md-card-actions layout="row" layout-align="space-between center">
                                <md-card-content>
                                    <md-icon md-svg-src="assets/img/label.svg" class="color-icon"></md-icon>
                                    <a href="" class="outerLink" ng-repeat="topic in article.topics">
                                        {{ topic.title }}<span ng-if="$index + 1 < article.topics.length">,&nbsp;</span>
                                    </a>
                                </md-card-content>
                    
                            <div>
                            <md-button class="md-icon-button" aria-label="Later" ng-click="home.store(article)">
                                <md-tooltip md-direction="bottom">{{ article.is_saved ? 'Հեռացնել' : 'Դիտել Հետո' }}</md-tooltip>
                                <md-icon md-svg-icon="assets/img/bookmark-add{{ article.is_saved ? '-fill' : '' }}.svg" class="color-icon"></md-icon>
                            </md-button>
                        <md-button class="md-icon-button" aria-label="Share" ng-click="home.share(article)">
                            <md-tooltip md-direction="bottom">Կիսվել</md-tooltip>
                            <md-icon md-svg-icon="assets/img/share.svg"></md-icon>
                        </md-button>
                            </div>
                        </md-card-actions>
                        </md-card>
                        <topics ng-repeat-end ng-if="!(($index + 1) % 3)"></topics>
                        <md-progress-circular layout-align="center center" layout="column" md-diameter="100" md-mode="indeterminate"></md-progress-circular>
                        </div>
            </md-content>
                </md-content>
            </md-content>`,
            controller: ArticleController,
            controllerAs: 'home',
            link: link,
            restrict: 'E',
            scope: {
                articles: '=',
                loadArticles: '&',
                magaz: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    ArticleController.$inject = ['articleActions', '$rootScope'];

    /* @ngInject */
    function ArticleController(articleActions, $rootScope) {
        var vm = this;

        vm.share = articleActions.share;
        vm.store = articleActions.store;
        vm.viewArticle = $rootScope.isAuth ? articleActions.viewAsAuth : articleActions.viewAsNotAuth;
    }

})();

