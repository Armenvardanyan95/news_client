(function () {
   angular
       .module('app', [
           'app.articles',
           'app.topics',
           'app.magazines',
           'app.accounts',
           'app.header',
           'app.sidebar',
           'app.resources',
           'app.utils',
           'ngMaterial',
           'angular-loading-bar',
           'infinite-scroll'
       ])
       .config(config)
       .run(run);

        run.$inject = ['$rootScope', 'accounts', '$state'];

        function config() {
                angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 2500)
        }

        function run($rootScope, accounts, $state) {

            $rootScope.xhrLoading = false;

            $rootScope.$on('cfpLoadingBar:started', function () {
                    $rootScope.xhrLoading = true;
            });

            $rootScope.$on('cfpLoadingBar:completed', function () {
                    $rootScope.xhrLoading = false;
            });

            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams){

                    if(!$rootScope.isAuth && toState.isAuth){
                        event.preventDefault();
                        var notice = 'Այս էջը տեսնելու համար անհրաժեշտ է մուտք գործել';
                        accounts.requireAuthorization(notice, $state.go, [toState.name, toParams])
                    }
            });

        }
    
})();