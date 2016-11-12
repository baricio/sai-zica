'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMap',
  'myApp.login',
  'myApp.endereco',
  'myApp.mapa',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/login'});
}]);
