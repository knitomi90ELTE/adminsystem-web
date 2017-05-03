(function () {
    'use strict';

    angular
        .module('app.user')
        .factory('UserService', UserService);

    UserService.$inject = ['ResourceDao'];

    function UserService(ResourceDao) {
        var urlBase = '/api/user/';
        var UserService = {
            createUser: createUser,
            editUser: editUser,
            getUserById: getUserById,
            deleteUser: deleteUser,
            getAllUsers: getAllUsers
        };
        return UserService;

        function createUser(newUser, callback) {
            var data = new ResourceDao(urlBase + 'create');
            return data.post(newUser).then(callback);
        }

        function editUser(editedUser, id, callback) {
            var data = new ResourceDao(urlBase + 'edit/' + id);
            return data.post(editedUser).then(callback);
        }

        function getUserById(id, callback) {
            var data = new ResourceDao(urlBase + id);
            return data.get().then(callback);
        }

        function deleteUser(id, callback) {
            var data = new ResourceDao(urlBase + 'delete/' + id);
            return data.post().then(callback);
        }

        function getAllUsers(callback) {
            var data = new ResourceDao(urlBase + 'list');
            return data.list().then(callback);
        }
    }
})();