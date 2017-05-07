(function () {
    'use strict';
    angular
        .module('app.project')
        .controller('ProjectListController', ProjectListController);

    ProjectListController.$inject = ['ProjectService'];

    function ProjectListController(ProjectService) {
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
        vm.deleteProject = deleteProject;

        function loadList() {
            ProjectService.getAllProjects(function(data){
                vm.tableConfig.data = data;
            });
        }

        function deleteProject(id) {
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
        }
        loadList();
    }
})();