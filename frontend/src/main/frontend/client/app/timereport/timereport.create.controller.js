(function () {
    'use strict';

    angular
        .module('app.timereport')
        .controller('NewReportModalController', NewReportModalController);

    NewReportModalController.$inject = ['$uibModalInstance', 'UserService', 'ProjectService'];

    function NewReportModalController($uibModalInstance, UserService, ProjectService) {
        var vm = this;
        vm.title = 'Új hozzáadása';
        vm.users = [];
        vm.projects = [];
        vm.form = {
            user: null,
            project: null,
            hour: 0.0,
            note: ''
        };

        vm.ok = ok;
        vm.cancel = cancel;

        function ok() {
            var newReport = {
                userId: vm.form.user.id,
                projectId: vm.form.project.id,
                hour: vm.form.hour,
                note: vm.form.note
            };
            $uibModalInstance.close(newReport);
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }

        function loadAllUsers() {
            UserService.getAllUsers(function(data){
                vm.users = data;
            });
        }

        function loadAllProjects() {
            ProjectService.getAllProjects(function(data){
                vm.projects = data;
            });
        }

        loadAllUsers();
        loadAllProjects();
    }

})();