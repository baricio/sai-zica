'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$location', '$sessionStorage', '$rootScope', 'LoginService',
    function($scope, $location, $sessionStorage, $rootScope, LoginService) {
    $sessionStorage.token = null;
    $rootScope.loged = false;
    $rootScope.generaltitle = 'Sai Zika';
    $scope.loginForm = {email:'',pass:''};

    $scope.doLogin = function($event){
        LoginService.login($scope.loginForm.email, $scope.loginForm.pass);
        $location.path('/endereco');
    }

    Materialize.updateTextFields();
}])

.service('LoginService',['$http','$sessionStorage','$location', 'REST_TOKEN', 'HEADER_LOGIN',
    function($http, $sessionStorage, $location, REST_TOKEN, HEADER_LOGIN){
    this.login = function(user,pass){
        var login = '?grant_type=password&username='+ user +'&password=' + pass;
        var req = {
            method: 'POST',
            url: REST_TOKEN + login,
            headers: {
                'Authorization': HEADER_LOGIN
            },
            data: {}
        }

        return $http(req).then(
            function (resp) {
                console.log(resp);
                var token_type = resp.data.token_type.charAt(0).toUpperCase() + resp.data.token_type.slice(1);
                $sessionStorage.token =  token_type + ' ' + resp.data.access_token;
                $location.path('/endereco');
                console.log('success',resp);
            },
            function (err) {
                console.log('err',err);
            }
        );
    };
}]);
