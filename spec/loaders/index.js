'use strict';

describe('Loaders', function() {
  var Loaders = require('../../src/loaders');
  var construct = Loaders;
  var noop = new Function();
  var loaders, cb;

  describe('new Loaders(): Loaders', function() {
    it('should create instance with new keyword', function() {
      expect(new Loaders()).to.be.an.instanceof(Loaders);
    });

    it('should create instance by function call', function() {
      expect(construct()).to.be.an.instanceof(Loaders);
    });
  });

  describe('.prototype', function() {
    beforeEach(function() {
      loaders = new Loaders();
    });

    describe('.constructor', function() {
      it('should be a Loaders', function() {
        expect(loaders.constructor).to.be.equal(Loaders);
      });
    });

    describe('.registry', function() {
      it('should be an Object', function() {
        expect(loaders.registry).to.be.an.instanceOf(Object);
      });
    });

    describe('.register(name: String, '
           + 'descriptor: Object|(any) => any): Loaders', function() {
      it('should throw exception unless name is a String', function() {
        cb = function() {
          return loaders.register({});
        };
        expect(cb).to.throw('Invalid argument type');
      });

      it('should throw exception if name is empty string', function() {
        cb = function() {
          return loaders.register('');
        };
        expect(cb).to.throw('Given name is empty string');
      });

      it('should throw exception '
       + 'unless given descriptor is a Object|Function', function() {
        cb = function() {
          return loaders.register('hoge');
        };
        expect(cb).to.throw('Invalid argument type');
        cb = function() {
          return loaders.register('hoge', {});
        };
        expect(cb).not.to.throw('Invalid argument type');
        cb = function() {
          return loaders.register('hoge', noop);
        };
        expect(cb).not.to.throw('Invalid argument type');
      });

      it('should return instance', function() {
        var res = loaders.register('hoge', noop);
        expect(res).to.be.equal(loaders);
      });
    });

    describe('.restore(): Loaders', function() {
      it('should restore registry', function() {
        loaders.register('hoge', noop);
        expect(loaders.registry).to.have.property('hoge')
                              .that.is.a.instanceof(Object);
        loaders.restore();
        expect(loaders.registry).to.be.empty;
      });

      it('should return instance', function() {
        expect(loaders.restore()).to.be.equal(loaders);
      });
    });
  });
});
