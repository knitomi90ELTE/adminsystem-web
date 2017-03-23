(function () {
    'use strict';

    var app = angular.module('AdminSystem', ['ngRoute', 'ngSanitize']);
    app.service('StatusService', function() {
        var StatusService = this;
        var nextId = 4;
        var statusData = [
            {
                id: 1,
                name: 'Kiadás'
            },
            {
                id: 2,
                name: 'Bevétel'
            },
            {
                id: 3,
                name: 'Egyéb'
            }
        ];
        StatusService.createStatus = function (newStatus, callback) {
            statusData.push({
                id: nextId,
                name: newStatus.name,
            });
            nextId++;
            callback(true);
        };
        StatusService.editStatus = function (editedStatus, id, callback) {
            var success = false;
            for (var i in statusData) {
                if (parseInt(id, 10) === statusData[i].id) {
                    statusData[i] = {
                        id : statusData[i].id,
                        name: editedStatus.name,
                    };
                    success = true;
                }
            }
            callback(success);
        };
        StatusService.getStatusById = function (id, callback) {
            var foundStatus = null;
            for (var i in statusData) {
                if (parseInt(id, 10) === statusData[i].id) {
                    foundStatus = statusData[i];
                }
            }
            callback(foundStatus);
        };
        StatusService.deleteStatus = function (id, callback) {
            var success = false;
            for (var i in statusData) {
                if (parseInt(id, 10) === statusData[i].id) {
                    statusData.splice(i, 1);
                    success = true;
                }
            }
            callback(success);
        };
        StatusService.getAllStatuses = function(callback) {
            callback(statusData);
        };
    });
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
            var foundProject = null;
            for (var i in projectData) {
                if (parseInt(id, 10) === projectData[i].id) {
                    foundProject = projectData[i];
                }
            }
            callback(foundProject);
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
        ProjectService.getAllProjects = function(callback) {
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
        vm.user = {
            name: '',
            wage: 0,
            note: ''
        };
        vm.createUser = function () {
            UserService.createUser(vm.user, function(success) {
                if(success) {
                    $location.path('/user');
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
                    $location.path('/user');
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
        vm.deleteProject = function (id) {
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
        vm.project = {
            name: '',
            retention: 0,
            note: ''
        };
        vm.createProject = function () {
            ProjectService.createProject(vm.project, function(success) {
                if(success) {
                    $location.path('/project');
                } else {
                    console.log('PROJECT CREATION FAILED');
                }
            })
        };
    }]);
    app.controller('ProjectEditController', ['$routeParams', '$location', 'ProjectService', function ($routeParams, $location, ProjectService) {
        var vm = this;
        var projectId = $routeParams.id;
        vm.project = {
            name: '',
            retention: 0,
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
                console.log('Project with id ' + projectId + ' not found!');
            }
        });
        vm.editProject = function() {
            ProjectService.editProject(vm.project, projectId, function(success){
                if(success) {
                    $location.path('/project');
                } else {
                    console.log('PROJECT EDIT FAILED');
                }
            });
        };
    }]);
    app.controller('StatusListController', ['StatusService', function (StatusService) {
        var vm = this;
        vm.searchField = '';
        vm.tableConfig = {
            headers: ['Id', 'Név', 'Műveletek'],
            data: null
        };
        StatusService.getAllStatuses(function(data){
            vm.tableConfig.data = data;
        });
        vm.deleteStatus = function (id) {
            StatusService.deleteStatus(id, function(success){
                if(success) {
                    console.log('DELETE SUCCESS');
                } else {
                    console.log('DELETE FAILED');
                }
            })
        };
    }]);
    app.controller('StatusCreateController', ['$location', 'StatusService', function ($location, StatusService) {
        var vm = this;
        vm.status = {
            name: ''
        };
        vm.createStatus = function () {
            StatusService.createStatus(vm.status, function(success) {
                if(success) {
                    $location.path('/status');
                } else {
                    console.log('STATUS CREATION FAILED');
                }
            })
        };
    }]);
    app.controller('StatusEditController', ['$routeParams', '$location', 'StatusService', function ($routeParams, $location, StatusService) {
        var vm = this;
        var statusId = $routeParams.id;
        vm.status = {
            name: ''
        };
        StatusService.getStatusById(statusId, function(data){
            if(data) {
                vm.status = {
                    name: data.name
                }
            } else {
                console.log('Status with id ' + statusId + ' not found!');
            }
        });
        vm.editStatus = function() {
            StatusService.editStatus(vm.status, statusId, function(success){
                if(success) {
                    $location.path('/status');
                } else {
                    console.log('STATUS EDIT FAILED');
                }
            });
        };
    }]);
    app.config(function ($routeProvider, $locationProvider, $httpProvider) {
        var PAGES = 'html/pages/';
        $routeProvider
            .when('/', {
                redirectTo: '/today'
            })
            .when('/today', {
                templateUrl: PAGES + 'today/today.html',
            })
            .when('/user', {
                templateUrl: PAGES + 'user/list.html',
            })
            .when('/user/create', {
                templateUrl: PAGES + 'user/create.html',
            })
            .when('/user/edit/:id', {
                templateUrl: PAGES + 'user/edit.html',
            })
            .when('/project', {
                templateUrl: PAGES + 'project/list.html',
            })
            .when('/project/create', {
                templateUrl: PAGES + 'project/create.html',
            })
            .when('/project/edit/:id', {
                templateUrl: PAGES + 'project/edit.html',
            })
            .when('/status', {
                templateUrl: PAGES + 'status/list.html',
            })
            .when('/status/create', {
                templateUrl: PAGES + 'status/create.html',
            })
            .when('/status/edit/:id', {
                templateUrl: PAGES + 'status/edit.html',
            })
            .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    });
})();
