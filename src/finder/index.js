'use strict';
var kindof    = require('kind-of');
var readdir   = require('readdir');
var readsync  = readdir.readSync;
var camelcase = require('camelcase');
var fs        = require('fs');
var path      = require('path');

function Finder(options) {
  if (!(this instanceof Finder)) {
    return new Finder(options);
  }

  if ('object' !== kindof(options)) {
    options = {};
  }

  options.Loaders = options.Loaders
                 || require('../loaders');

  Object.defineProperties(this, {
    loaders: {value: new options.Loaders()},
  });

  if (options.dirname) {
    this.find(options.dirname, options.params);
  }
}

Object.defineProperties(Finder, {
  prototype: Object.defineProperties(Finder.prototype, {
    constructor: {
      value: Finder,
    },

    find: {
      value: function(dirname, params) {
        if ('string' !== kindof(dirname)) {
          throw new TypeError('Invalid argument type');
        }

        if ('' === dirname) {
          throw new Error('Given dirname is empty string');
        }

        if (!fs.existsSync(dirname)) {
          throw new TypeError('Directory not found: ' + dirname);
        }

        if ('array' !== kindof(params)) {
          params = [];
        }

        var opts  = readdir.NON_RECURSIVE + readdir.ABSOLUTE_PATHS;
        var files = readsync(dirname, ['**.js'], opts);
        var base  = path.resolve(process.cwd(), dirname) + path.sep;
        if ('array' !== kindof(files)) {
          return this;
        }
        files.forEach(function(file) {
          var name  = file.replace(RegExp('^' + base), '')
                          .replace(RegExp(path.extname(file) + '$'), '')
                          .replace(/\./g, '-')
                          .replace(RegExp(path.sep, 'g'), '-');
          var descriptor = require(file);
          if ('function' !== kindof(descriptor)) {
            throw new TypeError('Invalid import type');
          }
          descriptor = descriptor.apply(null, params);
          this.loaders.register(camelcase(name), descriptor);
        }, this);
        return this;
      },
    },
  }),
});

module.exports = Finder;
