(function () {
    'use strict';

    angular
        .module('app.status')
        .controller('StatusEditController', StatusEditController);

    StatusEditController.$inject = ['$routeParams', '$location', 'StatusService'];

    function StatusEditController($routeParams, $location, StatusService) {
        var vm = this;
        var statusId = $routeParams.id;
        vm.status = {
            name: '',
            isIncome: false
        };
        vm.editStatus = editStatus;
        function loadStatus(){
            StatusService.getStatusById(statusId, function(data){
                if(data) {
                    vm.status = {
                        name: data.name,
                        isIncome: data.isIncome
                    }
                } else {
                    ngToast.danger({
                        content: 'Valami hiba történt!',
                        animation: 'fade'
                    });
                }
            });
        }

        function editStatus() {
            StatusService.editStatus(vm.status, statusId, function(success){
                if(success) {
                    ngToast.success({
                        content: 'Sikeres szerkesztés!'
                    });
                    $location.path('/status');
                } else {
                    ngToast.danger({
                        content: 'Sikertelen szerkesztés!'
                    });
                }
            });
        }

        loadStatus();
    }

})();