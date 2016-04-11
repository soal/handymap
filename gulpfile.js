var gulp       = require("gulp"),
    gutil      = require("gulp-util"),
    browserify = require("browserify"),
    watchify   = require("watchify"),
    gulpif     = require("gulp-if"),
    uglify     = require("gulp-uglify"),
    concat     = require("gulp-concat"),
    source     = require("vinyl-source-stream"),
    buffer     = require("vinyl-buffer"),
    babel      = require("babelify"),
    sass       = require("gulp-sass"),
    globbing   = require("gulp-css-globbing"),
    sourcemaps = require("gulp-sourcemaps"),
    cleanCSS   = require("gulp-clean-css"),
    plumber    = require("gulp-plumber"),
    hoganify   = require("hoganify"),
    karma      = require("karma"),
    exec       = require("child_process").exec,
    execSync   = require("child_process").execSync;

var staticDir = "static",
    stylesDir = "app/styles",

    jsDir = "app/js",
    jsAppFile = `${jsDir}/app.js`;


var production = false;

gulp.task("set-production", () => {
  production = true;
  process.env.NODE_ENV = "production";
});

gulp.task("setup", () => {
  //TODO: Make setup task.
  //Install deps etc.
});

gulp.task("styles", () => {
  return gulp.src([ `${stylesDir}/app.sass` ])
    .pipe(gulpif(!production, plumber()))
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(sass({
      includePaths: [ "node_modules/bootstrap/scss/" ]
    })
    .on("error", sass.logError))
    .pipe(gulpif(production, cleanCSS({ compatibility: "ie10" })))
    .pipe(globbing({
        extensions: [ ".scss", ".sass" ]
     }))
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("app.css"))
    // .pipe(gulpif(production, rename({ suffix: ".min" })))
    .pipe(gulpif(!production, sourcemaps.write("./")))
    .pipe(gulp.dest(`${staticDir}/css`));
});

function compileJS(sourceFilePath, sourceFileName, destinationDir, watch) {
  var bundler = watchify(
    browserify(sourceFilePath, {
      debug: true
    })
    .transform(hoganify, { live: true, ext: ".mustache" })
    .transform(babel, { presets: [ "es2015" ] })
  );

  function rebundle() {
    bundler.bundle()
      .on("error", function(err) { console.error(err); this.emit("end"); })
      .pipe(source(sourceFileName))
      .pipe(buffer())
      .pipe(gulpif(!production, plumber()))
      // .pipe(gulpif(production, removeLogs()))
      .pipe(gulpif(production, uglify())) //FIXME: find a way to remove console.log in production safety
      .pipe(gulpif(!production, sourcemaps.init({ loadMaps: true })))
      .pipe(gulpif(!production, sourcemaps.write("./")))
      .pipe(gulp.dest(destinationDir));
  }

  if (watch) {
    bundler.on("update", () => {
      console.log("-> bundling...");
      rebundle();
      console.log("-> Bundled!");
    });
  }

  rebundle();
}

function watchJS(sourceFilePath, sourceFileName, destinationDir) {
  return compileJS(sourceFilePath, sourceFileName, destinationDir, true);
}

gulp.task("compileJS", () => compileJS(jsAppFile, "app.js", `${staticDir}/js`));
gulp.task("watchJS", () => watchJS(jsAppFile, "app.js",  `${staticDir}/js`));

// gulp.task("compileStyles", function() { return compileStyles(); });
// gulp.task("watchStyles", function() { return watchStyles(); });
//

gulp.task("test", done => {
  var log = gutil.log,
      colors = gutil.colors;

  log(colors.bgMagenta.bold.white("======= TESTING ======="));
  new karma.Server({
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: true
  }, done).start();
});

gulp.task("dev", ["watchJS", "styles"], ()=> {
  gulp.watch(`${stylesDir}/**/*.{sass, scss}`, [ "styles" ]);
});

gulp.task("buildDev", ["compileJS", "styles"]
  // FIXME: stop gulp process correctly
  // , ()=> process.exit()
);

gulp.task("prod", ["set-production", "compileJS", "styles"]
  // FIXME: stop gulp process correctly
  // , ()=> process.exit()
);

gulp.task("default", ["dev"]);
