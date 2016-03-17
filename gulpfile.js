var gulp       = require("gulp"),
    gulpif     = require("gulp-if"),
    uglify     = require("gulp-uglify"),
    concat     = require("gulp-concat"),
    babel      = require("gulp-babel"),
    stylus     = require("gulp-stylus"),
    sourcemaps = require("gulp-sourcemaps"),
    minifyCSS  = require("gulp-minify-css"),
    rename     = require("gulp-rename"),
    removeLogs = require("gulp-removelogs"),
    // clean      = require("gulp-clean"),
    plumber    = require("gulp-plumber"),
    exec       = require("child_process").exec;

var appName = "app";
var staticPath = appName + "/static";

var stylesPath = appName + "/frontend/styles";
var jsPath = appName + "/frontend/js";

var production = false;

gulp.task("styles", function() {
  gulp.src([ stylesPath + "/**/*.styl" ])
    .pipe(gulpif(!production, plumber()))
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(stylus())
    .pipe(gulpif(production, minifyCSS()))
    .pipe(concat("app.css"))
    .pipe(gulpif(production, rename({ suffix: ".min" })))
    .pipe(gulpif(!production, sourcemaps.write("./")))
    .pipe(gulp.dest(staticPath + "/css"));
});

gulp.task("js", function() {
  gulp.src(jsPath + "/**/*.js")
    .pipe(gulpif(!production, plumber()))
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(babel({ presets: ["es2015"] }))
    .pipe(concat("app.js"))
    .pipe(gulpif(production, removeLogs()))
    .pipe(gulpif(production, uglify()))
    .pipe(gulpif(production, rename({ suffix: ".min" })))
    .pipe(gulpif(!production, sourcemaps.write("./")))
    .pipe(gulp.dest(staticPath + "/js"));
});

gulp.task("flask", function() {
  exec("python ./manage.py runserver", function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task("dev", ["flask", "js", "styles"], function() {
  gulp.watch(jsPath + "/**/*.js", ["js"]);
  gulp.watch(stylesPath + "/**/*.styl", ["styles"]);

});

gulp.task("prod", ["js", "styles"]);

gulp.task("default", ["dev"]);