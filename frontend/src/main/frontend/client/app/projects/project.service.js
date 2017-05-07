(function () {
    'use strict';

    angular
        .module('app.project')
        .factory('ProjectService', ProjectService);

    ProjectService.$inject = ['ResourceDao'];

    function ProjectService(ResourceDao) {
        var urlBase = '/api/project/';
        var ProjectService = {
            createProject: createProject,
            editProject: editProject,
            getProjectById: getProjectById,
            deleteProject: deleteProject,
            getAllProjects: getAllProjects
        };
        return ProjectService;

        function createProject(newProject, callback) {
            var data = new ResourceDao(urlBase + 'create');
            data.post(newProject).then(callback);
        }
        function editProject(editedProject, id, callback) {
            var data = new ResourceDao(urlBase + 'edit/' + id);
            data.post(editedProject).then(callback);
        }
        function getProjectById(id, callback) {
            var data = new ResourceDao(urlBase + id);
            data.get().then(callback);
        }
        function deleteProject(id, callback) {
            var data = new ResourceDao(urlBase + 'delete/' + id);
            data.post().then(callback);
        }
        function getAllProjects(callback) {
            var data = new ResourceDao(urlBase + 'list');
            data.list().then(callback);
        }
    }
})();