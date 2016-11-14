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
    $scope.delete = {};
    $('.modal').modal();

    if($routeParams.save){
        Materialize.toast('Endereco salvo com sucesso!', 4000);
    }

    var listaAdress = function () {
        EnderecoService.getAddress().then(
            function (resp) {
                console.log(resp);
                $scope.items = resp.data.data;
            },
            function (err) {
                console.log('err',err);
            }
        );
    }
    listaAdress();

    $scope.clearDelete = function () {
        $scope.delete = {};
    }

    $scope.addAddress = function() {
        $location.path('/mapa');
    }

    $scope.editAddress = function(id, lat, lon) {
        $location.path('/mapa/'+id+'/'+lat+'/'+lon);
    }

    $scope.delete = function(id, label) {
        $scope.delete.id = id;
        $scope.delete.label  = label;
        $('#modal_delete').modal('open');
    }

    $scope.deleteAddress = function() {
        $('#modal_delete').modal('close');
        EnderecoService.deleteAddress($scope.delete.id).then(
            function (resp) {
                $('#modal_delete_ok').modal('open');
                $('.id-'+$scope.delete.id).remove();
            },
            function (err) {
                $scope.delete = {};
                console.log('err',err);
            }
        );
    }

}])

.service('EnderecoService',['$http','REST_SYSTEM', function($http, REST_SYSTEM){
    this.getAddress = function(){
        return $http.get(REST_SYSTEM + 'address?page=1&rows=100')
    };
    this.deleteAddress = function(id){
        return $http.delete(REST_SYSTEM + 'address/' + id)
    };
}]);

