(function () {
    'use strict';

    angular
        .module('app.project')
        .controller('ProjectCreateController', ProjectCreateController);

    ProjectCreateController.$inject = ['$location', 'ProjectService'];

    function ProjectCreateController($location, ProjectService) {
        var vm = this;
        vm.project = {
            name: '',
            retention: 0,
            note: ''
        };
        vm.createProject = createProject;
        function createProject() {
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
            });
        }
    }
})();