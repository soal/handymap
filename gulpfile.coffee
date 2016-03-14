gulp       = require "gulp"
gulpif     = require "gulp-if"
uglify     = require "gulp-uglify"
concat     = require "gulp-concat"
coffee     = require "gulp-coffee"
stylus     = require "gulp-stylus"
sourcemaps = require "gulp-sourcemaps"
minifyCSS  = require "gulp-minify-css"
rename     = require "gulp-rename"
removeLogs = require "gulp-removelogs"
clean      = require "gulp-clean"
plumber    = require "gulp-plumber"
# exec       = require "gulp-exec"
exec       = require("child_process").exec

appName = "app"
staticPath = "#{appName}/static"

stylesPath = "#{appName}/frontend/styles"
jsPath = "#{appName}/frontend/js"

production = false

gulp.task("styles", ->
  gulp.src([
    "#{stylesPath}/**/*.styl"
    ])
    .pipe gulpif(!production, plumber())
    .pipe gulpif(!production, sourcemaps.init())
    .pipe stylus()
    .pipe gulpif(production, minifyCSS())
    .pipe concat("app.css")
    .pipe gulpif(production, rename({ suffix: ".min" }))
    .pipe gulpif(!production, sourcemaps.write("./"))
    .pipe gulp.dest("#{staticPath}/css")
  )

gulp.task("js", ->
  gulp.src([
    "#{jsPath}/**/*.{js,coffee}"
    ])
    .pipe gulpif(!production, plumber())
    .pipe gulpif(!production, sourcemaps.init())
    .pipe gulpif( /[.]coffee$/, coffee() )
    .pipe concat("app.js")
    .pipe gulpif(production, removeLogs())
    .pipe uglify()
    .pipe gulpif(production, rename({ suffix: ".min" }))
    .pipe gulpif(!production, sourcemaps.write("./"))
    .pipe gulp.dest("#{staticPath}/js")
  )

# gulp.task("flask", ->
#     options =
#       continueOnError: false
#       pipeStdout: false
#       customTemplatingThing: false

#     reportOptions =
#       err: true
#       stderr: true
#       stdout: true

#     gulp.src "./**/**"
#       .pipe exec("./server.py")
#       # .pipe exec.reporter(reportOptions)
#   )
gulp.task("flask", ->
  exec('./server.py', (err, stdout, stderr) ->
    console.log stdout
    console.log stderr
    # cb err
  )
)

gulp.task("dev", ["flask", "js", "styles"], ->
  gulp.watch("#{jsPath}/**/*.{js,coffee}", ["js"])
  gulp.watch("#{stylesPath}/**/*.styl", ["styles"])
  )

gulp.task("prod", ["js", "styles"])

gulp.task("default", ["dev"])