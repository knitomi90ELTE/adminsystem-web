(function () {
    'use strict';

    angular
        .module('app.status')
        .controller('StatusListController', StatusListController);

    StatusListController.$inject = ['StatusService'];

    function StatusListController(StatusService) {
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
        vm.deleteStatus = deleteStatus;

        function loadList() {
            StatusService.getAllStatuses(function(data){
                vm.tableConfig.data = data;
            });
        }
        function deleteStatus(id) {
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
    }

})();