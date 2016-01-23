const gulp = require('gulp');
const inline = require('gulp-inline');
const inlineConfig = {
    base: './',
    disabledTypes: ['svg', 'img']
};

gulp.task('inline', () =>
    gulp.src(['./src/index.html'])
        .pipe(inline(inlineConfig))
        .pipe(gulp.dest('./'))
);

gulp.task('build', ['inline']);