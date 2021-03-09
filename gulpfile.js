// Load plugins.
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync').create();
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');

// Configuration.
var config = {};
config.sass = {
  srcFiles: 'sass/main.scss',
  watchFiles: ['sass/main.scss', 'sass/**/*.scss'],
  destDir: 'css',
};

// CSS task.
function css(done) {
  return gulp
    .src(config.sass.srcFiles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.sass.destDir))
    .pipe(browsersync.stream());
  done();
}

// Watch files.
function watch() {
  gulp.watch(config.sass.watchFiles, gulp.series(css));
}

// Default task
const start = gulp.series(css, watch);

exports.css = css;
exports.watch = watch;
exports.default = start;
