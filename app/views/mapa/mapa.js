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

    /*if ($routeParams) {
        console.log('route params',$routeParams)
    }*/

    var map;
    var ctrl = $scope;
    $scope.lat = -19.9353658;
    $scope.lon = -43.9398996;
    $scope.address = '';
    $scope.country = '';
    var geocoder = new google.maps.Geocoder;

    console.log('geocoder', geocoder);

    NgMap.getMap({id:"zika-mapa"}).then(function(evtmap) {
        map = evtmap;
        window.map = evtmap;
    });

    $scope.findAddress = function(keyEvent) {
        if (keyEvent.which === 13){
            geocoder.geocode({'address': $scope.address}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    ctrl.lat = results[0].geometry.location.lat();
                    ctrl.lon = results[0].geometry.location.lng();
                    ctrl.address = results[0].formatted_address;
                    ctrl.$apply();
                    map.setCenter(results[0].geometry.location);
                } else {
                    Materialize.toast('Endereço não encontrado', 4000);
                }
            });
        }
    }

    $scope.setCenter = function(event) {
        var latlng = {lat: event.latLng.lat(), lng: event.latLng.lng()};
        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    ctrl.address = results[0].formatted_address;
                }
            } else {
                Materialize.toast('Falha ao recuperar endereço', 4000);
            }
        });

        $scope.lat = event.latLng.lat();
        $scope.lon = event.latLng.lng();
    }
}]);
