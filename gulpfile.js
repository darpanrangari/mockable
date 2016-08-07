/**
 * Copyright (c) 2016.  Created by Darpan Rangari on 5/8/16 8:57 PM
 *
 * This is a gulp configuration file
 * having development environment configuration details and production build
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

/*gulp tasks*/
gulp.task('default', ['scripts', 'angularMaterialCSS', 'materialScripts', 'serve']);

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: "app"
    });

    gulp.watch('app/sass/**/*.scss', ['sass']);

    gulp.watch("app/**/*.html").on('change', browserSync.reload);

});

// for js files
gulp.task('scripts', function () {
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',

    ])
        .pipe(rename('main.js'))
        .pipe(gulp.dest('app/js'));
});

// for angular material scripts js files
gulp.task('materialScripts', function () {
    return gulp.src([

        'bower_components/angular/angular.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-aria/angular-aria.min.js',
        'bower_components/angular-messages/angular-messages.min.js',
        'bower_components/angular-material/angular-material.min.js',
      //  'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'

    ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});
// compile sass to css, minify it and then rename to style.min.css
gulp.task('sass', function () {
    return gulp.src('app/sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

//sass watch not using anywhere
gulp.task('sass:watch', function () {
    gulp.watch('app/sass/**/*.scss', ['sass']);
});

// angular material and boostrap css
gulp.task('angularMaterialCSS', function () {
    return gulp.src([
        'bower_components/angular-material/angular-material.css',
        //'bower_components/bootstrap/dist/css/bootstrap.min.css'
    ])
        .pipe(rename('style_app.min.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});


