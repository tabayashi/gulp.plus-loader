'use strict';

describe('Finder', function() {
  var Finder  = require('../../src/finder');
  var Loaders = require('../../src/loaders');
  var construct = Finder;
  var cb, finder;

  describe('new Finder(options): Finder', function() {
    it('should create instance with new keyword', function() {
      expect(new Finder()).to.be.an.instanceof(Finder);
    });

    it('should create instance by function call', function() {
      expect(construct()).to.be.an.instanceof(Finder);
    });
  });

  describe('.prototype', function() {
    beforeEach(function() {
      finder = new Finder();
    });

    describe('.constructor', function() {
      it('should be Finder', function() {
        expect(finder.constructor).to.be.equal(Finder);
      });
    });

    describe('.loaders', function() {
      it('should be a Loaders', function() {
        expect(finder.loaders).to.be.an.instanceOf(Loaders);
      });
    });

    describe('.find(dirname: String, params: Array): Finder', function() {
      it('should throw exception '
       + 'unless given dirname is an String', function() {
        cb = function() {
          return finder.find();
        };
        expect(cb).to.throw('Invalid argument type');

        cb = function() {
          return finder.find('spec/sample-loaders', []);
        };
        expect(cb).not.to.throw('Invalid argument type');
      });

      it('should return instance', function() {
        var res = finder.find('spec/sample-loaders', []);
        expect(res).to.be.equal(finder);
      });
    });
  });
});
