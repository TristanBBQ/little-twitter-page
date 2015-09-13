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
  SRC: 'src/',
  DIST: 'dist/',
  CSS: 'src/css/*.scss',
  MINIFIED_OUT: 'build.min.js',
  DEST: 'dist',
  ENTRY_POINT: './src/js/App.js',
  JSX: 'src/js/*.jsx'
};

gulp.task('copy-html', function(){
  gulp.src(path.SRC + '*.html')
  .pipe(gulp.dest(path.DIST));
  });

gulp.task('sass', function(){
  gulp.src(path.SRC + 'css/*.scss')
  .pipe(sass())
  .pipe(gulp.dest(path.DIST + 'css'));
  });

gulp.task('build-js', function() {
  var b = browserify();
  b.transform(babelify);
  b.transform(reactify);
  b.add('./src/js/App.jsx');
  return b.bundle()
    .pipe(source('build.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', function() {
  gulp.watch(path.SRC + '*.html', ['copy-html']);
  gulp.watch(path.SRC + 'css/*.scss', ['sass']);
  gulp.watch(path.SRC + 'js/*.jsx', ['build-js']);
});

gulp.task('connect', function() {
  connect.server({
    root: "dist",
    host: '0.0.0.0',
    port: 8080
    });
  });

gulp.task('default', ['copy-html', 'sass', 'build-js', 'watch', 'connect']);
