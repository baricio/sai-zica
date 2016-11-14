'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMap',
  'ngStorage',
  'myApp.login',
  'myApp.endereco',
  'myApp.mapa',
  'myApp.version'
]).
constant('HEADER_LOGIN', 'Basic TZiZGVjY2ItNzM1OC00OTk3LWIzYzAtODk2NDBhZjEyZGRlOmQ5OWNmMTU0LTFjZGYtNDRiMi04MDJmLWU1YzhiYmU5NjY5OA==').
constant('REST_TOKEN', 'http://localhost:1337/api-hck.hotmart.com/security/oauth/token').
constant('REST_LOGIN', 'http://api-hck.hotmart.com/security/rest/v1/').
constant('REST_SYSTEM', 'http://api-hck.hotmart.com/hack-dragonfly/rest/v1/').
config(['$locationProvider', '$routeProvider', '$httpProvider',
    function($locationProvider, $routeProvider, $httpProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/login'});

    $httpProvider.interceptors.push(['$q','$location', '$sessionStorage', function($q, $location, $sessionStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($sessionStorage.token) {
                    config.headers.Authorization = $sessionStorage.token;
                }
                $('#loading').show();
                return config;
            },
            'response': function (response) {
                $('#loading').hide();
                return response || $q.when(response);
            },
            'responseError': function (response) {
                Materialize.toast('Falha ao comunicar com o servidor!', 4000)
                $('#loading').hide();
                if (response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    }]);
}])
.run(['$sessionStorage', function($sessionStorage){
    if (!$sessionStorage.token) {
      $sessionStorage.token = 'Bearer 9b6ff061-91da-41f3-aca6-abeaf9917a11';
    }
}]);
