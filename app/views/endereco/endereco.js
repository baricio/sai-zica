'use strict';

angular.module('myApp.endereco', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/endereco', {
    templateUrl: 'views/endereco/endereco.html',
    controller: 'EnderecoCtrl'
  });
}])

.controller('EnderecoCtrl', ['$scope','$location', 'EnderecoService',
    function($scope, $location, EnderecoService) {

    $scope.items = [];

    EnderecoService.getAddress().then(
        function (resp) {
            $scope.items = resp.data.data;
        },
        function (err) {
            console.log('err',err);
        }
    );

    $scope.addAddress = function(){
        console.log('addAddress click');
        $location.path('/mapa');
    }

    $scope.editAddress = function(id, lat, lon){
        console.log('addAddress edit');
        $location.path('/mapa/'+id+'/'+lat+'/'+lon);
    }

}])

.service('EnderecoService',['$http','REST_SYSTEM', function($http, REST_SYSTEM){
    this.getAddress = function(){
        return $http.get(REST_SYSTEM + 'address')
    };
}]);

