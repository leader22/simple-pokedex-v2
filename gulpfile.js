'use strict';

var gulp    = require('gulp');
var compass = require('gulp-compass');

gulp.task('compass', function() {
    gulp.src('asset/scss/*.scss')
        .pipe(compass({
            config_file: 'config.rb',
            css:         'static/css',
            sass:        'asset/scss'
        }))
        .pipe(gulp.dest('static/css'));
});

gulp.task('default', ['compass']);
