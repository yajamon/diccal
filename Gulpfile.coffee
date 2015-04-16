gulp = require 'gulp'
concat = require 'gulp-concat'
tsc = require 'gulp-typescript'

# main task
gulp.task 'build',['build-assets', 'build-typescript']

gulp.task 'default',['build']

# sub task
gulp.task 'build-assets',->
  gulp.src './assets/*'
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

