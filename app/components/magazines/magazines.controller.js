(function () {
    'use strict';

    angular
        .module('app.magazines.router')
        .controller('MagazinesController', MagazinesController);

    MagazinesController.$inject = ['magazines'];

    /* @ngInject */
    function MagazinesController(magazines) {
        var vm = this;

        vm.magazines = magazines.results;
        
    }

})();

