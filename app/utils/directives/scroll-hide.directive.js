(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('scrollDirection', scrollDirection);

    scrollDirection.$inject = ['$rootScope'];

    /* @ngInject */
    function scrollDirection($rootScope) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            window.addEventListener('mousewheel', function(e){
                $rootScope.scrollDir = e.wheelDelta < 0 ? 'down' : 'up';
            });
        }
    }

})();

