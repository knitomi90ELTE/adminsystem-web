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
                function() {
                    callback(true);
                },
                function(){
                    callback(false);
                }
            );
        };
        BalanceService.editBalance = function (editedBalance, id, callback) {
            var data = new ResourceDao(urlBase + 'edit/' + id);
            data.post(editedBalance).then(
                function() {
                    callback(true);
                },
                function(){
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
                function() {
                    callback(true);
                },
                function(){
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
        BalanceService.doPayment = function (params, callback) {
            var data = new ResourceDao(urlBase + 'pay');
            data.post(params).then(
                function() {
                    callback(true);
                },
                function(){
                    callback(false);
                }
            );
        };
        BalanceService.getAllBalanceByUserId = function(userId, callback) {
            var data = new ResourceDao(urlBase + 'list/user/' + userId);
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
                function() {
                    callback(true);
                },
                function(){
                    callback(false);
                }
            );
        };
        TimeReportService.editTimeReport = function (editedReport, id, callback) {
            var data = new ResourceDao(urlBase + 'edit/' + id);
            data.post(editedReport).then(
                function() {
                    callback(true);
                },
                function(){
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
                function() {
                    callback(true);
                },
                function(){
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
                function() {
                    callback(true);
                },
                function(){
                    callback(false);
                }
            );
        };
        StatusService.editStatus = function (editedStatus, id, callback) {
            var data = new ResourceDao(urlBase + 'edit/' + id);
            data.post(editedStatus).then(
                function() {
                    callback(true);
                },
                function(){
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
                function() {
                    callback(true);
                },
                function(){
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
        var urlBase = '/api/project/';
        ProjectService.createProject = function (newProject, callback) {
            var data = new ResourceDao(urlBase + 'create');
            data.post(newProject).then(
                function() {
                    callback(true);
                },
                function(){
                    callback(false);
                }
            );
        };
        ProjectService.editProject = function (editedProject, id, callback) {
            var data = new ResourceDao(urlBase + 'edit/' + id);
            data.post(editedProject).then(
                function() {
                    callback(true);
                },
                function(){
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
                function() {
                    callback(true);
                },
                function(){
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
                function() {
                    callback(true);
                },
                function(){
                    callback(false);
                }
            );
        };
        UserService.editUser = function (editedUser, id, callback) {
            var data = new ResourceDao(urlBase + 'edit/' + id);
            data.post(editedUser).then(
                function() {
                    callback(true);
                },
                function(){
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
                function() {
                    callback(true);
                },
                function(){
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
    app.controller('TodayController', ['$scope', '$filter', 'TimeReportService', 'BalanceService', '$uibModal', 'ngToast', function ($scope, $filter, TimeReportService, BalanceService, $uibModal, ngToast) {
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
        vm.nextDay = function () {
            vm.selectedDate = new Date(vm.selectedDate.getFullYear(), vm.selectedDate.getMonth(), vm.selectedDate.getDate() + 1);
        };
        vm.previousDay = function () {
            vm.selectedDate = new Date(vm.selectedDate.getFullYear(), vm.selectedDate.getMonth(), vm.selectedDate.getDate() - 1);
        };
        vm.openNewReport = function() {
            var modal = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'html/components/report-modal.html',
                controller: 'NewReportModalController',
                controllerAs: 'ctrl',
                size: 'lg'
            });
            modal.result.then(function (newReport) {
                newReport.created = $filter('date')(vm.selectedDate, 'yyyy-MM-dd');
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
                resolve: {
                    currentDate: function () {
                        return vm.selectedDate;
                    }
                }
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
                editedReport.created = $filter('date')(editedReport.created, 'yyyy-MM-dd');
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
            var modal = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'html/components/balance-modal.html',
                controller: 'EditBalanceModalController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    balance: function () {
                        return balance;
                    }
                }
            });
            modal.result.then(function (editedBalance) {
                BalanceService.editBalance(editedBalance, editedBalance.id, function(success) {
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
            return $filter('date')(vm.selectedDate, 'yyyyMMdd') + '';
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
            if(current !== /** @type {boolean} */ original) {
                vm.loadData();
            }
        });
        vm.loadData();
    }]);
    app.controller('NewReportModalController', function($uibModalInstance, UserService, ProjectService){
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
                note: vm.form.note
            };
            $uibModalInstance.close(newReport);
        };
        vm.cancel = function() {
            $uibModalInstance.dismiss();
        };
    });
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
                created: report.created
            };
            $uibModalInstance.close(editedReport);
        };
        vm.cancel = function() {
            $uibModalInstance.dismiss();
        };
    });
    app.controller('NewBalanceModalController', function($scope, $filter, $uibModalInstance, UserService, ProjectService, StatusService, currentDate){
        var vm = this;
        vm.title = 'Új hozzáadása';
        vm.datepicker = {
            created: {
                opened: false
            },
            completed: {
                opened: false
            },
            options: {
                startingDay: 1
            }
        };
        vm.openCreatedPicker = function() {
            vm.datepicker.created.opened = true;
        };
        vm.openCompletedPicker = function() {
            vm.datepicker.completed.opened = true;
        };
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
            vm.form.status = vm.statuses[0];
        });
        function buildDate(date) {
            return $filter('date')(date, 'yyyy-MM-dd');
        }
        vm.form = {
            net: null,
            gross: null,
            vat: 0,
            vatValue: 0,
            created: currentDate,
            completed: null,
            status: null,
            user: null,
            project: null,
            balanceType: vm.balanceTypes[0],
            cash: true,
            note: ''
        };

        $scope.$watch(function() {
            return vm.form.net;
        }, function () {
            if($('#gross').is(':focus') || vm.form.net === null) {
                return;
            }
            vm.form.gross = parseInt(vm.form.net * (1 + (vm.form.vat / 100)), 10);
            vm.form.vatValue = parseInt(vm.form.gross - vm.form.net, 10);
        });

        $scope.$watch(function() {
            return vm.form.gross;
        }, function () {
            if($('#net').is(':focus') || vm.form.gross === null) {
                return;
            }
            vm.form.net = parseInt(vm.form.gross / (1 + (vm.form.vat / 100)), 10);
            vm.form.vatValue = parseInt(vm.form.gross - vm.form.net, 10);
        });

        vm.ok = function() {
            var newBalance = {
                net: vm.form.net,
                gross: vm.form.gross,
                vat: vm.form.vat,
                vatValue: vm.form.vatValue,
                created: buildDate(vm.form.created),
                completed: vm.form.completed,
                statusId: vm.form.status.id,
                balanceType: vm.form.balanceType.type,
                userId: (vm.form.user !== null) ? vm.form.user.id : null,
                projectId: (vm.form.project !== null) ? vm.form.project.id : null,
                cash: vm.form.cash,
                note: vm.form.note
            };
            if(newBalance.completed !== null) {
                newBalance.completed = buildDate(newBalance.completed);
            }
            $uibModalInstance.close(newBalance);
        };
        vm.cancel = function() {
            $uibModalInstance.dismiss();
        };
    });
    app.controller('EditBalanceModalController', function ($scope, $filter, $uibModalInstance, UserService, ProjectService, StatusService, balance) {
        var vm = this;
        vm.title = 'Szerkesztés';
        vm.datepicker = {
            created: {
                opened: false
            },
            completed: {
                opened: false
            },
            options: {
                startingDay: 1
            }
        };
        vm.openCreatedPicker = function() {
            vm.datepicker.created.opened = true;
        };
        vm.openCompletedPicker = function() {
            vm.datepicker.completed.opened = true;
        };
        vm.balanceTypes = [
            { type: 'project', name: 'Munka' },
            { type: 'user', name: 'Alkalmazott' },
            { type: 'other', name: 'Egyéb' }
        ];
        vm.statuses = [];
        vm.users = [];
        vm.projects = [];
        vm.form = {};
        UserService.getAllUsers(function(userData){
            vm.users = userData;
            ProjectService.getAllProjects(function(projectData){
                vm.projects = projectData;
                StatusService.getAllStatuses(function(statusData){
                    vm.statuses = statusData;
                    vm.form.status = vm.statuses[0];
                    setupFormData();
                });
            });
        });
        function setupFormData() {
            vm.form = {
                net: balance.net,
                gross: balance.gross,
                vat: balance.vat,
                vatValue: balance.vatValue,
                created: new Date(balance.created),
                completed: new Date(balance.completed),
                status: balance.status,
                user: balance.user,
                project: balance.project,
                balanceType: $filter('filter')(vm.balanceTypes, {type: balance.balanceType})[0],
                cash: balance.cash,
                note: balance.note
            };
        }
        function buildDate(date) {
            return $filter('date')(date, 'yyyy-MM-dd');
        }
        $scope.$watch(function() {
            return vm.form.net;
        }, function () {
            if($('#gross').is(':focus') || vm.form.net === null) {
                return;
            }
            vm.form.gross = parseInt(vm.form.net * (1 + (vm.form.vat / 100)), 10);
            vm.form.vatValue = parseInt(vm.form.gross - vm.form.net, 10);
        });

        $scope.$watch(function() {
            return vm.form.gross;
        }, function () {
            if($('#net').is(':focus') || vm.form.gross === null) {
                return;
            }
            vm.form.net = parseInt(vm.form.gross / (1 + (vm.form.vat / 100)), 10);
            vm.form.vatValue = parseInt(vm.form.gross - vm.form.net, 10);
        });

        vm.ok = function() {
            var editedBalance = {
                id: balance.id,
                net: vm.form.net,
                gross: vm.form.gross,
                vat: vm.form.vat,
                vatValue: vm.form.vatValue,
                created: buildDate(vm.form.created),
                completed: buildDate(vm.form.completed),
                statusId: vm.form.status.id,
                balanceType: vm.form.balanceType.type,
                userId: (vm.form.user !== null) ? vm.form.user.id : null,
                projectId: (vm.form.project !== null) ? vm.form.project.id : null,
                cash: vm.form.cash,
                note: vm.form.note
            };
            if(editedBalance.completed !== null) {
                editedBalance.completed = buildDate(editedBalance.completed);
            }
            $uibModalInstance.close(editedBalance);
        };
        vm.cancel = function() {
            $uibModalInstance.dismiss();
        };
    });
    app.controller('OpenItemsController', ['$filter', 'BalanceService', 'ngToast', function($filter, BalanceService, ngToast) {
        var vm = this;
        vm.searchField = '';
        vm.tableConfig = {
            headers: [
                { name: 'Id', prop: 'id'},
                { name: 'Nettó', prop: 'net'},
                { name: 'Bruttó', prop: 'gross'},
                { name: 'Áfa', prop: 'vat'},
                { name: 'Áfa értéke', prop: 'vatValue'},
                { name: 'Dátum', prop: 'created'},
                { name: 'Teljesítés', prop: 'completed'},
                { name: 'Jelleg', prop: null},
                { name: 'Kapcsolat', prop: null},
                { name: 'Készpénzes', prop: 'cash'},
                { name: 'Megjegyzés', prop: 'note'},
                { name: 'Műveletek', prop: null}],
            sorting: {
                type: 'id',
                reverse: false
            },
            data: null
        };

        vm.doPayment = function(balance) {
            var params = {
                id: balance.id,
                balanceType: balance.balanceType,
                completionDate: $filter('date')(new Date(), 'yyyy-MM-dd')
            };
            BalanceService.doPayment(params, function(success) {
                if(success) {
                    ngToast.success({
                        content: 'Sikeres teljesítés!',
                        animation: 'fade'
                    });
                    loadList();
                } else {
                    ngToast.danger({
                        content: 'Sikertelen teljesítés!',
                        animation: 'fade'
                    });
                }
            });
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
                reverse: false
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
    app.controller('UserEditController', ['$scope', '$routeParams', '$location', '$timeout', 'UserService', 'TimeReportService', 'BalanceService', 'ngToast',
        function ($scope, $routeParams, $location, $timeout, UserService, TimeReportService, BalanceService, ngToast) {
            var vm = this;
            var DATE_FORMAT = 'YYYY-MM-DD';
            $scope.start = moment().subtract(29, 'days');
            $scope.end = moment();
            vm.availProjects = [];
            vm.availStatuses = [];
            vm.availFilter = {
                project: null,
                status: null
            };
            function cb(start, end) {
                $timeout(function(){
                    $scope.start = start;
                    $scope.end = end;
                    $('#timerange span').html(start.format(DATE_FORMAT) + ' - ' + end.format(DATE_FORMAT));
                });
            }
            $('#timerange').daterangepicker({
                startDate: $scope.start,
                endDate: $scope.end,
                opens: 'center',
                ranges: {
                    'Ma': [moment(), moment()],
                    '7 nap': [moment().subtract(6, 'days'), moment()],
                    '30 nap': [moment().subtract(29, 'days'), moment()],
                    'Hónap': [moment().startOf('month'), moment().endOf('month')],
                    'Előző hónap': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            }, cb);
            var userId = $routeParams.id;
            vm.user = {
                name: '',
                wage: 0,
                note: ''
            };
            vm.timeReportTableConfig = {
                headers: ['Dátum', 'Óraszám', 'Munka', 'Megjegyzés'],
                data: []
            };
            vm.userBalanceTableConfig = {
                headers: ['Dátum', 'Összeg', 'Kategória', 'Megjegyzés'],
                data: []
            };
            vm.dateFilter = function(data) {
                return moment(data.created, DATE_FORMAT).isBetween($scope.start, $scope.end);
            };
            vm.getHoursSum = function() {
                return vm.timeReportTableConfig.data.filter(vm.dateFilter).map(function (report) {
                    return report.hour;
                }).reduce(add, 0);
            };
            vm.getBalanceSum = function() {
                return vm.userBalanceTableConfig.data.filter(vm.dateFilter).map(function (balance) {
                    return balance.net;
                }).reduce(add, 0);
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
            TimeReportService.getAllTimeReportsByUserId(userId, function(data){
                if(data) {
                    vm.timeReportTableConfig.data = data;
                    vm.availProjects = _.uniqBy(data.map(function (report) {
                        return report.project;
                    }), 'id');
                } else {
                    ngToast.danger({
                        content: 'Valami hiba történt!',
                        animation: 'fade'
                    });
                }
            });
            BalanceService.getAllBalanceByUserId(userId, function(data){
                if(data) {
                    vm.userBalanceTableConfig.data = data;
                    vm.availStatuses = _.uniqBy(data.map(function (balance) {
                        return balance.status;
                    }), 'id');
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
            function add(a, b) {
                return a + b;
            }
            cb($scope.start, $scope.end);
        }
    ]);
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
                reverse: false
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
                { name: 'Bevétel', prop: 'isIncome'},
                { name: 'Műveletek', prop: null}],
            sorting: {
                type: 'name',
                reverse: false
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
            name: '',
            isIncome: false
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
            name: '',
            isIncome: false
        };
        StatusService.getStatusById(statusId, function(data){
            if(data) {
                vm.status = {
                    name: data.name,
                    isIncome: data.isIncome
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
                templateUrl: PAGES + 'today/today.html'
            })
            .when('/user', {
                templateUrl: PAGES + 'user/list.html'
            })
            .when('/user/create', {
                templateUrl: PAGES + 'user/create.html'
            })
            .when('/user/edit/:id', {
                templateUrl: PAGES + 'user/edit.html'
            })
            .when('/project', {
                templateUrl: PAGES + 'project/list.html'
            })
            .when('/project/create', {
                templateUrl: PAGES + 'project/create.html'
            })
            .when('/project/edit/:id', {
                templateUrl: PAGES + 'project/edit.html'
            })
            .when('/status', {
                templateUrl: PAGES + 'status/list.html'
            })
            .when('/status/create', {
                templateUrl: PAGES + 'status/create.html'
            })
            .when('/status/edit/:id', {
                templateUrl: PAGES + 'status/edit.html'
            })
            .when('/openitems', {
                templateUrl: PAGES + 'balance/openitems.html'
            })
            .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    });
})();
