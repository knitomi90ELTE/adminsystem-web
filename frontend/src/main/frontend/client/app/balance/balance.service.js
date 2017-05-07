(function () {
    'use strict';

    angular.module('app.balance').factory('BalanceService', BalanceService);
    BalanceService.$inject = ['ResourceDao'];

    function BalanceService(ResourceDao) {

        var urlBase = '/api/balance/';
        var BalanceService = {
            createBalance: createBalance,
            editBalance: editBalance,
            getBalanceById: getBalanceById,
            deleteBalance: deleteBalance,
            getAllBalances: getAllBalances,
            getAllBalancesByType: getAllBalancesByType,
            getAllCompletedBalancesByDate: getAllCompletedBalancesByDate,
            doPayment: doPayment,
            getAllBalanceByUserId: getAllBalanceByUserId
        };
        return BalanceService;

        function createBalance(newBalance, callback) {
            var data = new ResourceDao(urlBase + 'create');
            data.post(newBalance).then(callback);
        }
        function editBalance(editedBalance, id, callback) {
            var data = new ResourceDao(urlBase + 'edit/' + id);
            data.post(editedBalance).then(callback);
        }
        function getBalanceById(id, type, callback) {
            var data = new ResourceDao(urlBase + type + '/' + id);
            data.get().then(callback);
        }
        function deleteBalance(id, type, callback) {
            var data = new ResourceDao(urlBase + 'delete/' + type + '/' + id);
            data.post().then(callback);
        }
        function getAllBalances(callback) {
            var data = new ResourceDao(urlBase + 'list');
            data.list().then(callback);
        }
        function getAllBalancesByType(type, callback) {
            var data = new ResourceDao(urlBase + 'list/' + type);
            data.list().then(callback);
        }
        function getAllCompletedBalancesByDate(date, callback) {
            var data = new ResourceDao(urlBase + 'list/date/' + date);
            data.list().then(callback);
        }
        function doPayment(params, callback) {
            var data = new ResourceDao(urlBase + 'pay');
            data.post(params).then(callback);
        }
        function getAllBalanceByUserId(userId, callback) {
            var data = new ResourceDao(urlBase + 'list/user/' + userId);
            data.list().then(callback);
        }
    }
})();