var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var babelify = require('babelify');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

var path = {
  HTML: 'src/index.html',
  CSS: 'src/css/*.scss',
  MINIFIED_OUT: 'build.min.js',
  DEST: 'dist',
  ENTRY_POINT: './src/js/App.jsx'
};

gulp.task('copy-html', function(){
  gulp.src(path.HTML)
  .pipe(gulp.dest(path.DEST));
  });

gulp.task('sass', function(){
  gulp.src(path.CSS)
  .pipe(sass())
  .pipe(gulp.dest(path.DEST + '/css'));
  });

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy-html']);
  gulp.watch(path.CSS, ['sass']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [babelify, reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
    }));

  return watcher.on('update', function () {
    watcher.bundle()
    .pipe(source('build.js'))
    .pipe(gulp.dest(path.DEST + '/js'))
    })
  .bundle()
  .pipe(source('build.js'))
  .pipe(gulp.dest(path.DEST + '/js'));
  });

gulp.task('connect', function() {
  connect.server({
    root: "dist",
    host: '0.0.0.0',
    port: 8080
    });
  });

gulp.task('default', ['copy-html', 'sass', 'watch', 'connect']);
