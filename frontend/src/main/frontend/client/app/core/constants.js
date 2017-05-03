/* global ngToast:false, moment:false */
(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('CONSTANTS', {
            DATE_FORMAT: 'YYYY-MM-DD'
        })
        .constant('ngToast', ngToast)
        .constant('moment', moment);
})();