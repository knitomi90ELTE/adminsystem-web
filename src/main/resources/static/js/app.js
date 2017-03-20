(function () {
    'use strict';

    var app = angular.module('AdminSystem', ['ngRoute', 'ngSanitize']);
    app.service('UserService', function () {
        var UserService = this;
        var nextId = 6;
        var userData = [
            {
                id: 1,
                name: 'Kiss István',
                wage: 1000,
                note: 'Beteg'
            },
            {
                id: 2,
                name: 'Nagy Zoltán',
                wage: 1100,
                note: 'Szabin'
            },
            {
                id: 3,
                name: 'Szabó Miklós',
                wage: 980,
                note: '-'
            },
            {
                id: 4,
                name: 'Tóth Ferenc',
                wage: 2000,
                note: 'Vezető'
            },
            {
                id: 5,
                name: 'Kis Imre',
                wage: 750,
                note: 'Tanuló'
            }
        ];
        UserService.createUser = function (newUser, callback) {
            userData.push({
                id: nextId,
                name: newUser.name,
                wage: newUser.wage,
                note: newUser.note
            });
            nextId++;
            callback(true);
        };
        UserService.editUser = function (editedUser, id, callback) {
            var success = false;
            for (var i in userData) {
                if (parseInt(id, 10) === userData[i].id) {
                    userData[i] = {
                        id : userData[i].id,
                        name: editedUser.name,
                        wage: editedUser.wage,
                        note: editedUser.note
                    };
                    success = true;
                }
            }
            callback(success);
        };
        UserService.getUserById = function (id, callback) {
            var foundUser = null;
            for (var i in userData) {
                if (parseInt(id, 10) === userData[i].id) {
                    foundUser = userData[i];
                }
            }
            callback(foundUser);
        };
        UserService.deleteUser = function (id, callback) {
            var success = false;
            for (var i in userData) {
                if (parseInt(id, 10) === userData[i].id) {
                    userData.splice(i, 1);
                    success = true;
                }
            }
            callback(success);
        };
        UserService.getAllUsers = function(callback) {
            callback(userData);
        };
    });
    app.controller('NavigationController', function () {

    });
    app.controller('TodayController', function () {
        var vm = this;
        vm.title = 'Napi nézet';
    });
    app.controller('UserListController', ['UserService', function (UserService) {
        var vm = this;
        vm.searchField = '';
        vm.tableConfig = {
            headers: ['Id', 'Név', 'Órabér', 'Megjegyzés', 'Műveletek'],
            data: null
        };
        UserService.getAllUsers(function(data){
            vm.tableConfig.data = data;
        });
        vm.deleteUser = function (id) {
            UserService.deleteUser(id, function(success){
                if(success) {
                    console.log('DELETE SUCCESS');
                } else {
                    console.log('DELETE FAILED');
                }
            })
        };
    }]);
    app.controller('UserCreateController', ['$location', 'UserService', function ($location, UserService) {
        var vm = this;
        vm.newUser = {
            name: '',
            wage: 0,
            note: ''
        };
        vm.createUser = function () {
            UserService.createUser(vm.newUser, function(success) {
                if(success) {
                    $location.path('/users');
                } else {
                    console.log('USER CREATION FAILED');
                }
            })
        };
    }]);
    app.controller('UserEditController', ['$routeParams', '$location', 'UserService', function ($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams.id;
        vm.user = {
            name: '',
            wage: 0,
            note: ''
        };
        UserService.getUserById(userId, function(data){
            if(data) {
                vm.user = {
                    name: data.name,
                    wage: data.wage,
                    note: data.note
                }
            } else {
                console.log('User with id ' + userId + ' not found!');
            }
        });
        vm.editUser = function() {
            UserService.editUser(vm.user, userId, function(success){
                if(success) {
                    $location.path('/users');
                } else {
                    console.log('USER EDIT FAILED');
                }
            });
        };
    }]);
    app.controller('ProjectsController', function () {
        var vm = this;
        vm.title = 'Munkák';
    });
    app.config(function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'pages/today.html',
            })
            .when('/today', {
                templateUrl: 'pages/today.html',
            })
            .when('/users', {
                templateUrl: 'pages/users/list.html',
            })
            .when('/users/create', {
                templateUrl: 'pages/users/create.html',
            })
            .when('/users/edit/:id', {
                templateUrl: 'pages/users/edit.html',
            })
            .when('/projects', {
                templateUrl: 'pages/projects.html',
            });
        $locationProvider.html5Mode(true);
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    });
})();
