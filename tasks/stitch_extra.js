/*
 * grunt-stitch-extra
 * https://github.com/fahad19/grunt-stitch-extra
 *
 * Copyright (c) 2013 Fahad Ibnay Heylaal
 * Licensed under the MIT license.
 */

'use strict';

var stitch = require('stitch-extra');

module.exports = function(grunt) {

  grunt.registerMultiTask('stitch_extra', 'Stitch files as CommonJS', function() {
    var done = this.async();
    var options = this.options();

    var getStitchOptions = function(f) {
      return {
        compilers: f.compilers || {},
        dependencies: f.dependencies || [],
        ignore: f.ignore || [],
        paths: f.paths || [],
        identifier: f.identifier || null,
        listModules: f.listModules || false,
        listModulesIdentifier: f.listModulesIdentifier || null
      };
    };

    var compile = function(options, dest, callback) {
      var stitchPackage = stitch.createPackage(options);
      stitchPackage.compile(function(err, src) {
        grunt.file.write(dest, src);
        grunt.log.writeln('File "' + dest + '" created.');
        callback();
      });
    };

    grunt.util.async.forEachSeries(this.files, function(f, nextFileObj) {
      var dest = f.dest;
      var stitchOptions = getStitchOptions(f);
      compile(stitchOptions, dest, nextFileObj);
    }, done);
  });

};
