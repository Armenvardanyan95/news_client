(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('scrollbar', scrollbar);

    scrollbar.$inject = ['PS'];

    /* @ngInject */
    function scrollbar(PS) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            PS.initialize(element);
        }
    }

})();

