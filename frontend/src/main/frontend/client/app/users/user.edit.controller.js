(function () {
    'use strict';

    angular
        .module('app.user')
        .controller('UserEditController', UserEditController);

    UserEditController.$inject = ['$scope', '$routeParams', '$location', '$timeout', 'UserService', 'TimeReportService', 'BalanceService'];

    function UserEditController($scope, $routeParams, $location, $timeout, UserService, TimeReportService, BalanceService) {
        var vm = this;
        var userId = $routeParams.id;
        vm.user = {
            name: '',
            wage: 0,
            note: ''
        };
        var DATE_FORMAT = 'YYYY-MM-DD';

        $scope.start = moment().subtract(29, 'days');
        $scope.end = moment();

        vm.availProjects = [];
        vm.availStatuses = [];

        $scope.availFilter = {
            project: null,
            status: null
        };

        vm.dateFilter = dateFilter;
        vm.projectFilter = projectFilter;
        vm.getHoursSum = getHoursSum;
        vm.getBalanceSum = getBalanceSum;

        vm.editUser = editUser;
        function datePickerCallback(start, end) {
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
        }, datePickerCallback);

        vm.timeReportTableConfig = {
            headers: ['Dátum', 'Óraszám', 'Munka', 'Megjegyzés'],
            data: []
        };
        vm.userBalanceTableConfig = {
            headers: ['Dátum', 'Összeg', 'Kategória', 'Megjegyzés'],
            data: []
        };

        function dateFilter(data) {
            return moment(data.created, DATE_FORMAT).isBetween($scope.start, $scope.end);
        }

        function projectFilter(data) {
            if($scope.availFilter.project !== null) {
                return data.project.id === $scope.availFilter.project.id;
            }
            return true;
        }

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

        function getHoursSum() {
            return vm.timeReportTableConfig.data.filter(vm.dateFilter).map(function (report) {
                return report.hour;
            }).reduce(add, 0);
        }

        function getBalanceSum() {
            return vm.userBalanceTableConfig.data.filter(vm.dateFilter).map(function (balance) {
                return balance.net;
            }).reduce(add, 0);
        }

        function editUser() {
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
        }
        function add(a, b) {
            return a + b;
        }

        $scope.$watch('availFilter.project', function(current, original){
            $scope.$apply();
        });

        datePickerCallback($scope.start, $scope.end);
    }
})();