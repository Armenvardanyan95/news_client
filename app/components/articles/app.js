(function () {
    angular
        .module('app.articles', [
            'app.articles.router',
            'app.utils'
        ])
        .constant('FB', {});
})();