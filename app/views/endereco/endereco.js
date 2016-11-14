'use strict';

angular.module('myApp.endereco', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/endereco', {
    templateUrl: 'views/endereco/endereco.html',
    controller: 'EnderecoCtrl'
  })
  .when('/endereco/:save', {
    templateUrl: 'views/endereco/endereco.html',
    controller: 'EnderecoCtrl'
  })
}])

.controller('EnderecoCtrl', ['$scope','$location', '$routeParams', 'EnderecoService',
    function($scope, $location, $routeParams, EnderecoService) {

    $scope.items = [];

    if($routeParams.save){
        Materialize.toast('Endereco salvo com sucesso!', 4000);
    }

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
        return $http.get(REST_SYSTEM + 'address?page=1&limit=100')
    };
}]);

