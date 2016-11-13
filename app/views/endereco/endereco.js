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
            console.log(resp);
            $scope.items = resp.data.data;
        },
        function (err) {
            console.log('err',err);
        }
    );

    $scope.addAddress = function() {
        $location.path('/mapa');
    }

    $scope.editAddress = function(id, lat, lon) {
        $location.path('/mapa/'+id+'/'+lat+'/'+lon);
    }

}])

.service('EnderecoService',['$http','REST_SYSTEM', function($http, REST_SYSTEM){
    this.getAddress = function(){
        return $http.get(REST_SYSTEM + 'address')
    };
}]);

