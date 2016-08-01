/*
 * @file gulp file
 * @author leozhang2018 <leozhang2018@gmail.com>
 */

var gulp = require('gulp')
var rm = require('gulp-rm')
var rename = require("gulp-rename")
var less = require('gulp-less')
var base64 = require('gulp-base64')
var minifyCss = require('gulp-minify-css')
var imagemin = require('gulp-imagemin')
var runSequence = require('run-sequence')
var uglify = require('gulp-uglify')
var Autoprefixer = require('gulp-autoprefixer')
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var paths = {
    img: 'src/img/**',
    style: 'src/css/*.css',
    script: 'src/js/*.js',
    page: 'src/*.html'
}

gulp.task('clean', function() {
    return gulp.src('dist/**', {
            read: false
        })
        .pipe(rm())
})

gulp.task('img', function() {
    return gulp.src(paths.img, {
            base: 'src/img'
        })
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
})

gulp.task('style', function() {
    return gulp.src(paths.style, {
            base: 'src/css'
        })
        .pipe(base64({
            extensions: ['png', 'jpg'],
            // <= 10 KB
            maxImageSize: 10 * 1024,
            debug: false
        }))
        .pipe(Autoprefixer({
            browsers: [
                'last 2 versions',
                'ie >= 9',
                'Firefox >= 20',
                'Chrome >= 45',
                'iOS >= 7',
                'Android >= 4.4'
            ]
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('script', function() {
    return gulp.src(paths.script, {
            base: 'src/js'
        })
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('page', function() {
    return gulp.src(paths.page, {
            base: 'src'
        })
        .pipe(gulp.dest('./dist'))
})

gulp.task('watch', ['build'], function() {
    gulp.watch([paths.style, paths.img], function() {
        runSequence('style')
    })
    gulp.watch(paths.script, function() {
        runSequence('script')
    })
    gulp.watch([paths.page], function() {
        runSequence('page')
    })
})

gulp.task('build', ['clean'], function(cb) {
    runSequence(['img', 'style', 'script', 'page'], cb)
})

gulp.task('default', ['build'])


// 静态服务器 + 监听 scss/html/js 文件
gulp.task('serve', ['css-inject'], function() {

    browserSync.init({
        server: "./src"
    });
    gulp.watch("src/css/*.css", ['css-inject']);
    gulp.watch("src/*.html").on('change', reload);
    gulp.watch("src/living/*.html").on('change', reload);
    gulp.watch("src/js/*.js").on('change', reload);
});

// 将编译后的 css 将注入到浏览器里实现更新
gulp.task('css-inject', function() {
    return gulp.src(paths.style)
        .pipe(gulp.dest("src/css"))
        .pipe(reload({stream: true}));
});

gulp.task('bs', ['serve']);
