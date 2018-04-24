//Gulpfile.js

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps"),
    minifyCSS = require("gulp-minify-css"),
    autoprefixer = require("gulp-autoprefixer"),
    imagemin = require('gulp-imagemin'),
    imageminMozjpeg = require('imagemin-mozjpeg'),
    cache = require('gulp-cache'),
    path = {
        // Concat files
        srcJS: "dependencias/1.ConcatenarJS/",
        srcCSS: "dependencias/2.ConcatenarCss/",
        srcImg: "dist/assets/img/originales/marzo/",

        // minify files
        srcMiniJs: "dist/assets/js/preproduccion/",
        srcMiniCss: "dist/assets/css/preproduccion/"
    };
// watch = require("gulp-watch"),
// copy = require("gulp-copy"),
// bower = require("gulp-bower"),

// build minify files
gulp.task("minify", function () {
    return gulp.src([
        // path.srcMiniJs + '2-tmx-v0.1.js'
        path.srcMiniCss + '2-tmx-v0.1.css'
    ])
    // JS
    // .pipe(sourcemaps.init())
    // .pipe(rename("2-tmx-v0.1.min.js"))
    // .pipe(uglify())

    // CSS
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(rename("2-tmx-v0.1.min.css"))
    .pipe(gulp.dest("dependencias/4.Minificar"));
});

//build bundle js
gulp.task("compileJS", function () {
    // return gulp.src("dependencias/1.ConcatenarJS/*.js")
    return gulp.src([
            path.srcJS + 'foundation.min.js',
            path.srcJS + 'slick.min.js',
            path.srcJS + 'lightcase.js',
            path.srcJS + 'QD_infinityScroll.min.js',
            path.srcJS + 'sweetalert2.min.js',
            path.srcJS + 'what-input.js',
            path.srcJS + 'whatsapp.min.js',
            path.srcJS + 'barba.min.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat("tmx-bundle.js"))
        .pipe(gulp.dest("dist/assets/js/preproduccion"))
        .pipe(rename("tmx-bundle.min.js"))
        .pipe(uglify())
        //    .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist/assets/js/preproduccion"));
});

//build bundle css
gulp.task("compileCSS", function () {
    // return gulp.src("dependencias/1.ConcatenarJS/*.js")
    return gulp.src([
            path.srcCSS + 'foundation.min.css',
            // path.srcCSS + 'slick.min.css',
            // path.srcCSS + 'slick-theme.min.css',
            path.srcCSS + 'CoverPop.css',
            path.srcCSS + 'infinityScroll.css',
            path.srcCSS + 'sweetalert2.min.css'
        ])
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat("tmx-bundle.css"))
        .pipe(gulp.dest("dist/assets/css/preproduccion"))
        .pipe(rename("tmx-bundle.min.css"))
        .pipe(gulp.dest("dist/assets/css/preproduccion"));
});

// img opti
gulp.task('optiImg', function () {
    return gulp.src([
            path.srcImg + 'banners-categDepto/*'
            ])
        // .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(imagemin([
            imageminMozjpeg({
                quality: 60
            })
        ]))
        .pipe(gulp.dest('dist/assets/img/optimizadas/marzo'));
});