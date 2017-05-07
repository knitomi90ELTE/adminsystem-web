(function () {
    'use strict';
    angular.module('app.balance').controller('EditBalanceModalController', EditBalanceModalController);

    function EditBalanceModalController($scope, $filter, $uibModalInstance, UserService, ProjectService, StatusService, balance) {
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
        vm.openCreatedPicker = openCreatedPicker;
        vm.openCompletedPicker = openCompletedPicker;
        vm.ok = ok;
        vm.cancel = cancel;

        vm.balanceTypes = [
            { type: 'project', name: 'Munka' },
            { type: 'user', name: 'Alkalmazott' },
            { type: 'other', name: 'Egyéb' }
        ];

        vm.statuses = [];
        vm.users = [];
        vm.projects = [];
        vm.form = {};

        function loadData() {
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
        }

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

        function openCreatedPicker() {
            vm.datepicker.created.opened = true;
        }

        function openCompletedPicker() {
            vm.datepicker.completed.opened = true;
        }

        function buildDate(date) {
            return $filter('date')(date, 'yyyy-MM-dd');
        }

        function ok() {
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

        loadData();
    }
})();