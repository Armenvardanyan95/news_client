(function () {
    'use strict';

    angular
        .module('app.accounts')
        .service('accounts', accounts);

    accounts.$inject = ['$mdDialog'];

    /* @ngInject */
    function accounts($mdDialog) {
        this.requireAuthorization = requireAuthorization;

        function requireAuthorization(explanation, action, args) {

            $mdDialog.show({
                controller: 'LoginController as vm',
                templateUrl: 'components/accounts/login.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                locals: {
                    explanation: explanation,
                    action: action,
                    args: args
                }
            });

        }
    }

})();

