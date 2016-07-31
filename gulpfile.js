/*gulp require*/

var gulp = require('gulp');

/*gulp tasks*/

gulp.task('default', ['scripts']);

gulp.task('scripts',function(){
    gulp.src('bower_components/jquery/dist/jquery.js')
        .pipe(gulp.dest('app/js'));
})