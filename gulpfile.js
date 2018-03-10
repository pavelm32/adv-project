const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const webpack = require('webpack');

const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const gulpWebpack = require('gulp-webpack');
const moduleImporter = require("sass-module-importer");
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');

const del = require('del');

const buildPath = './public';
const sourcePath = './src';
const paths = {
    templates: {
        pages: `${sourcePath}/templates/pages/*.pug`,
        src: `${sourcePath}/templates/**/*.pug`,
        dest: `${buildPath}`
    },
    styles: {
        src: `${sourcePath}/styles/**/*.scss`,
        dest: `${buildPath}/css/`
    },
    scripts: {
        src: `${sourcePath}/scripts/**/*.js`,
        entry: `${sourcePath}/scripts/app.js`,
        dest: `${buildPath}/js/`
    },
    images: {
        src: `${sourcePath}/images/**/*.*`,
        dest: `${buildPath}/images/`
    },
    fonts: {
        src: `${sourcePath}/fonts/**/*.*`,
        dest: `${buildPath}/fonts/`
    }
};

gulp.task('clean', function () {
    return del(buildPath);
});

gulp.task('templates', function () {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: '\t' }))
        .pipe(gulp.dest(paths.templates.dest));
});

gulp.task('styles', function () {
    return gulp.src(paths.styles.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed', importer: moduleImporter()}))
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"],
                cascade: false
            })
        )
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('scripts', function () {
    return gulp.src(paths.scripts.entry)
        .pipe(plumber())
        .pipe(gulpWebpack(require('./webpack.config'), webpack))
        .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('images', function () {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('watch', function () {
    gulp.watch(paths.styles.src, gulp.series('styles'));
    gulp.watch(paths.templates.src, gulp.series('templates'));
    gulp.watch(paths.scripts.src, gulp.series('scripts'));
    gulp.watch(paths.images.src, gulp.series('images'));
    gulp.watch(paths.fonts.src, gulp.series('fonts'));
});

gulp.task('server', function() {
    browserSync.init({
        server: buildPath
    });
    browserSync.watch(buildPath + '/**/*.*', reload);
});

gulp.task('default', gulp.series(
    "clean",
    gulp.parallel("styles", "scripts", "templates", "images", "fonts"),
    gulp.parallel("watch", "server")
));