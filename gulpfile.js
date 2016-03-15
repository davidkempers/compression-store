var gulp       = require('gulp');
var nodemon    = require('gulp-nodemon');
var livereload = require('gulp-livereload');

gulp.task('develop', function () {
  nodemon({script: './bin/www', ext: 'js hjs json html', legacyWatch: true });
});

gulp.task('default', ['develop']);
