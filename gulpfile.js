'use strict'
const gulp = require('gulp')
const sass = require('gulp-sass')(require('node-sass'))
const overrideBrowserslist = require('gulp-autoprefixer') // 自动添加css前缀
const cleanCss = require('gulp-clean-css') // css压缩
const gulpInsert = require('gulp-append-prepend') // 配置公共变量scss
const gulpConcat = require('gulp-concat')

// 编译Sass
// Sass任务会编译src/目录下的scss文件，并把编译完成的css文件保存到/dist/styles目录中。

gulp.task('sass', function () {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(gulpInsert.prependFile('./src/assets/variable.scss'))
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(overrideBrowserslist({
      overrideBrowserslist: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCss())
    .pipe(gulp.dest('./lib/styles'))
})

gulp.task('generate-index', function () {
  console.log('run-index')
  return gulp.src(['./src/assets/variable.scss','./src/styles/**/*.scss'])
    .pipe(gulpConcat('index.scss'))
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(overrideBrowserslist({
      overrideBrowserslist: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCss())
    .pipe(gulp.dest('./lib/styles'))
})

// 默认任务
gulp.task('default', gulp.parallel('generate-index', 'sass'))
