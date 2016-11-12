'use strict';

angular.module('myApp.endereco', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/endereco', {
    templateUrl: 'views/endereco/endereco.html',
    controller: 'EnderecoCtrl'
  });
}])

.controller('EnderecoCtrl', ['$scope','$location',function($scope, $location) {

    $scope.items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

    $scope.addAddress = function(){
        console.log('addAddress click');
        $location.path('/mapa');
    }

    $scope.editAddress = function(){
        console.log('addAddress edit');
        $location.path('/mapa');
    }

}]);
