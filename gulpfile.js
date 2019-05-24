const gulp = require('gulp');
const sass = require('gulp-sass');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

const config = {
  output: './build',
  input: './client'
};

function scripts() {
    return browserify({ entries: `${config.input}/app.js`})
    .transform('babelify', {presets: ['@babel/preset-env']})
    .bundle()
    .pipe(source('app.js')) 
    .pipe(buffer()) 
    .pipe(gulp.dest(config.output));
}

function styles() {
  return gulp.src(`${config.input}/app.scss`)
    .pipe(sass())
    .pipe(gulp.dest(config.output));
}

function html() {
  return gulp.src(`${config.input}/index.html`)
    .pipe(gulp.dest(config.output));
}

function watch() {
  gulp.watch(`${config.input}/**/*.js`, scripts);
  gulp.watch(`${config.input}/**/*.scss`, styles);
  gulp.watch(`${config.input}/**/*.html`, html);
}

exports.watch = watch;
exports.build = gulp.series(gulp.parallel(styles, scripts, html));
