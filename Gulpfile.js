/// <reference path="typings/gulp/gulp.d.ts" />
/// <reference path="typings/gulp-typescript/gulp-typescript.d.ts" />

var gulp = require('gulp');
var concat = require('gulp-concat');
var tsc = require('gulp-typescript');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var path = require('path');

gulp.task('build', ['build:assets', 'build:typescript', 'build:vendor:js', 'build:templates']);

gulp.task('default', ['build']);

gulp.task('watch', ['build'], function() {
  gulp.watch('./assets/**/*.*', ['build:assets']);
  gulp.watch('./src/ts/**/*.ts', ['build:typescript']);
  return gulp.watch('./src/tpl/**/*.hbs', ['build:templates']);
});

gulp.task('build:assets', function() {
  return gulp.src('./assets/**/*.*').pipe(gulp.dest('./dest/'));
});

var tsProject = tsc.createProject('tsconfig.json', {out: "app.js"});
gulp.task('build:typescript', function() {
  var tsResult = gulp.src('./src/ts/**/*.ts')
    .pipe(tsc(tsProject));
  return tsResult.js.pipe(gulp.dest('./dest/js/'));
});

gulp.task('build:vendor:js', function() {
  return gulp.src(["./node_modules/jquery/dist/jquery.js", "./node_modules/handlebars/dist/handlebars.js"])
    .pipe(concat('vendors.js')).pipe(gulp.dest('./dest/js/'));
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
