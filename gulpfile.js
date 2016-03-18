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
    bowerFiles = require("main-bower-files"),
    filter     = require("gulp-filter"),
    exec       = require("child_process").exec;

var appName = "handymap",
    staticPath = appName + "/static",
    stylesPath = appName + "/frontend/styles",
    jsPath = appName + "/frontend/js",
    vendorPath = appName + "/frontend/vendor";


var production = false;

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

gulp.task("js", function() {
  return gulp.src(jsPath + "/**/*.js")
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

gulp.task("vendor", function() {
  var jsFilter = filter("**/*.js");
  var cssFilter = filter("**/*.css");

  var vendors = bowerFiles();
  return gulp.src(vendors,
    { base: vendorPath }
    )
    .pipe(jsFilter)
    .pipe(concat("vendor.js"))
    .pipe(gulpif(production, uglify()))
    .pipe(gulp.dest(staticPath + "/js"))
    // .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(concat("vendor.css"))
    .pipe(gulpif(production, minifyCSS()))
    .pipe(gulp.dest(staticPath + "/css"));
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
  gulp.watch("bower.json",["vendor"]);

});

gulp.task("prod", ["vendor", "js", "styles"]);

gulp.task("default", ["dev"]);