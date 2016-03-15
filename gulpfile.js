var gulp       = require("gulp"),
    browserify = require("browserify"),
    watchify   = require("watchify"),
    gulpif     = require("gulp-if"),
    uglify     = require("gulp-uglify"),
    concat     = require("gulp-concat"),
    source     = require("vinyl-source-stream"),
    buffer     = require("vinyl-buffer"),
    babel      = require("babelify"),
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
var jsAppFile = appName + "/frontend/js/app.js";

var production = false;

gulp.task("set-production", function() {
  production = true;
});

gulp.task("styles", function() {
  return gulp.src([ stylesPath + "/**/*.styl" ])
    .pipe(gulpif(!production, plumber()))
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(stylus())
    .pipe(gulpif(production, minifyCSS()))
    .pipe(concat("app.css"))
    .pipe(gulpif(production, rename({ suffix: ".min" })))
    .pipe(gulpif(!production, sourcemaps.write("./")))
    .pipe(gulp.dest(staticPath + "/css"));
});

function compileJS(watch) {
  var bundler = watchify(browserify(jsAppFile, { debug: true }).transform(babel, { presets: ["es2015"] }));

  function rebundle() {
    bundler.bundle()
      .on("error", function(err) { console.error(err); this.emit("end"); })
      .pipe(source("app.js"))
      .pipe(buffer())
      .pipe(gulpif(!production, plumber()))
      .pipe(gulpif(production, removeLogs()))
      .pipe(gulpif(production, uglify()))
      .pipe(gulpif(!production, sourcemaps.init({ loadMaps: true })))
      .pipe(gulpif(!production, sourcemaps.write("./")))
      .pipe(gulp.dest(staticPath + "/js"));
  }

  if (watch) {
    bundler.on("update", function() {
      console.log("-> bundling...");
      rebundle();
    });
  }

  rebundle();
}

function watchJS() {
  return compileJS(true);
}

gulp.task("compileJS", function() { return compileJS(); });
gulp.task("watchJS", function() { return watchJS(); });

// gulp.task("compileStyles", function() { return compileStyles(); });
// gulp.task("watchStyles", function() { return watchStyles(); });

gulp.task("flask", function() {
  return exec("./server.py", function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task("dev", ["flask", "watchJS", "styles"], function() {
  gulp.watch(stylesPath + "/**/*.styl", ["styles"]);
});

gulp.task("prod", ["compileJS", "styles"]);

gulp.task("default", ["dev"]);

