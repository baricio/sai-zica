'use strict';

describe('myApp.mapa module', function() {

  beforeEach(module('ngRoute','ngMap','myApp.mapa'));

  describe('mapa controller', function(){

    it('should instace MapaCtrl', inject(function($controller, $rootScope, NgMap) {
      var scope = $rootScope.$new();
      var mapaCtrl = $controller('MapaCtrl',{$scope:scope,NgMap:NgMap});
      expect(mapaCtrl).toBeDefined();
    }));

  });
});
