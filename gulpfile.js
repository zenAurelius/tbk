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

gulp.task('set-env', function() {
	process.env.MONGODB_URI = 'mongodb://loicbailly:dorine2845@ds147072.mlab.com:47072/tbk_database'
    return process.env.JWT_SECRET = 'secret';
});

gulp.task('start:server', ['set-env'], function(){
	plugins.nodemon({ext: 'html js', watch:['client', 'server'], ignore:'server/db'});
});

gulp.task('webpack', function() {
	return gulp.src('src/app.ts')
		.pipe(webpack( require('./webpack.config.js') ))
		.pipe(gulp.dest('public/'));
});

gulp.task('build', ['css', 'webpack']);