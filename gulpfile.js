'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var webpack = require('webpack-stream');

var paths = {
	cssSource : './src/less/',
	cssDist: './public/assets/css/'
}


gulp.task('css', function () {
  return gulp.src(paths.cssSource + 'app.less')
	.pipe( plugins.plumber({
				errorHandler: function (err) {
					console.log(err);
					this.emit('end');
				}
			}))
    .pipe(plugins.less())
	.pipe(plugins.csscomb())
	.pipe(plugins.cssbeautify({indent: '	'}))
	.pipe(gulp.dest(paths.cssDist));
});


gulp.task('webpack', function() {
	return gulp.src('src/app.ts')
		.pipe(webpack( require('./webpack.config.js') ))
		.pipe(gulp.dest('public/'));
});

gulp.task('build', ['css', 'webpack']);