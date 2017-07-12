'use strict';
var kindof = require('kind-of');

function Loaders() {
  if (!(this instanceof Loaders)) {
    return new Loaders();
  }

  Object.defineProperties(this, {
    registry: {value: {}},
  });
}

Object.defineProperties(Loaders, {
  prototype: Object.defineProperties(Loaders.prototype, {
    constructor: {
      value: Loaders,
    },

    register: {
      value: function(name, descriptor) {
        if ('string' !== kindof(name)) {
          throw new TypeError('Invalid argument type');
        }

        if ('' === name) {
          throw new Error('Given name is empty string');
        }

        if ('function' === kindof(descriptor)) {
          descriptor = {value: descriptor};
        }

        if ('object' !== kindof(descriptor)) {
          throw new TypeError('Invalid argument type');
        }

        descriptor.configurable = true;
        descriptor.enumerable   = true;

        Object.defineProperty(this.registry, name, descriptor);
        return this;
      },
    },

    restore: {
      value: function() {
        Object.keys(this.registry).forEach(function(name) {
          delete this.registry[name];
        }, this);
        return this;
      },
    },
  }),
});

module.exports = Loaders;
