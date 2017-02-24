(function () {
    'use strict';

    angular
        .module('app.utils')
        .filter('armenianDate', armenianDate);

    function armenianDate() {
        return armenianDateFilter;

        function armenianDateFilter(parameters) {
            var mappings = {
                'Jan': 'Հունվարի',
                'Feb': 'Փետրվարի',
                'Mar': 'Մարտի',
                'Apr': 'Ապրիլի',
                'May': 'Մայիսի',
                'Jun': 'Հունիսի',
                'Jul': 'Հուլիսի',
                'Aug': 'Օգոստոսի',
                'Sep': 'Սեպտեմբերի',
                'Oct': 'Հոկտեմբերի',
                'Nov': 'Նոյեմբերի',
                'Dec': 'Դեկտեմբերի'
            };
            
            var key = '';

            angular.forEach(mappings, function (k, month) {
                if(parameters.indexOf(month) != -1){
                    key = month;
                }
            });
            
            return parameters.replace(key, mappings[key]);
        }
    }

})();

