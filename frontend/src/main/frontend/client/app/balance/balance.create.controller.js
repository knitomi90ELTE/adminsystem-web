(function () {
    'use strict';
    angular.module('app.balance').controller('NewBalanceModalController', NewBalanceModalController);

    NewBalanceModalController.$inject = ['$scope', '$filter', 'UserService', 'ProjectService', 'StatusService'];

    app.controller('NewBalanceModalController', function($scope, $filter, UserService, ProjectService, StatusService, currentDate, $uibModalInstance){
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

        vm.balanceTypes = [
            { type: 'project', name: 'Munka' },
            { type: 'user', name: 'Alkalmazott' },
            { type: 'other', name: 'Egyéb' }
        ];

        vm.statuses = [];
        vm.users = [];
        vm.projects = [];

        vm.ok = ok;
        vm.cancel = cancel;
        vm.openCreatedPicker = openCreatedPicker;
        vm.openCompletedPicker = openCompletedPicker;

        function loadUsers() {
            UserService.getAllUsers(function(data){
                vm.users = data;
            });
        }

        function loadProjects() {
            ProjectService.getAllProjects(function(data){
                vm.projects = data;
            });
        }

        function loadStatuses() {
            StatusService.getAllStatuses(function(data){
                vm.statuses = data;
                vm.form.status = vm.statuses[0];
            });
        }

        function openCreatedPicker() {
            vm.datepicker.created.opened = true;
        }

        function openCompletedPicker() {
            vm.datepicker.completed.opened = true;
        }

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

        function ok() {
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
        }
        function cancel() {
            $uibModalInstance.dismiss();
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

        loadUsers();
        loadProjects();
        loadStatuses();

    });
})();