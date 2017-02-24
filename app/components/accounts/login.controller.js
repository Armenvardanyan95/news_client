(function () {
    'use strict';

    angular
        .module('app.accounts')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['resources', '$mdDialog'];

    /* @ngInject */
    function LoginController(resources, $mdDialog) {
        var vm = this;
        
        vm.user = resources.users;
        vm.login = {};
        vm.registration = {};
        vm.cancel = $mdDialog.hide;
        
        
    }

})();

