gulp = require 'gulp'
concat = require 'gulp-concat'
tsc = require 'gulp-typescript'
bowerFiles = require 'gulp-bower-files'
handlebars = require 'gulp-handlebars'
wrap = require 'gulp-wrap'
declare = require 'gulp-declare'
path = require 'path'

# main task
gulp.task 'build',[
  'build-assets',
  'build-typescript',
  'build-bower-components',
  'build-templates',
]

gulp.task 'default',['build']

gulp.task 'watch',['build'],->
  gulp.watch './assets/**/*.*',['build-assets']
  gulp.watch './src/ts/**/*.ts',['build-typescript']
  gulp.watch './src/tpl/**/*.hbs',['build-templates']

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
    .pipe concat 'vendors.js'
    .pipe gulp.dest './dest/js/'

gulp.task 'build-templates',->
  gulp.src './src/tpl/**/*.hbs'
    .pipe handlebars()
    .pipe wrap 'Handlebars.template(<%= contents %>)'
    .pipe declare {
      namespace: 'Diccal.templates',
      noRedeclare: true,
      processName: (filePath) ->
        declare.processNameByPath filePath.replace 'src'+path.sep+'tpl'+path.sep,''
    }
    .pipe concat 'templates.js'
    .pipe gulp.dest './dest/js/'
