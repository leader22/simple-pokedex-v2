'use strict';

var gulp    = require('gulp');
var gutil   = require('gulp-util');
var compass = require('gulp-compass');
var webpack = require('webpack');

// gulp.task('webpack', function() {
//     gulp.src('./client/main.js')
//         .pipe(webpack(require('./webpack.config.js')))
//         .pipe(gulp.dest('static/js'));
// });
gulp.task('webpack', function(callback) {
    webpack(require('./webpack.config.js'), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('compass', function() {
    gulp.src('asset/scss/*.scss')
        .pipe(compass({
            config_file: 'config.rb',
            css:         'static/css',
            sass:        'asset/scss'
        }))
        .pipe(gulp.dest('static/css'));
});

gulp.task('default', ['compass', 'webpack']);
