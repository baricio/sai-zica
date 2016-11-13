'use strict';

angular.module('myApp.mapa', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/mapa', {
        templateUrl: 'views/mapa/mapa.html',
        controller: 'MapaCtrl'
    })
    .when('/mapa/:id/:lat/:lon', {
        templateUrl: 'views/mapa/mapa.html',
        controller: 'MapaCtrl'
    })
}])

.controller('MapaCtrl', ['$scope','$routeParams','NgMap', function($scope, $routeParams, NgMap) {

    if ($routeParams) {
        console.log('route params',$routeParams)
    }

    NgMap.getMap().then(function(map) {
        $('#zika-mapa').removeAttr('style');
    });
}]);
