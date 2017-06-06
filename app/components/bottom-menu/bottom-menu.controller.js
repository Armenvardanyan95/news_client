(function () {
    'use strict';

    angular
        .module('app.bottom-menu')
        .controller('BottomMenuController', BottomMenuController);

    BottomMenuController.$inject = ['accounts'];

    /* @ngInject */
    function BottomMenuController(accounts) {

        var vm = this;

        vm.items = [
            { id: 1, name: 'Մուտք', icon: 'assets/img/login.svg' },
            { id: 2, name: 'Իմ տվյալները' },
            { id: 3, name: 'Կարգավորումներ'},
        ];
        vm.action = action;

        function action(value) {
            if(value == 1){
                accounts.requireAuthorization();
            }
        }
    }

})();

