
const gulp = require('gulp');
const path = require('path');
const gprint = require('gulp-print');
const debug = require('gulp-debug');
const gutil = require("gulp-util");
const del = require('del');
const sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const vinylPaths = require('vinyl-paths');
var webpack = require('webpack');
const webpack_stream = require('webpack-stream')
const webpackConfig = require('./webpack.config.js');
const browserSync = require('browser-sync').create();
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');


/***
 * join path util
 * @param base base path component to be prepended to filePath arg(s)
 * @param filePath string or array - paths to be prepended with basepath
 */
const joinPath = function( base, filePath ) {
  var result

  if (!filePath) {
    result = base
  } else if ( typeof filePath === 'string' ){
    result = './' + path.posix.join( base, filePath )
  } else {
    result = filePath.map(function( item ) {
      return './' + path.posix.join( base, item )
    })
  }

  return result
}

const getSrcPath = function(targetPath) {
  return joinPath('src/', targetPath)
}

const getSitePath = function(targetPath) {
  return joinPath('dist/', targetPath)
}

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};
var autoprefixerOptions = {
  browsers: ['last 5 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass',function(){
	return gulp.src(getSrcPath('scss/main.scss'))
	.pipe(sourcemaps.init())
	.pipe(sass(sassOptions).on('error', sass.logError))
	.pipe(sourcemaps.write())
	.pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(getSitePath('css')))
    .pipe(browserSync.stream())
	
    
})

// gulp.task('clean', () => {
//     return gulp.src(geSi)
//         .pipe(gprint())
//         .pipe(vinylPaths(del));
// });


gulp.task('js', function(){
	return gulp.src(getSrcPath('js/main.js'))
    	.pipe(webpack_stream(webpackConfig))
        .pipe(gulp.dest(getSitePath('js')))
        .pipe( debug({ title: 'webpack' }) )
    	.on('error', function (error) {
      	  gutil.log(error)
    	})


});
gulp.task('watch',function(){
	var watch = require('gulp-watch')
  	var batch = require('gulp-batch')
	var bundler = webpack(webpackConfig);
	browserSync.init({
	        server: {
	            baseDir: 'dist',

	            middleware: [
	                webpackDevMiddleware(bundler, {
	                    publicPath: webpackConfig.output.publicPath,
	                    stats: { colors: true }
	                }),
	                webpackHotMiddleware(bundler)
	            ],
	            files: getSitePath(['js/**/*.js', 'css/**/*.css', 'index.html'])
	       }
	});
	gulp.watch(getSrcPath('scss/**/*.scss'),gulp.parallel('sass'))
	gulp.watch(getSrcPath('js/**/*.js'),gulp.parallel('js'))
	gulp.watch(getSitePath('index.html')).on('change', browserSync.reload);
})

  

gulp.task('default', gulp.parallel('sass','js'));