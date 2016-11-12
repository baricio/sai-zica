'use strict';

describe('myApp.endereco module', function() {

  beforeEach(module('ngRoute','myApp.endereco'));

  describe('endereco controller', function(){

    it('should instance endereco', inject(function($controller, $rootScope) {
      var scope = $rootScope.$new();
      var enderecoCtrl = $controller('EnderecoCtrl',{$scope:scope});

      expect(enderecoCtrl).toBeDefined();
    }));

  });
});
