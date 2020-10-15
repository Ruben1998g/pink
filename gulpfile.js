var gulp = require('gulp');
var less = require('gulp-less');

var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

var minify = require("gulp-csso");
var rename = require("gulp-rename");


var imagemin = require("gulp-imagemin")
var webp = require("gulp-webp")

var del = require("del");

var browserSync = require("browser-sync").create();

gulp.task("browser-sync", function(done){
    browserSync.init({
        server:{
            baseDir:"./"
        },
        notify:false
    });
    browserSync.watch("/less").on("change", browserSync.reload);
done()
});

gulp.task('style', function(done){
    gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({stream:true}));
    done();
});

gulp.task("watch", gulp.series('style', "browser-sync", function(done){
    gulp.watch("less/**/*" , gulp.series("style"));
done()
}));

gulp.task("clean", function(){
    return del("build")
})

gulp.task("less", function(done){
    gulp.src('css/style.css')
    .pipe(plumber())
    .pipe(postcss([autoprefixer()]))
    .pipe(minify())
    .pipe(rename("style.css"))
    .pipe(gulp.dest("build/css"))
    done();
});

gulp.task("images", function(){
    return gulp.src("img/*{png,jpg}")

    .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.mozjpeg({progressive:true})
        ]))
    .pipe(gulp.dest("build/img"))
})

gulp.task("webp", function(){
    return gulp.src("build/img/*.{png,jpg}")
    .pipe(webp())
    .pipe(gulp.dest("build/img/webp"))
})

gulp.task("html", function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("build"))
})

gulp.task("copy", function(){
    return gulp.src([
        "fonts/**/*.{woff,woff2}",
        "js/**/*"
    ],{
        base:"."
    })

    .pipe(gulp.dest("build"))
})

gulp.task("build", gulp.series(
    "clean",
    "less",
    "images",
    "webp",
    "html",
    "copy"
    ));
