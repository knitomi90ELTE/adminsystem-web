(function () {
    'use strict';

    angular.module('app.common').factory('httpErrorInterceptor', httpErrorInterceptor);

    httpErrorInterceptor.$inject = [ '$window', '$q' ];

    function httpErrorInterceptor($window, $q) {
        var result = {};
        result.responseError = responseError;
        function responseError(rejection) {
            if (rejection.status === 500) {
                $window.location.href = '/error/unavailable';
            }
            return $q.reject(rejection);
        }
        return result;
    }

})();