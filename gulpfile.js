var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    imageMin = require('gulp-imagemin');

gulp.task('styles', function() {
  gulp.src(['src/styles/**/*.css'])
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/styles'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  gulp.src(['src/scripts/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/scripts'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  gulp.src(['src/img/**/*'])
    .pipe(imageMin())
    .pipe(gulp.dest('build/img'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  gulp.src(['src/**/*.html'])
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

gulp.task('default', function() {
  browserSync.init({
    server: './build'
  });

  gulp.watch('src/styles/**/*.css', ['styles']);
  gulp.watch('src/scripts/**/*.css', ['scripts']);
  gulp.watch('src/img/**/*', ['images']);
  gulp.watch('src/**/*.html', ['html']);
});
