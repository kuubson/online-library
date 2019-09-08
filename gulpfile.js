const gulp = require('gulp');
const sass = require('gulp-sass');
const concatCSS = require('gulp-concat-css');
const uglifyCSS = require('gulp-uglifycss');

gulp.task('scss', () => {
    return gulp.src('src/assets/styles/*.scss')
        .pipe(sass())
        .pipe(concatCSS('index.css'))
        .pipe(uglifyCSS())
        .pipe(gulp.dest('src/assets/styles'));
});

gulp.task('watch', () => {
    gulp.watch('src/assets/styles/*.scss', gulp.series('scss'));
});