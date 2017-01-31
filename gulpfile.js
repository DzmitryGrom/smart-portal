/*global require, console*/

var gulp = require('gulp'),
  less = require('gulp-less'),
  watch = require('gulp-watch'),
  prettify = require('gulp-html-prettify');

var ccm = require('./ccm/ccm');
var ccmGulp = require('./ccm/ccm-gulp');

gulp.task('build', function () {
  gulp.src('./pages/*.json')
    .pipe(ccmGulp());

  gulp.src('./pages/*.less')
    .pipe(less())
    .pipe(gulp.dest('./pages'));

  gulp.src('./pages/*.html')
    .pipe(prettify({
      indent_char: ' ',
      indent_size: 2
    }))
    .pipe(gulp.dest('./pages/'));
});



gulp.task('dev', ['build'], function () {

  gulp.watch('./pages/*.json').on('change', function (event) {
    // event.type : added, changed, or deleted
    console.log(event.type + ' ' + event.path);

    if (event.type !== 'deleted') {
      // compile
      ccm(undefined, event.path);
    }

    gulp.src('./pages/*.html')
      .pipe(prettify({
        indent_char: ' ',
        indent_size: 2
      }))
      .pipe(gulp.dest('./pages/'));
  });

  gulp.watch('./pages/*.less').on('change', function (event) {
    // event.type : added, changed, or deleted
    console.log(event.type + ' ' + event.path);

    if (event.type !== 'deleted') {
      gulp.src(event.path)
        .pipe(less())
        .pipe(gulp.dest('./pages'));
    }
  });

  gulp.watch(['./blocks/**/*.less', './blocks.theme/**/*.less']).on('change', function (event) {
    // event.type : added, changed, or deleted
    console.log(event.type + ' ' + event.path);

    if (event.type !== 'deleted') {
      gulp.src('./pages/*.less')
        .pipe(less())
        .pipe(gulp.dest('./pages'));
    }
  });
});


gulp.task('default', ['build']);