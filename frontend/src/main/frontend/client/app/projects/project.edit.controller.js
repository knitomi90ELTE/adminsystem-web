(function () {
    'use strict';

    angular
        .module('app.project')
        .controller('ProjectEditController', ProjectEditController);

    ProjectEditController.$inject = ['$routeParams', '$location', 'ProjectService'];

    function ProjectEditController($routeParams, $location, ProjectService) {
        var vm = this;
        var projectId = $routeParams.id;
        vm.project = {
            name: '',
            retention: 0,
            note: ''
        };
        vm.editProject = editProject;

        function editProject() {
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
        }
    }
})();