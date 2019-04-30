// Add plugins
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Function for to compile Sass and add prefixes
function compileSass() {
  return gulp
      .src([
          './node_modules/normalize.scss/normalize.scss',
          './css/scss/**/*.scss',
      ])
      .pipe(sass({
          outputStyle: 'compressed'
      }))
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      .pipe(gulp.dest('./css/'))
      .pipe(browserSync.stream());
}
gulp.task('sass', compileSass); // Gulp task for function Sass


// Function for merge js
function gulpJS() {
  return gulp
      .src('./js/app/**/*.js')
      .pipe(concat('main.js'))
      .pipe(babel({
          presets: ['@babel/env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest('./js/'))
}
gulp.task('mainjs', gulpJS); // Gulp task for merge js

// JS Plugins
function pluginsJS() {
  return gulp
      .src([
          './node_modules/jquery/dist/jquery.min.js',
      ])
      .pipe(concat('plugins.js'))
      .pipe(gulp.dest('./js/'))
}

gulp.task('pluginsJS', pluginsJS);

// Function to init browser
function browser() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}
gulp.task('browser-sync', browser); // Gulp task for init browser sync

// Function gulp watch
function watch() {
  gulp.watch('./css/scss/**/*.scss', compileSass);
  gulp.watch(['./js/app/**/*.js'], gulpJS).on('change', browserSync.reload);
  gulp.watch(['./*.html']).on('change', browserSync.reload);
}
gulp.task('watch', watch); // Gulp task watch

// Gulp task default
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs', 'pluginsJS'));