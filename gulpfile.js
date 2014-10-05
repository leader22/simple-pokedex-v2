'use strict';

var gulp    = require('gulp');
var gutil   = require('gulp-util');
var compass = require('gulp-compass');
var webpack = require('webpack'),
    webpackConf = require('./webpack.config.js');

var webpackCompiler = webpack(webpackConf);

gulp.task('webpack', function(callback) {
    webpackCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('compass', function() {
    gulp.src('asset/scss/*.scss')
        .pipe(compass({
            style:    'compressed',
            comments: false,
            css:      'static/css',
            sass:     'asset/scss'
        }))
        .pipe(gulp.dest('static/css'));
});

gulp.task('default', ['compass', 'webpack']);

gulp.task('dev', ['compass', 'webpack'], function() {
    gulp.watch(['asset/scss/*.scss'], ['compass']);
    gulp.watch(['client/*.js', 'client/**/*.js'], ['webpack']);
});
