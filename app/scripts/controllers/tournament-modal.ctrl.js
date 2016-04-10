
/**
 * Created by EtaySchur on 08/04/2016.
 */


angular.module('crossriderDemoApp')
    .controller('EndTournamentModalCtrl', EndTournamentModalCtrl);

function EndTournamentModalCtrl( $uibModalInstance , gameSetting ) {
    'use strict';

    var vm = this;
    vm.gameSetting = gameSetting;

    vm.ok = function () {
        $uibModalInstance.close();
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
