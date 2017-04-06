(function () {
    'use strict';

    var app = angular.module('AdminSystem', ['ngResource', 'ngRoute', 'ngSanitize', 'ngToast', 'ngAnimate', 'ui.bootstrap', 'ui.select']);
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
    app.service('BalanceService', ['ResourceDao', function (ResourceDao) {
        var BalanceService = this;
        var urlBase = '/api/balance/';
        BalanceService.createBalance = function (newBalance, callback) {
            var data = new ResourceDao(urlBase + 'create');
            data.post(newBalance).then(
                function(success) {
                    callback(true);
                },
                function(error){
                    callback(false);
                }
            );
        };
        BalanceService.editBalance = function (editedBalance, id, callback) {
            var data = new ResourceDao(urlBase + 'edit/' + id);
            data.post(editedBalance).then(
                function(success) {
                    callback(true);
                },
                function(error){
                    callback(false);
                }
            );
        };
        BalanceService.getBalanceById = function (id, type, callback) {
            var data = new ResourceDao(urlBase + type + '/' + id);
            data.get().then(
                function(data) {
                    callback(data);
                },
                function(error){
                    callback(error);
                }
            );
        };
        BalanceService.deleteBalance = function (id, type, callback) {
            var data = new ResourceDao(urlBase + 'delete/' + type + '/' + id);
            data.post().then(
                function(success) {
                    callback(true);
                },
                function(error){
                    callback(false);
                }
            );
        };
        BalanceService.getAllBalances = function(callback) {
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
        BalanceService.getAllBalancesByType = function(type, callback) {
            var data = new ResourceDao(urlBase + 'list/' + type);
            data.list().then(
                function(data) {
                    callback(data);
                },
                function(error){
                    callback(error);
                }
            );
        };
        BalanceService.getAllCompletedBalancesByDate = function(date, callback) {
            var data = new ResourceDao(urlBase + 'list/date/' + date);
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
    app.controller('TodayController',['$scope', 'TimeReportService', 'BalanceService', '$uibModal', 'ngToast', function ($scope, TimeReportService, BalanceService, $uibModal, ngToast) {
        var vm = this;
        vm.selectedDate = new Date();
        vm.datepicker = {
            opened: false,
            options: {
                startingDay: 1
            }
        };
        vm.openDatePicker = function() {
            vm.datepicker.opened = true;
        };
        vm.openNewReport = function() {
            var modal = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'html/components/report-modal.html',
                controller: 'NewReportModalController',
                controllerAs: 'ctrl',
                size: 'lg',
            });
            modal.result.then(function (newReport) {
                newReport.created = vm.selectedDate.toISOString().substring(0, 10);
                TimeReportService.createTimeReport(newReport, function(success) {
                    if(success) {
                        ngToast.success({
                            content: 'Sikeres mentés!',
                            animation: 'fade'
                        });
                        vm.loadData();
                    } else {
                        ngToast.danger({
                            content: 'Sikertelen mentés!',
                            animation: 'fade'
                        });
                    }
                })
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };
        vm.openNewBalance = function() {
            var modal = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'html/components/balance-modal.html',
                controller: 'NewBalanceModalController',
                controllerAs: 'ctrl',
                size: 'lg',
            });
            modal.result.then(function (newBalance) {
                BalanceService.createBalance(newBalance, function(success) {
                    if(success) {
                        ngToast.success({
                            content: 'Sikeres mentés!',
                            animation: 'fade'
                        });
                        vm.loadData();
                    } else {
                        ngToast.danger({
                            content: 'Sikertelen mentés!',
                            animation: 'fade'
                        });
                    }
                })
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };
        vm.openEditReport = function(report) {
            var modal = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'html/components/report-modal.html',
                controller: 'EditReportModalController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    report: function () {
                        return report;
                    }
                }
            });
            modal.result.then(function (editedReport) {
                editedReport.created = vm.selectedDate.toISOString().substring(0, 10);
                TimeReportService.editTimeReport(editedReport, editedReport.id, function(success) {
                    if(success) {
                        ngToast.success({
                            content: 'Sikeres mentés!',
                            animation: 'fade'
                        });
                        vm.loadData();
                    } else {
                        ngToast.danger({
                            content: 'Sikertelen mentés!',
                            animation: 'fade'
                        });
                    }
                })
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };
        vm.openEditBalance = function(balance) {

        };
        vm.deleteTimeReport = function (reportId) {
            TimeReportService.deleteTimeReport(reportId, function(success){
                if(success) {
                    ngToast.success({
                        content: 'Sikeres törlés!',
                        animation: 'fade'
                    });
                    loadTimeReportTable();
                } else {
                    ngToast.danger({
                        content: 'Sikertelen törlés!',
                        animation: 'fade'
                    });
                }
            });
        };
        vm.deleteBalance = function(balance) {
            BalanceService.deleteBalance(balance.id, balance.balanceType, function(success){
                if(success) {
                    ngToast.success({
                        content: 'Sikeres törlés!',
                        animation: 'fade'
                    });
                    loadBalanceTable();
                } else {
                    ngToast.danger({
                        content: 'Sikertelen törlés!',
                        animation: 'fade'
                    });
                }
            });
        };
        vm.timeReportTableConfig = {
            headers: ['Id', 'Alkalmazott', 'Munka', 'Óraszám', 'Megjegyzés', 'Műveletek'],
            data: null
        };
        vm.balanceTableConfig = {
            headers: ['Nettó', 'Bruttó', 'Áfa', 'Áfa értéke', 'Dátum', 'Teljesítés', 'Jelleg', 'Kapcsolat', 'KP', 'Megjegyzés', 'Műveletek'],
            data: null
        };
        function getFormattedDate() {
            return vm.selectedDate.toISOString().substring(0, 10).replace(/-/g,'');
        }
        function loadTimeReportTable() {
            TimeReportService.getAllTimeReportsByDate(getFormattedDate(), function(data) {
                vm.timeReportTableConfig.data = data;
            });
        }
        function loadBalanceTable() {
            BalanceService.getAllCompletedBalancesByDate(getFormattedDate(), function(data) {
                vm.balanceTableConfig.data = data;
            });
        }
        vm.loadData = function () {
            loadTimeReportTable();
            loadBalanceTable();
        };
        $scope.$watch(function() {
            return vm.selectedDate;
        }, function(current, original) {
            vm.loadData();
        });
        vm.loadData();
    }]);
    app.controller('NewReportModalController', ['$uibModalInstance', 'UserService', 'ProjectService', function($uibModalInstance, UserService, ProjectService){
        var vm = this;
        vm.title = 'Új hozzáadása';
        vm.users = [];
        vm.projects = [];
        UserService.getAllUsers(function(data){
            vm.users = data;
        });
        ProjectService.getAllProjects(function(data){
            vm.projects = data;
        });
        vm.form = {
            user: null,
            project: null,
            hour: 0.0,
            note: ''
        };
        vm.ok = function() {
            var newReport = {
                userId: vm.form.user.id,
                projectId: vm.form.project.id,
                hour: vm.form.hour,
                note: vm.form.note,
            };
            $uibModalInstance.close(newReport);
        };
        vm.cancel = function() {
            $uibModalInstance.dismiss();
        };
    }]);
    app.controller('EditReportModalController', function($uibModalInstance, UserService, ProjectService, report){
        var vm = this;
        vm.title = 'Szerkesztés';
        vm.users = [];
        vm.projects = [];
        vm.form = {};
        UserService.getAllUsers(function(data){
            vm.users = data;
            ProjectService.getAllProjects(function(data){
                vm.projects = data;
                vm.form = {
                    user: report.user,
                    project: report.project,
                    hour: report.hour,
                    note: report.note
                };
            });
        });
        vm.ok = function() {
            var editedReport = {
                id: report.id,
                userId: vm.form.user.id,
                projectId: vm.form.project.id,
                hour: vm.form.hour,
                note: vm.form.note,
            };
            $uibModalInstance.close(editedReport);
        };
        vm.cancel = function() {
            $uibModalInstance.dismiss();
        };
    });
    app.controller('NewBalanceModalController', ['$uibModalInstance', 'UserService', 'ProjectService', 'StatusService', function($uibModalInstance, UserService, ProjectService, StatusService){
        var vm = this;
        vm.title = 'Új hozzáadása';
        vm.balanceTypes = [
            { type: 'project', name: 'Munka' },
            { type: 'user', name: 'Alkalmazott' },
            { type: 'other', name: 'Egyéb' }
        ];
        vm.statuses = [];
        vm.users = [];
        vm.projects = [];
        UserService.getAllUsers(function(data){
            vm.users = data;
        });
        ProjectService.getAllProjects(function(data){
            vm.projects = data;
        });
        StatusService.getAllStatuses(function(data){
            vm.statuses = data;
            vm.form = vm.statuses[0];
        });
        vm.form = {
            net: 0,
            gross: 0,
            vat: 0,
            vatValue: 0,
            created: null,
            completed: null,
            status: null,
            user: null,
            project: null,
            balanceType: vm.balanceTypes[0],
            cash: true,
            note: ''
        };
        vm.ok = function() {
            var newBalance = {
                net: vm.form.net,
                gross: vm.form.gross,
                vat: vm.form.vat,
                vatValue: vm.form.vatValue,
                created: vm.form.created,
                completed: vm.form.completed,
                status: vm.form.status.id,
                balanceType: vm.form.balanceType.type,
                userId: (vm.form.user !== null) ? vm.form.user.id : null,
                projectId: (vm.form.project !== null) ? vm.form.project.id : null,
                cash: vm.form.cash,
                note: vm.form.note
            };
            $uibModalInstance.close(newBalance);
        };
        vm.cancel = function() {
            $uibModalInstance.dismiss();
        };
    }]);
    app.controller('OpenItemsController', ['BalanceService', function(BalanceService) {
        var vm = this;
        vm.searchField = '';
        vm.tableConfig = {
            headers: ['Id', 'Nettó', 'Bruttó', 'Áfa', 'Áfa értéke', 'Dátum', 'Teljesítés', 'Jelleg', 'Kapcsolat', 'Készpénzes', 'Megjegyzés', 'Műveletek'],
            data: null
        };
        function loadList() {
            BalanceService.getAllBalances(function(data){
                vm.tableConfig.data = data;
            });
        }
        loadList();
    }]);
    app.controller('UserListController', ['UserService', 'ngToast', function (UserService, ngToast) {
        var vm = this;
        vm.tableConfig = {
            headers: [
                { name: 'Id', prop: 'id'},
                { name: 'Név', prop: 'name'},
                { name: 'Órabér', prop: 'wage'},
                { name: 'Megjegyzés', prop: 'note'},
                { name: 'Műveletek', prop: null}],
            sorting: {
                type: 'name',
                reverse: false,
            },
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
                    ngToast.danger({
                        content: 'Sikertelen törlés!',
                        animation: 'fade'
                    });
                }
            });
        };
        loadList();
    }]);
    app.controller('UserCreateController', ['$location', 'UserService', 'ngToast', function ($location, UserService, ngToast) {
        var vm = this;
        vm.user = {
            name: '',
            wage: 0,
            note: ''
        };
        vm.createUser = function () {
            UserService.createUser(vm.user, function(success) {
                if(success) {
                    ngToast.success({
                        content: 'Mentés sikeres!',
                        animation: 'fade'
                    });
                    $location.path('/user');
                } else {
                    ngToast.danger({
                        content: 'Mentés sikertelen!',
                        animation: 'fade'
                    });
                }
            })
        };
    }]);
    app.controller('UserEditController', ['$routeParams', '$location', 'UserService', 'ngToast', function ($routeParams, $location, UserService, ngToast) {
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
                ngToast.danger({
                    content: 'Valami hiba történt!',
                    animation: 'fade'
                });
            }
        });
        vm.editUser = function() {
            UserService.editUser(vm.user, userId, function(success){
                if(success) {
                    ngToast.danger({
                        content: 'Sikeres szerkesztés!',
                        animation: 'fade'
                    });
                    $location.path('/user');
                } else {
                    ngToast.danger({
                        content: 'Sikertelen szerkesztés!',
                        animation: 'fade'
                    });
                }
            });
        };
    }]);
    app.controller('ProjectListController', ['ProjectService', 'ngToast', function (ProjectService, ngToast) {
        var vm = this;
        vm.tableConfig = {
            headers: [
                { name: 'Id', prop: 'id'},
                { name: 'Név', prop: 'name'},
                { name: 'Visszatartás', prop: 'retention'},
                { name: 'Megjegyzés', prop: 'note'},
                { name: 'Műveletek', prop: null}],
            sorting: {
                type: 'name',
                reverse: false,
            },
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
                    ngToast.danger({
                        content: 'Sikertelen törlés!',
                        animation: 'fade'
                    });
                }
            })
        };
        loadList();
    }]);
    app.controller('ProjectCreateController', ['$location', 'ProjectService', 'ngToast', function ($location, ProjectService, ngToast) {
        var vm = this;
        vm.project = {
            name: '',
            retention: 0,
            note: ''
        };
        vm.createProject = function () {
            ProjectService.createProject(vm.project, function(success) {
                if(success) {
                    ngToast.success({
                        content: 'Sikeres mentés!',
                        animation: 'fade'
                    });
                    $location.path('/project');
                } else {
                    ngToast.danger({
                        content: 'Sikertelen mentés!',
                        animation: 'fade'
                    });
                }
            })
        };
    }]);
    app.controller('ProjectEditController', ['$routeParams', '$location', 'ProjectService', 'ngToast', function ($routeParams, $location, ProjectService, ngToast) {
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
                ngToast.danger({
                    content: 'Valami hiba történt!',
                    animation: 'fade'
                });
            }
        });
        vm.editProject = function() {
            ProjectService.editProject(vm.project, projectId, function(success){
                if(success) {
                    ngToast.success({
                        content: 'Sikeres szerkesztés!',
                        animation: 'fade'
                    });
                    $location.path('/project');
                } else {
                    ngToast.danger({
                        content: 'Sikertelen Szerkesztés!',
                        animation: 'fade'
                    });
                }
            });
        };
    }]);
    app.controller('StatusListController', ['StatusService', 'ngToast', function (StatusService, ngToast) {
        var vm = this;
        vm.tableConfig = {
            headers: [
                { name: 'Id', prop: 'id'},
                { name: 'Név', prop: 'name'},
                { name: 'Műveletek', prop: null}],
            sorting: {
                type: 'name',
                reverse: false,
            },
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
    app.controller('StatusCreateController', ['$location', 'StatusService', 'ngToast', function ($location, StatusService, ngToast) {
        var vm = this;
        vm.status = {
            name: ''
        };
        vm.createStatus = function () {
            StatusService.createStatus(vm.status, function(success) {
                if(success) {
                    ngToast.success({
                        content: 'Sikeres mentés!',
                        animation: 'fade'
                    });
                    $location.path('/status');
                } else {
                    ngToast.danger({
                        content: 'Sikertelen mentés!',
                        animation: 'fade'
                    });
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
                ngToast.danger({
                    content: 'Valami hiba történt!',
                    animation: 'fade'
                });
            }
        });
        vm.editStatus = function() {
            StatusService.editStatus(vm.status, statusId, function(success){
                if(success) {
                    ngToast.success({
                        content: 'Sikeres szerkesztés!'
                    });
                    $location.path('/status');
                } else {
                    ngToast.danger({
                        content: 'Sikertelen szerkesztés!'
                    });
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
            .when('/openitems', {
                templateUrl: PAGES + 'balance/openitems.html',
            })
            .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    });
})();
