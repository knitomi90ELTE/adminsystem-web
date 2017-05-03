(function () {
    'use strict';

    angular.module('app.common').factory('ResourceDao', ResourceDaoFactory);

    ResourceDao.$inject = ['$resource'];

    function ResourceDaoFactory($resource) {
        return function(url, uriParams) {
            return new ResourceDao(url, uriParams, $resource);
        };
    }

    function ResourceDao(url, uriParams, $resource) {
        var vm = this;
        vm.get = get;
        vm.list = list;
        vm.post = post;
        vm.remove = remove;

        var resource = $resource(url, uriParams);

        function get(requestParams) {
            return resource.get(requestParams).$promise;
        }

        function list(requestParams) {
            return resource.query(requestParams).$promise;
        }

        function post(requestParams) {
            return resource.save(requestParams).$promise;
        }

        function remove(requestParams) {
            return resource.remove(requestParams).$promise;
        }

        return vm;
    }

})();