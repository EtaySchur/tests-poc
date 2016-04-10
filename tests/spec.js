
//describe('Filters' , function(){
//   beforeEach(module('crossriderDemoApp'));
//
//   describe('reverse' , function(){
//        var reverse;
//        beforeEach(inject(function($filter){
//            reverse = $)
//        }))
//   })
//});


describe('Services' , function(){
   beforeEach(module('crossriderDemoApp'));

    describe("MainCtrl", function() {

        var scope;
        beforeEach(inject(function($rootScope, $controller) {
            console.log($controller);
            scope = $rootScope.$new();
            $controller("MainCtrl", {
                $scope: scope
            });
        }));

        it("should double the numbers", function() {
            expect(scope.turnLengthInSeconds).toBe(5);
        });
    });



});