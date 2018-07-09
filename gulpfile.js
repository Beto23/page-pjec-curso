const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

// Compile pug
gulp.task("pug", function() {
  return gulp
    .src(["src/index.pug", "src/index-intro.pug"])
    .pipe(pug())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

// Compile Sass & Inject Into Browser
gulp.task("sass", function() {
  return gulp
    .src(["./src/main.scss", "./src/main-intro.scss"])
    .pipe(sass({ outputStyle: "expended", sourceComments: true }))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task("css", function() {
  return gulp
    .src("src/main.css")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

// handle Images
gulp.task("images", function() {
  return gulp
    .src(["src/img/**/*.{png,jpg,jpeg,gif,svg}"])
    .pipe(gulp.dest("dist/img"));
});

// Watch & serve
gulp.task("serve", ["pug", "sass", "images", "css"], function() {
  browserSync.init({
    server: "dist"
  });

  gulp.watch(["src/**/*.pug"], ["pug"]);
  gulp.watch(["src/**/*.scss"], ["sass"]);
  gulp.watch(["src/**/*.css"], ["css"]);
  gulp.watch(["src/index.pug"]).on("change", browserSync.reload);
});

// Default task
gulp.task("default", ["serve"]);
