(function () {
    'use strict';

    angular.module('admin-app').config(routingConfig);

    function routingConfig($routeProvider, $locationProvider, $httpProvider) {
        var PAGES = 'html/pages/';
        $routeProvider
            .when('/', {
                redirectTo: '/today'
            })
            .when('/today', {
                templateUrl: PAGES + 'today/today.html',
                controller: 'TodayController',
                controllerAs: 'ctrl'
            })
            .when('/user', {
                templateUrl: PAGES + 'user/list.html',
                controller: 'UserListController',
                controllerAs: 'ctrl'
            })
            .when('/user/create', {
                templateUrl: PAGES + 'user/create.html',
                controller: 'UserCreateController',
                controllerAs: 'ctrl'
            })
            .when('/user/edit/:id', {
                templateUrl: PAGES + 'user/edit.html',
                controller: 'UserEditController',
                controllerAs: 'ctrl'
            })
            .when('/project', {
                templateUrl: PAGES + 'project/list.html',
                controller: 'ProjectListController',
                controllerAs: 'ctrl'
            })
            .when('/project/create', {
                templateUrl: PAGES + 'project/create.html',
                controller: 'ProjectCreateController',
                controllerAs: 'ctrl'
            })
            .when('/project/edit/:id', {
                templateUrl: PAGES + 'project/edit.html',
                controller: 'ProjectEditController',
                controllerAs: 'ctrl'
            })
            .when('/status', {
                templateUrl: PAGES + 'status/list.html',
                controller: 'StatusListController',
                controllerAs: 'ctrl'
            })
            .when('/status/create', {
                templateUrl: PAGES + 'status/create.html',
                controller: 'StatusCreateController',
                controllerAs: 'ctrl'
            })
            .when('/status/edit/:id', {
                templateUrl: PAGES + 'status/edit.html',
                controller: 'StatusEditController',
                controllerAs: 'ctrl'
            })
            .when('/openitems', {
                templateUrl: PAGES + 'balance/openitems.html',
                controller: 'BalanceListController',
                controllerAs: 'ctrl'
            })
            .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }
})();
