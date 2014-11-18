// init gulp
var gulp   = require('gulp');

// init plugins
var plumber = require('gulp-plumber');
var sass    = require('gulp-sass');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');
var notify  = require('gulp-notify');
var connect = require('gulp-connect');

// error handler
var onError = function(error) {
  console.log(error);
}

// compile sass, without source map
gulp.task('sass', function() {
  return gulp.src('style/style.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('./'))
    .pipe(notify('SASS compiled.'))
});

// concatenate and uglify scripts
gulp.task('scripts', function() {
  return gulp.src('scripts/*.js')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('scripts.js'))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'))
    .pipe(notify('JS concatenated and uglified.'));
});

// start up server
gulp.task('server', function() {
  return connect.server({
    root: './',
    port: 3000
  });
});

// watch style and scripts
gulp.task('watch', function() {
  gulp.watch('style/*.scss', ['sass']);
  gulp.watch('scripts/*.js', ['scripts']);
});

// default task
gulp.task('default', ['server', 'sass', 'scripts', 'watch']);