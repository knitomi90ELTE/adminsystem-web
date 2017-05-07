(function () {
    'use strict';
    angular.module('app.balance').controller('BalanceListController', BalanceListController);

    BalanceListController.$inject = ['$filter', 'BalanceService'];

    function BalanceListController($filter, BalanceService) {
        var vm = this;
        vm.searchField = '';
        vm.tableConfig = {
            headers: [
                { name: 'Id', prop: 'id'},
                { name: 'Nettó', prop: 'net'},
                { name: 'Bruttó', prop: 'gross'},
                { name: 'Áfa', prop: 'vat'},
                { name: 'Áfa értéke', prop: 'vatValue'},
                { name: 'Dátum', prop: 'created'},
                { name: 'Teljesítés', prop: 'completed'},
                { name: 'Jelleg', prop: null},
                { name: 'Kapcsolat', prop: null},
                { name: 'Készpénzes', prop: 'cash'},
                { name: 'Megjegyzés', prop: 'note'},
                { name: 'Műveletek', prop: null}],
            sorting: {
                type: 'id',
                reverse: false
            },
            data: null
        };
        vm.doPayment = doPayment;

        function doPayment(balance) {
            var params = {
                id: balance.id,
                balanceType: balance.balanceType,
                completionDate: $filter('date')(new Date(), 'yyyy-MM-dd')
            };
            BalanceService.doPayment(params, function(success) {
                if(success) {
                    ngToast.success({
                        content: 'Sikeres teljesítés!',
                        animation: 'fade'
                    });
                    loadList();
                } else {
                    ngToast.danger({
                        content: 'Sikertelen teljesítés!',
                        animation: 'fade'
                    });
                }
            });
        }

        function loadList() {
            BalanceService.getAllBalances(function(data){
                vm.tableConfig.data = data;
            });
        }
        loadList();
    }
})();