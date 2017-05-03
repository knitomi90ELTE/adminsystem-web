(function () {
    'use strict';

    angular
        .module('app.user')
        .controller('UserCreateController', UserCreateController);

    UserCreateController.$inject = ['$location', 'UserService'];

    function UserCreateController($location, UserService) {
        var vm = this;
        vm.user = {
            name: '',
            wage: 0,
            note: ''
        };
        vm.createUser = createUser;

        function createUser() {
            UserService.createUser(vm.user, function(success) {
                if(success) {
                    ngToast.success({
                        content: 'Mentés sikeres!',
                        animation: 'fade'
                    });
                    $location.path('/user');
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