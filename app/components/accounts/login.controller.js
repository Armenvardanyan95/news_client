(function () {
    'use strict';

    angular
        .module('app.accounts')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['users', '$mdDialog', 'action', 'args', 'explanation', '$rootScope', '$localStorage', '$timeout'];

    /* @ngInject */
    function LoginController(users, $mdDialog, action, args, explanation, $rootScope, $localStorage, $timeout) {
        var vm = this;

        vm.user = users;
        vm.login = {};
        vm.registration = {};
        vm.explanation = explanation;
        vm.cancel = $mdDialog.hide;
        vm.signIn = signIn;

        
        function signIn() {
            users.login(vm.login).$promise.then(
                function (res) {
                    $localStorage.user = {
                        id: res.id,
                        token: res.token
                    };
                    $rootScope.user = $localStorage.user;
                    $rootScope.isAuth = true;
                    $timeout(function () {
                        if(action){
                            if(angular.isArray(args) && args.length){
                                action.apply(null, args);
                            } else {
                                action();
                            }
                        }
                        vm.cancel();
                    });
                }
            )
        }
        
    }

})();

