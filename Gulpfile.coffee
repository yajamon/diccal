gulp = require 'gulp'
concat = require 'gulp-concat'
tsc = require 'gulp-typescript'
bowerFiles = require 'gulp-bower-files'
handlebars = require 'gulp-handlebars'
wrap = require 'gulp-wrap'
declare = require 'gulp-declare'

# main task
gulp.task 'build',['build-assets', 'build-typescript', 'build-bower-components']

gulp.task 'default',['build']

# sub task
gulp.task 'build-assets',->
  gulp.src './assets/**/*.*'
    .pipe gulp.dest './dest/'

gulp.task 'build-typescript',->
  tsOption = {
    noImplicitAny : true,
    sortOutput: true,
    target: "ES5",
    sourceRoot: "./src/ts/root.ts"
  }
  gulp.src './src/ts/**/*.ts'
    .pipe tsc(tsOption)
    .js
    .pipe concat 'app.js'
    .pipe gulp.dest './dest/js/'

gulp.task 'build-bower-components',->
  bowerFiles()
    .pipe concat 'venders.js'
    .pipe gulp.dest './dest/js/'
