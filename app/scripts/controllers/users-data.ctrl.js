/**
 * Created by EtaySchur on 08/04/2016.
 */


angular.module('crossriderDemoApp')
    .controller('UsersDataModalCtrl', UsersDataModalCtrl);

function UsersDataModalCtrl( $scope , $uibModalInstance ) {
    'use strict';

    socket.on('user-logged-in', function(users){
        console.log("USERS LOGGED IN " , users);
        vm.users = users;
        $scope.$apply();
        if(users['X'].name && users['O'].name){
            vm.ok();
        }
    });

    socket.emit('check-for-online-user');





    var vm = this;
    vm.users = {
        'X' : {} ,
        'O' : {}
    };

    vm.ok = function () {
        $uibModalInstance.close(vm.users);
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    socket.on('check-for-online-user', function(numOfUsers){
        if(numOfUsers === 1){

        }

        if(numOfUsers === 2){

        }
    });
};
