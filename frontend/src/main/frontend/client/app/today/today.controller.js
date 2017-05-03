(function () {
    'use strict';

    angular
        .module('app.today')
        .controller('TodayController', TodayController);

    TodayController.$inject = ['$scope', '$filter', 'TimeReportService', 'BalanceService', '$uibModal'];

    function TodayController($scope, $filter, TimeReportService, BalanceService, $uibModal) {
        var vm = this;
        vm.selectedDate = new Date();
        vm.datepicker = {
            opened: false,
            options: {
                startingDay: 1
            }
        };

        vm.timeReportTableConfig = {
            headers: ['Id', 'Alkalmazott', 'Munka', 'Óraszám', 'Megjegyzés', 'Műveletek'],
            data: null
        };
        vm.balanceTableConfig = {
            headers: ['Nettó', 'Bruttó', 'Áfa', 'Áfa értéke', 'Dátum', 'Teljesítés', 'Jelleg', 'Kapcsolat', 'KP', 'Megjegyzés', 'Műveletek'],
            data: null
        };

        vm.openDatePicker = openDatePicker;
        vm.nextDay = nextDay;
        vm.previousDay = previousDay;
        vm.openNewReport = openNewReport;
        vm.openNewBalance = openNewBalance;
        vm.openEditReport = openEditReport;
        vm.openEditBalance = openEditBalance;
        vm.deleteTimeReport = deleteTimeReport;
        vm.deleteBalance = deleteBalance;

        function openDatePicker() {
            vm.datepicker.opened = true;
        }
        function nextDay() {
            vm.selectedDate = new Date(vm.selectedDate.getFullYear(), vm.selectedDate.getMonth(), vm.selectedDate.getDate() + 1);
        }
        function previousDay() {
            vm.selectedDate = new Date(vm.selectedDate.getFullYear(), vm.selectedDate.getMonth(), vm.selectedDate.getDate() - 1);
        }
        function openNewReport() {
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
        }
        function openNewBalance() {
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
        }
        function openEditReport(report) {
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
        }
        function openEditBalance(balance) {
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
        }
        function deleteTimeReport(reportId) {
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
        }
        function deleteBalance(balance) {
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
        }

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
        function loadData() {
            loadTimeReportTable();
            loadBalanceTable();
        }
        $scope.$watch(function() {
            return vm.selectedDate;
        }, function(current, original) {
            if(current !== /** @type {boolean} */ original) {
                loadData();
            }
        });
        loadData();
    }
})();