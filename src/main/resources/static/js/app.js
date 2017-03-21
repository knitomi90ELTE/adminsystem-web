(function () {
    'use strict';

    var app = angular.module('AdminSystem', ['ngRoute', 'ngSanitize']);
        app.service('ProjectService', function () {
            var ProjectService = this;
            var nextId = 6;
            var projectData = [
                {
                    id: 1,
                    name: 'Napsugár Szálló',
                    retention: 0,
                    note: '-'
                },
                {
                    id: 2,
                    name: 'Tölgyfa Panzió',
                    retention: 0,
                    note: '-'
                }
            ];
            ProjectService.createProject = function (newProject, callback) {
                projectData.push({
                    id: nextId,
                    name: newProject.name,
                    retention: newProject.retention,
                    note: newProject.note
                });
                nextId++;
                callback(true);
            };
            ProjectService.editProject = function (editedProject, id, callback) {
                var success = false;
                for (var i in projectData) {
                    if (parseInt(id, 10) === projectData[i].id) {
                        projectData[i] = {
                            id : projectData[i].id,
                            name: editedProject.name,
                            retention: editedProject.retention,
                            note: editedProject.note
                        };
                        success = true;
                    }
                }
                callback(success);
            };
            ProjectService.getProjectById = function (id, callback) {
                var foundUser = null;
                for (var i in projectData) {
                    if (parseInt(id, 10) === projectData[i].id) {
                        foundUser = projectData[i];
                    }
                }
                callback(foundUser);
            };
            ProjectService.deleteProject = function (id, callback) {
                var success = false;
                for (var i in projectData) {
                    if (parseInt(id, 10) === projectData[i].id) {
                        projectData.splice(i, 1);
                        success = true;
                    }
                }
                callback(success);
            };
            UserService.getAllProjects = function(callback) {
                callback(projectData);
            };
        });
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
    app.controller('ProjectListController', ['ProjectService', function (ProjectService) {
        var vm = this;
        vm.searchField = '';
        vm.tableConfig = {
            headers: ['Id', 'Név', 'Visszatartás', 'Megjegyzés', 'Műveletek'],
            data: null
        };
        ProjectService.getAllProjects(function(data){
            vm.tableConfig.data = data;
        });
        vm.deleteUser = function (id) {
            ProjectService.deleteProject(id, function(success){
                if(success) {
                    console.log('DELETE SUCCESS');
                } else {
                    console.log('DELETE FAILED');
                }
            })
        };
    }]);
    app.controller('ProjectCreateController', ['$location', 'ProjectService', function ($location, ProjectService) {
        var vm = this;
        vm.newProject = {
            name: '',
            retention: 0,
            note: ''
        };
        vm.createProject = function () {
            ProjectService.createProject(vm.newProject, function(success) {
                if(success) {
                    $location.path('/projects');
                } else {
                    console.log('PROJECT CREATION FAILED');
                }
            })
        };
    }]);
    app.controller('ProjectEitController', ['$routeParams', '$location', 'ProjectService', function ($routeParams, $location, ProjectService) {
        var vm = this;
        var projectId = $routeParams.id;
        vm.project = {
            name: '',
            wage: 0,
            note: ''
        };
        ProjectService.getProjectById(projectId, function(data){
            if(data) {
                vm.project = {
                    name: data.name,
                    retention: data.retention,
                    note: data.note
                }
            } else {
                console.log('User with id ' + userId + ' not found!');
            }
        });
        vm.editProject = function() {
            ProjectService.editProject(vm.project, projectId, function(success){
                if(success) {
                    $location.path('/projects');
                } else {
                    console.log('PROJECT EDIT FAILED');
                }
            });
        };
    }]);
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
                templateUrl: 'pages/projects/list.html',
            })
            .when('/projects/create', {
                templateUrl: 'pages/projects/create.html',
            })
            .when('/projects/edit/:id', {
                templateUrl: 'pages/projects/edit.html',
            });
        $locationProvider.html5Mode(true);
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    });
})();
