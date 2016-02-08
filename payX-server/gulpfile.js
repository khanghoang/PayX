var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var babel = require('gulp-babel');

gulp.task('babel', function() {
    return gulp.src('app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    nodemon({
        script: 'dist/index.js',
        ext: 'js html',
        ignore: 'dist/**/*',
        tasks: ['babel'],
        env: {
            'NODE_ENV': 'development'
        }
    });
});

gulp.task('default', ['babel', 'watch']);
