(function () {
    'use strict';

    var app = angular.module('AdminSystem', ['ngResource', 'ngRoute', 'ngSanitize', 'ngToast']);
    app.factory('ResourceDao', ['$resource', function($resource) {
        return function(url, uriParams) {
            return new ResourceDao(url, uriParams, $resource);
        };
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
    }]);
    app.factory('httpErrorInterceptor', ['$q', '$window', function($q, $window) {
        var result = {};
        result.responseError = responseError;

        function responseError(rejection) {
            if (rejection.status === 500) {
                $window.location.href = '/error/unavailable';
            }
            return $q.reject(rejection);
        }
        return result;
    }]);
    app.factory('notAuthorizedInterceptor', ['$q', '$window', function($q, $window) {
        var result = {};
        result.responseError = responseError;

        function responseError(rejection) {
            if (rejection.status === 403) {
                $window.location.href = '/error/unauthorized';
            }
            return $q.reject(rejection);
        }
        return result;
    }]);
    app.service('TimeReportService', ['ResourceDao', function(ResourceDao) {
        var TimeReportService = this;
        var urlBase = '/api/timereport/';
        TimeReportService.createTimeReport = function (newReport, callback) {
            var data = new ResourceDao(urlBase + 'create');
            data.post(newReport).then(
                function(success) {
                    callback(true);
                },
                function(error){
                    callback(false);
                }
            );
        };
        TimeReportService.editTimeReport = function (editedReport, id, callback) {
            var data = new ResourceDao(urlBase + 'edit/' + id);
            data.post(editedReport).then(
                function(success) {
                    callback(true);
                },
                function(error){
                    callback(false);
                }
            );
        };
        TimeReportService.getTimeReportById = function (id, callback) {
            var data = new ResourceDao(urlBase + id);
            data.get().then(
                function(data) {
                    callback(data);
                },
                function(error){
                    callback(error);
                }
            );
        };
        TimeReportService.deleteTimeReport = function (id, callback) {
            var data = new ResourceDao(urlBase + 'delete/' + id);
            data.post().then(
                function(success) {
                    callback(true);
                },
                function(error){
                    callback(false);
                }
            );
        };
        TimeReportService.getAllTimeReports = function(callback) {
            var data = new ResourceDao(urlBase + 'list');
            data.list().then(
                function(data) {
                    callback(data);
                },
                function(error){
                    callback(error);
                }
            );
        };
        TimeReportService.getAllTimeReportsByDate = function(date, callback) {
            var data = new ResourceDao(urlBase + 'date/' + date);
            data.list().then(
                function(data) {
                    callback(data);
                },
                function(error){
                    callback(error);
                }
            );
        };
        TimeReportService.getAllTimeReportsByUserId = function(userId, callback) {
            var data = new ResourceDao(urlBase + 'user/' + userId);
            data.list().then(
                function(data) {
                    callback(data);
                },
                function(error){
                    callback(error);
                }
            );
        };
        TimeReportService.getAllTimeReportsByProjectId = function(projectId, callback) {
            var data = new ResourceDao(urlBase + 'project/' + projectId);
            data.list().then(
                function(data) {
                    callback(data);
                },
                function(error){
                    callback(error);
                }
            );
        };
    }]);
    app.service('StatusService',['ResourceDao', function(ResourceDao) {
        var StatusService = this;
        var urlBase = '/api/status/';
        StatusService.createStatus = function (newStatus, callback) {
            var data = new ResourceDao(urlBase + 'create');
            data.post(newStatus).then(
                function(success) {
                    callback(true);
                },
                function(error){
                    callback(false);
                }
            );
        };
        StatusService.editStatus = function (editedStatus, id, callback) {
            var data = new ResourceDao(urlBase + 'edit/' + id);
            data.post(editedStatus).then(
                function(success) {
                    callback(true);
                },
                function(error){
                    callback(false);
                }
            );
        };
        StatusService.getStatusById = function (id, callback) {
            var data = new ResourceDao(urlBase + id);
            data.get().then(
                function(data) {
                    callback(data);
                },
                function(error){
                    callback(error);
                }
            );
        };
        StatusService.deleteStatus = function (id, callback) {
            var data = new ResourceDao(urlBase + 'delete/' + id);
            data.post().then(
                function(success) {
                    callback(true);
                },
                function(error){
                    callback(false);
                }
            );
        };
        StatusService.getAllStatuses = function(callback) {
            var data = new ResourceDao(urlBase + 'list');
            data.list().then(
                function(data) {
                    callback(data);
                },
                function(error){
                    callback(error);
                }
            );
        };
    }]);
    app.service('ProjectService',['ResourceDao', function (ResourceDao) {
        var ProjectService = this;
        var urlBase = '/api/project/'
        ProjectService.createProject = function (newProject, callback) {
            var data = new ResourceDao(urlBase + 'create');
            data.post(newProject).then(
                function(success) {
                    callback(true);
                },
                function(error){
                    callback(false);
                }
            );
        };
        ProjectService.editProject = function (editedProject, id, callback) {
            var data = new ResourceDao(urlBase + 'edit/' + id);
            data.post(editedProject).then(
                function(success) {
                    callback(true);
                },
                function(error){
                    callback(false);
                }
            );
        };
        ProjectService.getProjectById = function (id, callback) {
            var data = new ResourceDao(urlBase + id);
            data.get().then(
                function(data) {
                    callback(data);
                },
                function(error){
                    callback(error);
                }
            );
        };
        ProjectService.deleteProject = function (id, callback) {
            var data = new ResourceDao(urlBase + 'delete/' + id);
            data.post().then(
                function(success) {
                    callback(true);
                },
                function(error){
                    callback(false);
                }
            );
        };
        ProjectService.getAllProjects = function(callback) {
            var data = new ResourceDao(urlBase + 'list');
            data.list().then(
                function(data) {
                    callback(data);
                },
                function(error){
                    callback(error);
                }
            );
        };
    }]);
    app.service('UserService',['ResourceDao', function (ResourceDao) {
        var UserService = this;
        var urlBase = '/api/user/';
        UserService.createUser = function (newUser, callback) {
            var data = new ResourceDao(urlBase + 'create');
            data.post(newUser).then(
                function(success) {
                    callback(true);
                },
                function(error){
                    callback(false);
                }
            );
        };
        UserService.editUser = function (editedUser, id, callback) {
            var data = new ResourceDao(urlBase + 'edit/' + id);
            data.post(editedUser).then(
                function(success) {
                    callback(true);
                },
                function(error){
                    callback(false);
                }
            );
        };
        UserService.getUserById = function (id, callback) {
            var data = new ResourceDao(urlBase + id);
            data.get().then(
                function(data) {
                    callback(data);
                },
                function(error){
                    callback(error);
                }
            );
        };
        UserService.deleteUser = function (id, callback) {
            var data = new ResourceDao(urlBase + 'delete/' + id);
            data.post().then(
                function(success) {
                    callback(true);
                },
                function(error){
                    callback(false);
                }
            );
        };
        UserService.getAllUsers = function(callback) {
            var data = new ResourceDao(urlBase + 'list');
            data.list().then(
                function(data) {
                    callback(data);
                },
                function(error){
                    callback(error);
                }
            );
        };
    }]);
    app.controller('NavigationController', function () {

    });
    app.controller('TodayController',['TimeReportService', function (TimeReportService) {
        var vm = this;
        vm.selectedDate = new Date();
        vm.timeReportTableConfig = {
            headers: ['Id', 'Alkalmazott', 'Munka', 'Óraszám', 'Megjegyzés', 'Műveletek'],
            data: null
        };
        vm.loadData = function () {
            var formattedDate = vm.selectedDate.toISOString().substring(0, 10).replace(/-/g,'');
            console.log(formattedDate);
            TimeReportService.getAllTimeReportsByDate(formattedDate, function(data){
                vm.timeReportTableConfig.data = data;
            });
        }
        vm.loadData();
    }]);
    app.controller('UserListController', ['UserService', 'ngToast', function (UserService, ngToast) {
        var vm = this;
        vm.searchField = '';
        vm.tableConfig = {
            headers: ['Id', 'Név', 'Órabér', 'Megjegyzés', 'Műveletek'],
            data: null
        };
        function loadList() {
            UserService.getAllUsers(function(data){
                vm.tableConfig.data = data;
            });
        }
        vm.deleteUser = function (id) {
            UserService.deleteUser(id, function(success){
                if(success) {
                    ngToast.success({
                        content: 'Sikeres törlés!',
                        animation: 'fade'
                    });
                    loadList();
                } else {
                    console.log('DELETE FAILED');
                }
            })
        };
        loadList();
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
    app.controller('ProjectListController', ['ProjectService', 'ngToast', function (ProjectService, ngToast) {
        var vm = this;
        vm.searchField = '';
        vm.tableConfig = {
            headers: ['Id', 'Név', 'Visszatartás', 'Megjegyzés', 'Műveletek'],
            data: null
        };
        function loadList() {
            ProjectService.getAllProjects(function(data){
                vm.tableConfig.data = data;
            });
        }
        vm.deleteProject = function (id) {
            ProjectService.deleteProject(id, function(success){
                if(success) {
                    ngToast.success({
                        content: 'Sikeres törlés!',
                        animation: 'fade'
                    });
                    loadList();
                } else {
                    console.log('DELETE FAILED');
                }
            })
        };
        loadList();
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
    app.controller('StatusListController', ['StatusService', 'ngToast', function (StatusService, ngToast) {
        var vm = this;
        vm.searchField = '';
        vm.tableConfig = {
            headers: ['Id', 'Név', 'Műveletek'],
            data: null
        };
        function loadList() {
            StatusService.getAllStatuses(function(data){
                vm.tableConfig.data = data;
            });
        }
        vm.deleteStatus = function (id) {
            StatusService.deleteStatus(id, function(success){
                if(success) {
                    ngToast.success({
                        content: 'Sikeres törlés!',
                        animation: 'fade'
                    });
                    loadList();
                } else {
                    ngToast.danger({
                        content: 'Sikertelen törlés!',
                        animation: 'fade'
                    });
                }
            })
        };
        loadList();
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
    app.controller('StatusEditController', ['$routeParams', '$location', 'StatusService', 'ngToast' , function ($routeParams, $location, StatusService, ngToast) {
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
                    ngToast.success({
                        content: 'Sikeres módosítás!'
                    });
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
