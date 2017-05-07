(function () {
    'use strict';

    angular
        .module('app.status')
        .factory('StatusService', StatusService);

    StatusService.$inject = ['ResourceDao'];

   function StatusService(ResourceDao) {
        var urlBase = '/api/status/';
        var StatusService = {
            createStatus: createStatus,
            editStatus: editStatus,
            getStatusById: getStatusById,
            deleteStatus: deleteStatus,
            getAllStatuses: getAllStatuses
        };
        return StatusService;

        function createStatus(newStatus, callback) {
            var data = new ResourceDao(urlBase + 'create');
            data.post(newStatus).then(callback);
        }
        function editStatus(editedStatus, id, callback) {
            var data = new ResourceDao(urlBase + 'edit/' + id);
            data.post(editedStatus).then(callback);
        }
        function getStatusById(id, callback) {
            var data = new ResourceDao(urlBase + id);
            data.get().then(callback);
        }
        function deleteStatus(id, callback) {
            var data = new ResourceDao(urlBase + 'delete/' + id);
            data.post().then(callback);
        }
        function getAllStatuses(callback) {
            var data = new ResourceDao(urlBase + 'list');
            data.list().then(callback);
        }
    }
})();