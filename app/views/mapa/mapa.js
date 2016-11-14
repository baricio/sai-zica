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

.controller('MapaCtrl', ['$scope','$location','$routeParams','NgMap', 'MapaFactory', 'MapaService',
    function($scope, $location, $routeParams, NgMap, MapaFactory, MapaService) {

    var geocoder = new google.maps.Geocoder;
    var map;
    var ctrl = $scope;
    $scope.address = '';
    $scope.label = '';
    $scope.hideSave = false;

    if ($routeParams.id) {
        $scope.hideSave = true;
        $scope.lat = $routeParams.latitude;
        $scope.lon = $routeParams.longitude;
        MapaService.getAddressById($routeParams.id).then(
            function(resp){
               ctrl.label = resp.data.label;
               MapaFactory.setData(resp.data);
               Materialize.updateTextFields();
            },
            function(err){
                Materialize.toast('Falha ao recuperar endereco, tente mais tarde', 4000);
            }
        )
    }else{
        $scope.lat = -19.9353658;
        $scope.lon = -43.9398996;
    }

    NgMap.getMap({id:"zika-mapa"}).then(function(evtmap) {
        map = evtmap;
        window.map = evtmap;
        var latlng = {lat: map.center.lat(), lng: map.center.lng()};
        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    ctrl.lat = results[0].geometry.location.lat();
                    ctrl.lon = results[0].geometry.location.lng();
                    ctrl.address = results[0].formatted_address;
                    ctrl.$apply();
                    map.setCenter(results[0].geometry.location);
                }
            }
        });
    });

    $scope.findAddress = function(keyEvent) {
        if($scope.hideSave){
            return false;
        }
        if (keyEvent.which === 13){
            geocoder.geocode({'address': $scope.address}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    ctrl.lat = results[0].geometry.location.lat();
                    ctrl.lon = results[0].geometry.location.lng();
                    ctrl.address = results[0].formatted_address;
                    MapaFactory.translate(results[0].address_components);
                    ctrl.$apply();
                    map.setCenter(results[0].geometry.location);
                } else {
                    Materialize.toast('Endereço não encontrado', 4000);
                }
            });
        }
    }

    $scope.setAddress = function(event) {
        if($scope.hideSave){
            return false;
        }
        var latlng = {lat: event.latLng.lat(), lng: event.latLng.lng()};
        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    ctrl.lat = results[0].geometry.location.lat();
                    ctrl.lon = results[0].geometry.location.lng();
                    MapaFactory.translate(results[0].address_components);
                    ctrl.address = results[0].formatted_address;
                    ctrl.$apply();
                }
            } else {
                Materialize.toast('Falha ao recuperar endereço', 4000);
            }
        });
    }

    $scope.voltar = function(){
        $location.path('/endereco');
    }

    $scope.salvar = function(){
        MapaFactory.setLatitude($scope.lat);
        MapaFactory.setLongitude($scope.lon);
        MapaFactory.setLabel($scope.label);

        MapaService.saveAddress(MapaFactory.getData()).then(
            function(resp){
                console.log('ok', resp);
                $location.path('/endereco/1');
            },
            function(err){
                Materialize.toast('Falha ao salvar, tente mais tarde', 4000);
                console.log('err', err);
            }
        )
    }
}])

.service('MapaService',['$http','REST_SYSTEM', function($http, REST_SYSTEM){
    this.saveAddress = function(data){
        if (data.id <= 0) {
            return $http.post(REST_SYSTEM + 'address', data)
        }else{
            var update = {"label": data.label, "availableItems": [1]}
            return $http.put(REST_SYSTEM + 'address/'+data.id, update)
        }
    };

    this.getAddressById  = function(id){
        return $http.get(REST_SYSTEM + 'address/'+id)
    }
}])

.factory('MapaFactory', function(){

        var factory = {};

        var data =  {
            id: 0,
            label: '',
            latitude: 0,
            longitude:0,
            city: '',
            zipCode: '',
            state: '',
            complement: '',
            address: '',
            neighborhood: '',
            number: '',
            country: ''
        };

        factory.setId = function(id) {
            data.id = id;
        }

        factory.setLatitude = function(latitude) {
            data.latitude = latitude;
        }

        factory.setLongitude = function(longitude) {
            data.longitude = longitude;
        }

        factory.setLabel = function(label) {
            data.label = label;
        }

        factory.getData = function(AdressArr) {
            return data;
        }

        factory.setData = function(obj) {
            data.id = obj.id || 0;
            data.label = obj.label || "";
            data.latitude = obj.latitude || 0;
            data.longitude = obj.longitude || 0;
            data.city = obj.city || "";
            data.zipCode = obj.zipCode || "";
            data.state = obj.state || "";
            data.complement = obj.complement || "";
            data.address = obj.address || "";
            data.neighborhood = obj.neighborhood || "";
            data.number = obj.number || "";
            data.country = obj.country || "";
            console.log('setData', data);
        }

        factory.translate = function(AdressArr) {
            $.each(AdressArr, function (i, address_component) {

                if (address_component.types[0] == "route") {
                    data.address = address_component.long_name;
                }

                if (
                    address_component.types[0] == "locality"
                    || address_component.types[0] == "administrative_area_level_2"
                ) {
                    data.city = address_component.long_name;
                }

                if (
                    address_component.types[0] == "state"
                    || address_component.types[0] == "administrative_area_level_1"
                ) {
                    data.state = address_component.short_name;
                }

                if (address_component.types[0] == "country"){
                    data.country = address_component.long_name;
                }

                if (address_component.types[0] == "postal_code"){
                    data.zipCode = address_component.long_name;
                }

                if (address_component.types[0] == "street_number"){
                    data.number = address_component.long_name;
                }

            });

            return data;
        }

        return factory;
});
