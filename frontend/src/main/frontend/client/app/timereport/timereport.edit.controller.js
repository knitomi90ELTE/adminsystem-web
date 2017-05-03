(function () {
    'use strict';

    angular
        .module('app.timereport')
        .controller('EditReportModalController', EditReportModalController);

    EditReportModalController.$inject = ['$uibModalInstance', 'UserService', 'ProjectService'];

    function EditReportModalController($uibModalInstance, UserService, ProjectService, report) {
        var vm = this;
        vm.title = 'Szerkesztés';
        vm.users = [];
        vm.projects = [];
        vm.form = {};

        vm.ok = ok;
        vm.cancel = cancel;

        function loadAllData() {
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
        }

        function ok() {
            var editedReport = {
                id: report.id,
                userId: vm.form.user.id,
                projectId: vm.form.project.id,
                hour: vm.form.hour,
                note: vm.form.note,
                created: report.created
            };
            $uibModalInstance.close(editedReport);
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }

        loadAllData();
    }

})();