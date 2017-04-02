(function () {
    'use strict';

    angular
        .module('app.magazines.router')
        .controller('MagazinesController', MagazinesController);

    MagazinesController.$inject = ['magazines'];

    /* @ngInject */
    function MagazinesController(magazines) {
        var vm = this;

        vm.query = '';
        vm.allMagazines = [];
        vm.magazines = [];
        Array.prototype.push.apply(vm.allMagazines, magazines.results);
        Array.prototype.push.apply(vm.magazines, vm.allMagazines);

        vm.filterMagazines = filterMagazines;

        function filterMagazines() {
            vm.magazines = [];
            if(!vm.query.length){
                Array.prototype.push.apply(vm.magazines, vm.allMagazines);
                return;
            }
            Rx.Observable.from(vm.allMagazines)
                .filter(function (magazine) { return magazine.title.toLowerCase().startsWith(vm.query); })
                .subscribe(function (magazine) { vm.magazines.push(magazine); });
        }
        
    }

})();

