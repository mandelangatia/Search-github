var gulp = require('gulp');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var buildProduction = utilities.env.production;
var del = require('del');
var lib = require('bower-files')();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('jshint', function(){
  return gulp.src(['resources/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task("concatInterface", function(){
	gulp.src(["./resources/js/*-interface.js"])
	.pipe(concat("allConcat.js"))
	.pipe(gulp.dest("./tmp"))
});
gulp.task("jsBrowserify", ["concatInterface"], function(){
	return browserify({entries : ["./tmp/allConcat.js"]})
	.bundle()
	.pipe(source("app.js"))
	.pipe(gulp.dest("./build/js"))
});
gulp.task("minifyScripts", ["jsBrowserify"], function(){
	gulp.src(["./build/js/app.js"])
	.pipe(uglify())
	.pipe(gulp.dest("./build/js"))
});
gulp.task("build",["clean"], function(){
	if(buildProduction){
		gulp.start("minifyScripts");
	}
	else{
		gulp.start("jsBrowserify");
	}
  gulp.start("bower");
  gulp.start('cssBuild');
});
gulp.task("clean", function () {
	return del(["build", "tmp"]);
});
gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});
gulp.task('bowerCSS', function () {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});
//now combine the two tasks
gulp.task('bower', ['bowerJS', 'bowerCSS']);
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
        }
    });
    gulp.watch(['js/*.js'], ['jsBuild']); //for live reloading
    gulp.watch(['bower.json'], ['bowerBuild']);
    gulp.watch(['*.html'], ['htmlBuild']);
    gulp.watch(['resources/styles/*.css', 'resources/styles/*.scss'] ['cssBuild']);
});
gulp.task('jsBuild', ['jsBrowserify'], function() {
    browserSync.reload();
});
gulp.task('bowerBuild', ['Bower'], function() {
    browserSync.reload();
});
gulp.task('htmlBuild', function() {
    browserSync.reload();
});
gulp.task('cssBuild', function() {
  return gulp.src(['resources/styles/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});
