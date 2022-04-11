const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const browsersync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const pug = require('gulp-pug');
const { src, dest, watch,series } = require('gulp');
const { notify, reload } = require('browser-sync');

function browserSync(cb){
    browsersync.init({
        notify:false,
        server: {
            baseDir: './'
        }
    })
    cb();
}

function browsersyncReload(cb){
    browsersync.reload();
    cb();
}

function htmlTask() {
    return src('./views/*.pug')
    .pipe(pug())
    .pipe(dest('./'))
}

function cssTask() {
    return src('./scss/main.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(postcss([cssnano()]))
    .pipe(dest('./'))
}

function watchTask(){
    watch('./*.html',browsersyncReload)
    watch('./views/**/*.pug',series(htmlTask,browsersyncReload));
    watch('./scss/**/*.scss',series(cssTask,browsersyncReload));
}

exports.default= series(
    browserSync,
    htmlTask,
    cssTask,
    watchTask
);