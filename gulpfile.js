const gulp = require('gulp');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const useref = require('gulp-useref');
const wiredep = require('wiredep').stream;
const gulpif = require('gulp-if');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const purify = require('gulp-purifycss');

const cleanCss = require('gulp-clean-css');

const complexity = require('gulp-complexity');

const notify = require('gulp-notify');

gulp.task('clean', function () {
    var stream = gulp.src('dist/*', {read: false})
        .pipe(clean());
    return stream;
});


gulp.task('bower-files-dev', function () {
    var stream = gulp.src('./app/index.html')
        .pipe(wiredep({
            directory: 'bower_components'
        }))
        .pipe(useref())
        .pipe(gulpif('*.js', gulp.dest('./dist')));
    return stream;
});

//assets block: styles

gulp.task('sass', function () {
    var stream =  gulp.src('./app/assets/styles/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./app/assets/styles/'));
    return stream;
});

gulp.task('sass:watch', function () {
    gulp.watch('./app/styles/**/*.scss', ['sass']);
});

gulp.task('css-files-dev', function () {
    var content = ['./app/**/*.html', './app/**/*.js', './bower_components/**/*.js' +
    ''];
    var stream = gulp.src('./app/index.html')
        .pipe(useref())
        // .pipe(gulpif('*.css', purify(content)))
        // .pipe(gulpif('*.css', notify('I AM HERE'), cleanCss()))
        .pipe(gulpif('*.css', gulp.dest('./app/assets')));
    return stream;
});

gulp.task('css-files-prod', function () {
    var content = ['./app/**/*.html', './app/**/*.js'];
    var stream = gulp.src('./app/index.html')
        .pipe(useref())
        .pipe(gulpif('*.css', purify(content)))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulpif('*.css', gulp.dest('./app/assets')));
    return stream;
});

//assets block: files (html,images, fonts)

gulp.task('copy-html-files', function () {
    var stream =  gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./dist'));
    return stream;
});

gulp.task('image', function () {
    var stream =  gulp.src('./app/assets/img/*.*')
        .pipe(gulp.dest('./dist/assets/img'));
    return stream;

});

gulp.task('font', function () {
    var stream =  gulp.src('./app/assets/font/**/*.*')
        .pipe(gulp.dest('./dist/font/'));
    return stream;
});

//intitialize the app

gulp.task('initialize', function () {
    var stream =  gulp.src('./app/index.html')
        .pipe(wiredep({
            directory: 'bower_components'
        }))
        .pipe(useref())
        .pipe(gulp.dest('./dist'));
    return stream;
});

// analytics

gulp.task('complexity', function(){
    return gulp.src('./app/**/*.js')
        .pipe(complexity({breakOnErrors: false}));
});

// task sequences


gulp.task('dev', function (callback) {
    runSequence(
        'sass:watch',
        'sass',
        'css-files-dev',
        'bower-files-dev',
        'copy-html-files',
        'image',
        'font',
        'initialize',
        'connect',
        'watch',
        callback);
});

gulp.task('rebuild', function (callback) {
    runSequence(
        'sass:watch',
        'sass',
        'css-files-dev',
        // 'jscs',
        'bower-files-dev',
        'copy-html-files',
        'image',
        'font',
        'initialize',
        'reload',
        callback);
});

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port:8888
    });
});

gulp.task('reload', function () {
    connect.reload();
});

gulp.task('watch', function() {
    gulp.watch('./app/**/**/*.*', function (){
        runSequence('rebuild');
    });
});


gulp.task('default', function () {
    runSequence('clean', 'dev');
});