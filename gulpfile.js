// Gulpfile
// -----------------------------------------------------------------
'use strict';


// Deps
// -----------------------------------------------------------------
var gulp    = require('gulp');
var gutil   = require('gulp-util');
var webpack = require('webpack');
var compass = require('gulp-compass');


// Conf
// -----------------------------------------------------------------
var webpackConf = {
    entry: {
        main: './client/main',
    },
    output: {
        path:     __dirname + "/static/js",
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            warnings: true,
            compress: {
                drop_console: true
            },
            report: 'min'
        })
    ]
};

var compassConf = {
    style:    'compressed',
    comments: false,
    image:    'asset',
    css:      'static/css',
    sass:     'asset/scss'
};


// Tasks
// -----------------------------------------------------------------
gulp.task('webpack', function(callback) {
    webpack(webpackConf, (function(err, stats) {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
        callback();
    }));
});

gulp.task('compass', function() {
    gulp.src('asset/scss/*.scss')
        .pipe(compass(compassConf))
        .pipe(gulp.dest('static/css'));
});


// Export
// -----------------------------------------------------------------
gulp.task('default', ['compass', 'webpack']);

gulp.task('dev', ['compass', 'webpack'], function() {
    gulp.watch(['asset/scss/*.scss'], ['compass']);
    gulp.watch(['client/*.js', 'client/**/*.js'], ['webpack']);
});
