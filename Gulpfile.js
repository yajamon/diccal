// Generated by CoffeeScript 1.9.2
var gulp = require('gulp');
var concat = require('gulp-concat');
var tsc = require('gulp-typescript');
var bowerFiles = require('gulp-bower-files');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var path = require('path');

gulp.task('build', ['build:assets', 'build:typescript', 'build:bower:components', 'build:templates']);

gulp.task('default', ['build']);

gulp.task('watch', ['build'], function() {
  gulp.watch('./assets/**/*.*', ['build:assets']);
  gulp.watch('./src/ts/**/*.ts', ['build:typescript']);
  return gulp.watch('./src/tpl/**/*.hbs', ['build:templates']);
});

gulp.task('build:assets', function() {
  return gulp.src('./assets/**/*.*').pipe(gulp.dest('./dest/'));
});

gulp.task('build:typescript', function() {
  var tsOption;
  tsOption = {
    noImplicitAny: true,
    sortOutput: true,
    target: "ES5",
    sourceRoot: "./src/ts/rootFile.ts"
  };
  return gulp.src('./src/ts/**/*.ts').pipe(tsc(tsOption)).js.pipe(concat('app.js')).pipe(gulp.dest('./dest/js/'));
});

gulp.task('build:bower:components', function() {
  return bowerFiles().pipe(concat('vendors.js')).pipe(gulp.dest('./dest/js/'));
});

gulp.task('build:templates', function() {
  return gulp.src('./src/tpl/**/*.hbs').pipe(handlebars()).pipe(wrap('Handlebars.template(<%= contents %>)')).pipe(declare({
    namespace: 'Diccal.templates',
    noRedeclare: true,
    processName: function(filePath) {
      return declare.processNameByPath(filePath.replace('src' + path.sep + 'tpl' + path.sep, ''));
    }
  })).pipe(concat('templates.js')).pipe(gulp.dest('./dest/js/'));
});