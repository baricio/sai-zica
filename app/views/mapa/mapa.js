'use strict';

angular.module('myApp.mapa', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/mapa', {
        templateUrl: 'views/mapa/mapa.html',
        controller: 'MapaCtrl'
    });
}])

.controller('MapaCtrl', ['$scope','NgMap', function($scope, NgMap) {
    NgMap.getMap().then(function(map) {
        $('#zika-mapa').removeAttr('style');
    });
}]);
