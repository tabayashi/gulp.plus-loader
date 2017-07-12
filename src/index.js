'use strict';
var kindof = require('kind-of');

function Factory(dirname, params, options) {
  if (!(this instanceof Factory)) {
    return new Factory(dirname, params, options);
  }

  if ('object' !== kindof(options)) {
    options = {};
  }

  options.Finder  = options.Finder ||
                    require('./finder');

  options.dirname = dirname;
  options.params  = params;

  var finder = new options.Finder(options);
  return finder.loaders.registry;
}

module.exports = Factory;
