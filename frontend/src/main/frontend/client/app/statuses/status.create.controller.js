(function () {
    'use strict';

    angular
        .module('app.status')
        .controller('StatusCreateController', StatusCreateController);

    StatusCreateController.$inject = ['$location', 'StatusService'];

    function StatusCreateController($location, StatusService) {
        var vm = this;
        vm.status = {
            name: '',
            isIncome: false
        };
        vm.createStatus = createStatus;

        function createStatus() {
            StatusService.createStatus(vm.status, function(success) {
                if(success) {
                    ngToast.success({
                        content: 'Mentés sikeres!',
                        animation: 'fade'
                    });
                    $location.path('/status');
                } else {
                    ngToast.danger({
                        content: 'Mentés sikertelen!',
                        animation: 'fade'
                    });
                }
            })
        }
    }
})();