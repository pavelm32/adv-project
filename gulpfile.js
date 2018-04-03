const gulp = require('gulp');
const webpack = require('webpack');

const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const $gp = require("gulp-load-plugins")();
const moduleImporter = require("sass-module-importer");
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
        exld: `!${sourcePath}/images/icons/*.*`,
        svgsrc: `${sourcePath}/images/icons/*.svg`,
        svgdest: `${buildPath}/images/icons/`,
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

// gulp.task('templates', function () {
//     return gulp.src(paths.templates.pages)
//         .pipe($gp.pug({ pretty: '\t' }))
//         .pipe(gulp.dest(paths.templates.dest));
// });

gulp.task('styles', function () {
    return gulp.src(paths.styles.src)
        .pipe($gp.plumber())
        .pipe($gp.sassGlob())
        .pipe($gp.sourcemaps.init())
        .pipe(
            $gp.sass({
                outputStyle: 'compressed',
                importer: moduleImporter()
            })
        )
        .pipe(
            $gp.autoprefixer({
                browsers: ["last 2 versions"],
                cascade: false
            })
        )
        .pipe($gp.sourcemaps.write())
        .pipe($gp.rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(reload({ stream: true }));
});

gulp.task('scripts', function () {
    return gulp.src(paths.scripts.entry)
        .pipe($gp.plumber())
        .pipe($gp.webpack(require('./webpack.config'), webpack))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(reload({ stream: true }));
});

// спрайт иконок + инлайн svg
gulp.task("svg", done => {
    const prettySvgs = () => {
        return gulp
            .src(paths.images.svgsrc)
            .pipe(
                $gp.svgmin({
                    js2svg: {
                        pretty: true
                    }
                })
            )
            .pipe(
                $gp.cheerio({
                    run($) {
                        $("[fill], [stroke], [style], [width], [height]")
                            .removeAttr("fill")
                            .removeAttr("stroke")
                            .removeAttr("style")
                            .removeAttr("width")
                            .removeAttr("height");
                    },
                    parserOptions: { xmlMode: true }
                })
            )
            .pipe($gp.replace("&gt;", ">"));
    };

    prettySvgs()
        .pipe(
            $gp.svgSprite({
                mode: {
                    symbol: {
                        sprite: "../sprite.svg"
                    }
                }
            })
        )
        .pipe(gulp.dest(paths.images.svgdest));

    prettySvgs().pipe(
        $gp.sassInlineSvg({
            destDir: paths.images.svgsrc
        })
    );

    done();
});

gulp.task('images', function () {
    return gulp.src([paths.images.src/*, paths.images.exld*/])
        .pipe(gulp.dest(paths.images.dest));
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('watch', function () {
    gulp.watch(paths.styles.src, gulp.series('styles'));
    //gulp.watch(paths.templates.src, gulp.series('templates'));
    gulp.watch(paths.scripts.src, gulp.series('scripts'));
    gulp.watch(paths.images.src, gulp.series('images'));
    gulp.watch(paths.fonts.src, gulp.series('fonts'));
    gulp.watch(paths.templates.src).on("change", reload);
});

// сервер node.js
gulp.task("nodemon", done => {
    let started = false;
    $gp
        .nodemon({
            script: "server.js",
            env: { NODE_ENV: "development" },
            watch: "server.js"
        })
        .on("start", () => {
            if (started) return;
            done();
            started = true;
        });
});

gulp.task('server',

    gulp.series("nodemon", done => {
        browserSync.init({
            proxy: "http://localhost:3000",
            port: 8080,
            open: false
        });
    })

    // browserSync.init({
    //     server: buildPath
    // });
    // browserSync.watch(buildPath + '/**/*.*', reload);
);

gulp.task('build', gulp.series(
   // "svg",
    gulp.parallel("styles", "images", "fonts", "scripts")
));

gulp.task('default', gulp.series(
    "clean",
    gulp.parallel("styles", "scripts", "images", "fonts"),
    gulp.parallel("watch", "server")
));