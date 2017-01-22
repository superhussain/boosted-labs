var gulp = require('gulp');

// plugins
var uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('autoprefixer-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    pngcrush = require('imagemin-pngcrush'),
    browserSync = require('browser-sync');

// error log
function errorLog(error) {
  console.error.bind(error);
  this.emit('end');
}

// ### TASKS ###################

// browsersync task
gulp.task('browser-sync', ['styles'], function () {
  browserSync.init({
    server: {
      baseDir: "./",
      serveStaticOptions: {
        extensions: ['html']
      }
    }
  });
});

// scripts task
gulp.task('scripts', function() {
  gulp.src('js/*.js')
  .pipe(uglify())
  .on('error', errorLog)
  .pipe(gulp.dest('js/build'))
  .pipe(browserSync.reload({stream: true}));
});

// styles task
gulp.task('styles', function() {
  return gulp.src('./styl/*.styl')
  .pipe(sourcemaps.init())
  .pipe(stylus({
		use: [autoprefixer('last 7 versions')]
  }))
  .on('error', errorLog)
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.reload({stream: true}));
});

// image task
gulp.task('image', function() {
  gulp.src('img/*')
  .pipe(imagemin({
    verbose: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngcrush()]
  }))
  .pipe(gulp.dest('img'));
});

// html task
gulp.task('html', function() {
  gulp.src('./**/*.html')
  .pipe(browserSync.reload({stream: true}));
})

// watch task
gulp.task('watch', function() {
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('styl/**/*', ['styles']);
  gulp.watch('./**/*.html', ['html']);
});

// default task
gulp.task('default', ['scripts', 'styles', 'html', 'browser-sync', 'watch']);
