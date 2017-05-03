(function () {
    'use strict';

    angular
        .module('app.user')
        .controller('UserListController', UserListController);

    UserListController.$inject = ['UserService'];

    function UserListController(UserService) {
        var vm = this;
        vm.tableConfig = {
            headers: [
                { name: 'Id', prop: 'id'},
                { name: 'Név', prop: 'name'},
                { name: 'Órabér', prop: 'wage'},
                { name: 'Megjegyzés', prop: 'note'},
                { name: 'Műveletek', prop: null}],
            sorting: {
                type: 'name',
                reverse: false
            },
            data: null
        };
        vm.deleteUser = deleteUser;

        function loadList() {
            UserService.getAllUsers(function(data){
                vm.tableConfig.data = data;
            });
        }

        function deleteUser(id) {
            UserService.deleteUser(id, function(success){
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
            });
        }
        loadList();
    }
})();