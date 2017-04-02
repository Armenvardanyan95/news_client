(function () {
    'use strict';

    angular
        .module('app.magazines')
        .directive('magazine', magazine);

    magazine.$inject = [];

    /* @ngInject */
    function magazine() {
        var directive = {
            controllerAs: 'magazine',
            template: `
                        <md-card>
                            <a ui-sref="magazine({slug: magazine.magaz.slug})" ng-click="home.viewArticle(article)" class="in-article-link">
                                <img ng-src="{{ magazine.magaz.main_pic }}" height="400px" class="md-card-image" alt="image caption">
                                <md-card-title>
                                    <md-card-title-text>
                                        <span class="md-subhead">
                                            {{ magazine.magaz.title }}
                                        </span>
                                        
                                    </md-card-title-text>
                                </md-card-title>
                            </a>
            
                            <md-card-actions layout="row" layout-align="space-between center">
                                <md-card-content>
                                    <a class="md-icon-button social" ng-href="{{ magazine.magaz.facebook }}" target="_blank" ng-if="magazine.magaz.facebook" aria-label="Later">
                                        <md-tooltip md-direction="bottom">Facebook</md-tooltip>
                                        <md-icon md-svg-icon="assets/img/facebook.svg" class="color-icon"></md-icon>
                                    </a>
                            
                                    <a class="md-icon-button social" ng-href="{{ magazine.magaz.twitter }}" target="_blank" ng-if="magazine.magaz.twitter" aria-label="Later">
                                        <md-tooltip md-direction="bottom">Twitter</md-tooltip>
                                        <md-icon md-svg-icon="assets/img/twitter.svg" class="color-icon"></md-icon>
                                    </a>
                            
                                    <a class="md-icon-button social" ng-href="{{ magazine.magaz.vk }}" target="_blank" ng-if="magazine.magaz.vk" aria-label="Later">
                                        <md-tooltip md-direction="bottom">VK</md-tooltip>
                                        <md-icon md-svg-icon="assets/img/vk.svg" class="color-icon"></md-icon>
                                    </a>
                            
                                    <a class="md-icon-button social" ng-href="{{ magazine.magaz.instagram }}" target="_blank" ng-if="magazine.magaz.instagram" aria-label="Later">
                                        <md-tooltip md-direction="bottom">Instagram</md-tooltip>
                                        <md-icon md-svg-icon="assets/img/instagram.svg" class="color-icon"></md-icon>
                                    </a>
                                </md-card-content>
                                <md-card-content>
                                        <md-button class="md-icon-button float-right" aria-label="Share" ng-click="magazine[magazine.magaz.is_subscribed ? 'unsubscribe' : 'subscribe']()">
                                            <md-tooltip md-direction="bottom">
                                                {{ magazine.magaz.is_subscribed ? 'Ապաբաժանորդագրվել' : 'Բաժանորդագրվել' }}
                                            </md-tooltip>
                                            <md-icon md-svg-icon="assets/img/{{ magazine.magaz.is_subscribed ? \'topic-added\' : \'add-topic\'}}.svg"></md-icon>
                                        </md-button>
                                </md-card-content>
                                
                        </md-card-actions>
                        </md-card>`,
            link: link,
            restrict: 'E',
            bindToController: true,
            controller: MagazineController,
            scope: {
                magaz: '=',
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    MagazineController.$inject = ['magazineActions', '$rootScope'];

    /* @ngInject */
    function MagazineController(magazineActions, $rootScope) {
        var vm = this;

        vm.subscribe = subscribe;
        vm.unsubscribe = unsubscribe;

        function subscribe() {
            return magazineActions.subscribe(vm.magaz);
        }

        function unsubscribe() {
            return magazineActions.unsubscribe(vm.magaz);
        }
    }


})();

