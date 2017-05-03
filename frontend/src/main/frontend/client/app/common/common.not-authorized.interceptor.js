(function () {
    'use strict';

    angular.module('app.common').factory('notAuthorizedInterceptor', notAuthorizedInterceptor);

    notAuthorizedInterceptor.$inject = [ '$window', '$q' ];

    function notAuthorizedInterceptor($window, $q) {
        var result = {};
        result.responseError = responseError;
        function responseError(rejection) {
            if (rejection.status === 403) {
                $window.location.href = '/error/unauthorized';
            }
            return $q.reject(rejection);
        }
        return result;
    }

})();