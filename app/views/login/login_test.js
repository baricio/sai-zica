'use strict';

describe('myApp.login module', function() {

  beforeEach(module('myApp.login'));

  describe('login controller', function(){

    it('should instace LoginCtrl', inject(function($controller, $rootScope) {
      var scope = $rootScope.$new();
      var loginCtrl = $controller('LoginCtrl',{$scope:scope});
      expect(loginCtrl).toBeDefined();
    }));

  });
});
