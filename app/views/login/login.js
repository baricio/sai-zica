'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$location', 'LoginService', function($scope, $location, LoginService) {
    $scope.loginForm = {email:'',pass:''};
    $scope.doLogin = function($event){
        //LoginService.login($scope.loginForm.email, $scope.loginForm.pass);
        $location.path('/endereco');
    }
}])

.service('LoginService',['$http','$sessionStorage', 'REST_TOKEN', 'HEADER_LOGIN',
    function($http, $sessionStorage, REST_TOKEN, HEADER_LOGIN){
    this.login = function(user,pass){
        var login = '?grant_type=password&username='+ user +'&password=' + pass;
        return $http.post(REST_TOKEN + login,{
            headers: {Authorization: HEADER_LOGIN}
        })
        .then(
            function (data) {
                console.log('success',data);
            },
            function (err) {
                console.log('err',err);
            }
        );
    };
}]);
