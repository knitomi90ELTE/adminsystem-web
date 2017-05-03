(function () {
    'use strict';

    angular
        .module('app.timereport')
        .factory('TimeReportService', TimeReportService);

    TimeReportService.$inject = ['ResourceDao'];

    function TimeReportService(ResourceDao) {
        var urlBase = '/api/timereport/';
        var TimeReportService = {
            createTimeReport: createTimeReport,
            editTimeReport: editTimeReport,
            getTimeReportById: getTimeReportById,
            deleteTimeReport: deleteTimeReport,
            getAllTimeReports: getAllTimeReports,
            getAllTimeReportsByDate: getAllTimeReportsByDate,
            getAllTimeReportsByUserId: getAllTimeReportsByUserId,
            getAllTimeReportsByProjectId: getAllTimeReportsByProjectId
        };
        return TimeReportService;

        function createTimeReport(newReport, callback) {
            var data = new ResourceDao(urlBase + 'create');
            data.post(newReport).then(
                function() {
                    callback(true);
                },
                function(){
                    callback(false);
                }
            );
        }
        function editTimeReport(editedReport, id, callback) {
            var data = new ResourceDao(urlBase + 'edit/' + id);
            data.post(editedReport).then(callback);
        }
        function getTimeReportById(id, callback) {
            var data = new ResourceDao(urlBase + id);
            data.get().then(callback);
        }
        function deleteTimeReport(id, callback) {
            var data = new ResourceDao(urlBase + 'delete/' + id);
            data.post().then(callback);
        }
        function getAllTimeReports(callback) {
            var data = new ResourceDao(urlBase + 'list');
            data.list().then(callback);
        }
        function getAllTimeReportsByDate(date, callback) {
            var data = new ResourceDao(urlBase + 'date/' + date);
            data.list().then(callback);
        }
        function getAllTimeReportsByUserId(userId, callback) {
            var data = new ResourceDao(urlBase + 'user/' + userId);
            data.list().then(callback);
        }
        function getAllTimeReportsByProjectId(projectId, callback) {
            var data = new ResourceDao(urlBase + 'project/' + projectId);
            data.list().then(callback);
        }
    }

})();