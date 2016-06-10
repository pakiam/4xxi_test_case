'use strict';

var gulp=require('gulp');
var postcss=require('gulp-postcss');
var autoprefixer=require('autoprefixer');
var csslint = require('gulp-csslint');
var jslint = require('gulp-jslint');
var imagemin = require('gulp-imagemin');
var concat=require('gulp-concat');
var sourcemaps=require('gulp-sourcemaps');
var gulpIf=require('gulp-if');

var nested=require('postcss-nested');
var short=require('postcss-short');
var assets=require('postcss-assets');
var cssimport=require('postcss-import');
var simplevars=require('postcss-simple-vars');
var cssnano=require('cssnano');

var isDevelopment=process.env.NODE_ENV || process.env.NODE_ENV == 'development';


gulp.task('styles',function () {
   var processors=[
       cssimport,
       simplevars({silent:true}),
       nested,
       short,
       autoprefixer({browsers:['last 3 versions']}),
       cssnano
   ];
    return gulp.src('dev/styles/style.css',{base: 'dev'})
        .pipe(gulpIf(isDevelopment,sourcemaps.init()))
        .pipe(postcss(processors))
        .pipe(gulpIf(isDevelopment,sourcemaps.write('.')))
        .pipe(gulp.dest('public'));
});

//javascripts
gulp.task('javascripts',function () {
    var processors=[
    ];
    return gulp.src('dev/js/main.js',{base: 'dev'})
        .pipe(postcss(processors))
        .pipe(gulp.dest('public'));
});
// images
gulp.task('images', function() {
    return gulp.src('dev/i/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('assets',function () {
   return gulp.src('dev/assets/**')
       .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
    gulp.watch('dev/styles/style.css',function () {
        gulp.run('styles')
    });
});

// Отслеживание
gulp.task('watch', function() {

    // Отслеживание файлов .css
    gulp.watch('dev/styles/**/*.css', ['styles']);

    // Отслеживание файлов .js
    gulp.watch(['dev/js/**/*.js','main.js'], ['javascripts']);

    // Отслеживание файлов assets
    gulp.watch('assets/**/*', ['assets']);

    // Отслеживание всех файлов в папке dev/, перезагрузка при изменении
    gulp.watch("dev/*.html");

});

gulp.task('default', ['styles', /*'images',*/ 'javascripts', 'assets', 'watch']);
//gulp.task('build', gulp.series(gulp.parallel('styles','assets')));