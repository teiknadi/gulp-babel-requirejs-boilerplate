var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var requirejsOptimize = require('gulp-requirejs-optimize');
var del = require('del');

// Clening public folder
gulp.task('cleanLibs', function () {
    return del(['public/libs/*']);
});
gulp.task('cleanJs', function () {
    return del(['public/.tmp/*', 'public/js/*']);
});

// Compiles js files along with source maps
gulp.task('babelJs', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/.tmp'));
});

// Copy libraries
gulp.task('copyLibs', ['cleanLibs'], function () {
    return gulp.src([
            'bower_components/requirejs/require.js',
            'bower_components/jquery/dist/jquery{,*}.{js,map}'
        ])
        .pipe(gulp.dest('public/libs'));
});

// Coping index
gulp.task('copyIndex', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('public'));
});

// Concatinating js files
gulp.task('requireJs', ['cleanJs', 'babelJs'], function () {
    return gulp.src('public/.tmp/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(requirejsOptimize({
            baseUrl: "public/.tmp",
            mainConfigFile: "public/.tmp/config.js",
            name: "main",
            out: "main.js",
            optimize: "uglify2",
            generateSourceMaps: true,
            preserveLicenseComments: false,
            useSourceUrl: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/js'));
});

// Watching files for changes
gulp.task('watch', function () {
    // watch html and reload browsers when it changes
    gulp.watch('src/index.html', ['copyIndex']);
    // do the same with the js files
    gulp.watch('src/js/**/*.js', ['requireJs']);
});

gulp.task('build', ['copyLibs', 'copyIndex', 'requireJs']);
gulp.task('default', ['watch']);