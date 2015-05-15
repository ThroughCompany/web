/* ========================================================================
 * Dependencies
 * ========================================================================= */
var NODE_ENV = process.env.WERCKER_GIT_BRANCH || process.env.NODE_ENV || process.argv[3];
var ENV = setupEnv(NODE_ENV);
var ENV_PROD = (ENV == 'production');

var appConfig = require('./config/appConfig')[ENV];

var fs = require('fs')
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var karma = require('karma').server;
var less = require('gulp-less');
var uglify = require('gulp-uglifyjs');
var replace = require('gulp-replace');
var sh = require('shelljs');
var watch = require('gulp-watch');
var protractor = require('gulp-protractor').protractor;
var wrap = require('gulp-wrap');
var concat = require('gulp-concat');
//var fontcustom = require('fontcustom');

require('gulp-task-list')(gulp);

console.log('\n\nENV: ' + ENV + '\n\n');

/* =========================================================================
 * Constants
 * ========================================================================= */
var BUILDDIR = 'build';

//js
var MINIFIED_SRC_SCRIPT = 'throughcompanyApp.min.js';
var MINIFIED_VENDOR_SCRIPT = 'throughcompanyLibs.min.js';
var UGLIFYOPTIONS = {
  mangle: true,
  compress: true
};

var VENDOR_JS = [
  BUILDDIR + '/bower_components/console-polyfill/index.js',
  BUILDDIR + '/bower_components/angular/angular.js',
  BUILDDIR + '/bower_components/bootstrap/dist/js/bootstrap.js',
  BUILDDIR + '/bower_components/angular-resource/angular-resource.js',
  BUILDDIR + '/bower_components/angular-ui-router/release/angular-ui-router.js',
  BUILDDIR + '/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
  BUILDDIR + '/bower_components/underscore/underscore.js',
  BUILDDIR + '/bower_components/angular-animate/angular-animate.js',
  BUILDDIR + '/bower_components/angular-sanitize/angular-sanitize.js',
  BUILDDIR + '/bower_components/angular-ui-select/dist/select.js',
  BUILDDIR + '/bower_components/angular-scroll/angular-scroll.js',
  BUILDDIR + '/bower_components/textAngular/src/textAngular.js',
  BUILDDIR + '/bower_components/textAngular/src/textAngularSetup.js',
  BUILDDIR + '/bower_components/rangy/rangy-core.js',
  BUILDDIR + '/bower_components/rangy/rangy-selectionsaverestore.js',
  BUILDDIR + '/bower_components/moment/moment.js',
  BUILDDIR + '/bower_components/toastr/toastr.js',
  BUILDDIR + '/bower_components/bootstrap-daterangepicker/daterangepicker.js',
  BUILDDIR + '/vendor/js/rfc6902.js',
  BUILDDIR + '/vendor/js/ng-bs-animated-button.js'
];

//css
var MINIFIED_VENDOR_CSS = 'throughcompanyLibs.css';

var LESSOPTIONS = {
  compress: ENV_PROD
};

var VENDOR_CSS = [
  BUILDDIR + '/fonts/fonts.css',
  BUILDDIR + '/font-glyphs/fontcustom.css',
  BUILDDIR + '//bower_components/toastr/toastr.css',
  BUILDDIR + '/bower_components/textAngular/src/textAngular.css',
  BUILDDIR + '/bower_components/angular-ui-select/dist/select.css',
  BUILDDIR + '/bower_components/bootstrap-daterangepicker/daterangepicker-bs3.css'
];

/* =========================================================================
 * Tasks
 * ========================================================================= */

/**
 * List gulp tasks
 */
gulp.task('?', function(next) {
  sh.exec('gulp task-list')
  next();
});

/**
 * Clean the build directory
 */
gulp.task('clean', function(next) {
  sh.rm('-rf', BUILDDIR);
  next();
});

// Copy src folder to build directory
gulp.task('copy', ['clean', 'copy-bower', 'copy-vendor'], function(next) {
  //exclude bower_compoents js files
  return _init(gulp.src(['src/**/*.*', '!src/vendor/js/**/*.*', 'src/bower_components/**/*.css', 'src/bower_components/**/*.less', 'src/bower_components/**/*.html', '!src/bower_components/**/*.js']))
    .pipe(gulp.dest(BUILDDIR));
});

gulp.task('copy-bower', ['clean'], function(next) {
  //copy bower_components js files - wrap in self-invoking function to prevent issues when concatenating and minifying
  return _init(gulp.src('src/bower_components/**/**/*.js'))
    .pipe(wrap('(function(){<%= contents %>\n})();'))
    .pipe(gulp.dest(BUILDDIR + '/bower_components'));
});

gulp.task('copy-vendor', ['clean'], function(next) {
  //copy venue js files - wrap in self-invoking function to prevent issues when concatenating and minifying
  return _init(gulp.src('src/vendor/js/*.js'))
    .pipe(wrap('(function(){<%= contents %>\n})();'))
    .pipe(gulp.dest(BUILDDIR + '/vendor/js'));
});

// Copy src folder to build directory
// gulp.task('fonts', function(next) {
//   return fontcustom({
//     path: 'src/font-glyphs/icons',
//     output: 'src/font-glyphs',
//     noisy: true,
//     force: true
//   });
// });

// Replace vars in config
gulp.task('replace', ['copy'], function() {
  return _replace(gulp.src(['build/**/*.*']))
    .pipe(gulp.dest(BUILDDIR));
});

// Compile .less files to .css
gulp.task('css', ['css-vendor'], function() {
  return _init(gulp.src('build/less/main.less'))
    .pipe(less(LESSOPTIONS))
    .pipe(gulp.dest(BUILDDIR + '/css'));
});

gulp.task('css-vendor', ['copy', 'replace'], function() {
  return gulp.src(VENDOR_CSS)
    .pipe(concat(MINIFIED_VENDOR_CSS))
    .pipe(gulp.dest(BUILDDIR + '/css'));
});

/**
 * Minify javascript files
 */
gulp.task('js', ['js-vendor', 'copy', 'replace'], function() {
  var target = gulp.src(BUILDDIR + '/index.html');

  var sources = gulp.src([BUILDDIR + '/app/**/**/*.js', '!' + BUILDDIR + '/app/' + MINIFIED_SRC_SCRIPT, '!' + BUILDDIR + '/app/' + MINIFIED_VENDOR_SCRIPT])
    .pipe(gulpIf(ENV_PROD, uglify(MINIFIED_SRC_SCRIPT, UGLIFYOPTIONS)))
    .pipe(gulpIf(ENV_PROD, gulp.dest(BUILDDIR + '/app')));

  return target.pipe(inject(sources, {
      starttag: '<!-- injectSrcJs:js -->',
      endtag: '<!-- endinjectSrcJs -->',
      transform: function(filepath) {
        var path = filepath.replace('/build', '');
        return '<script src="' + path + '"></script>';
      }
    }))
    .pipe(gulp.dest(BUILDDIR));
});

gulp.task('js-vendor', ['copy', 'replace'], function() {
  var target = gulp.src(BUILDDIR + '/index.html');

  var sources = gulp.src(VENDOR_JS)
    // .pipe(gulpIf(ENV_PROD, uglify(MINIFIED_VENDOR_SCRIPT, UGLIFYOPTIONS)))
    .pipe(gulpIf(ENV_PROD, concat(MINIFIED_VENDOR_SCRIPT)))
    .pipe(gulpIf(ENV_PROD, gulp.dest(BUILDDIR + '/app')));

  return target.pipe(inject(sources, {
      starttag: '<!-- injectVendorJs:js -->',
      endtag: '<!-- endinjectVendorJs -->',
      transform: function(filepath) {
        var path = filepath.replace('/build', '');
        return '<script src="' + path + '"></script>';
      }
    }))
    .pipe(gulp.dest(BUILDDIR));
});

/**
 * Js Hint
 */
gulp.task('jshint', ['replace'], function() {
  return _init(gulp.src(['src/app/**/*.js']))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('server', ['default'], function() {

  // LESS
  (function processLess(paths) {
    paths.forEach(function(path) {
      watch(path, {
        emit: 'one',
        emitOnGlob: false
      }, function(files) {
        //copy the changes less files to the build dir
        files
          .pipe(gulp.dest(BUILDDIR + '/less'));

        //reprocess main.less in the build dir - regenerate css
        return gulp.src(BUILDDIR + '/less/main.less')
          .pipe(less(LESSOPTIONS))
          .pipe(gulp.dest(BUILDDIR + '/css'));
      });
    });
  })(['src/less/**/*.less']);

  (function processJs() {
    console.log('watching js files');

    watch('src/app/**/**/*.js', {
      emit: 'one',
      emitOnGlob: false
    }, function(files) {
      //copy the changed js files to the build dir
      return _replace(files)
        .pipe(gulp.dest(BUILDDIR + '/app'));
    });
  }());

  (function processHtml(paths) {
    console.log('watching html files');

    paths.forEach(function(path) {
      var dest = path.split('/').slice(0, -1).join('/').replace('src', BUILDDIR).replace(/\*/gi, '');
      watch(path, {
        emit: 'one',
        emitOnGlob: false
      }, function(files) {
        return _replace(files)
          .pipe(gulp.dest(dest));
      });

    });
  }(['src/**/**/*.html']));

  return require('./server');
});

/**
 * Run all steps in order
 */
gulp.task('default', ['clean', 'copy', 'replace', 'css', 'js']);

/**
 * Deploy steps
 */
gulp.task('deploy', ['default']);

/**
 * Run unit and e2e tests - this task is run by Wercker when building our app
 */
//gulp.task('test', ['test-unit', 'test-e2e', 'deploy'], function() {});
//gulp.task('test', ['test-unit', 'deploy'], function() {});
gulp.task('test', ['deploy'], function() {});

gulp.task('test-unit', function(done) {
  karma.start({
    configFile: __dirname + '/tests/karma.conf.js',
    singleRun: true,
    files: [
      '../src/bower_components/angular/angular.js',
      '../src/bower_components/angular-mocks/angular-mocks.js',
      '../src/bower_components/angular-resource/angular-resource.js',
      '../src/bower_components/angular-sanitize/angular-sanitize.js',
      '../src/bower_components/angular-ui-router/release/angular-ui-router.js',
      '../src/bower_components/angular-scroll/angular-scroll.js',
      '../src/bower_components/angular-bootstrap/ui-bootstrap.js',
      '../src/bower_components/tablelist-js/tablelist.js',
      '../src/vendor/ng-bs-animated-button.js',
      '../src/bower_components/sinon/lib/sinon.js',
      '../src/app/**/**/**/*.js',
      'unit/**/*.spec.js'
    ]
  }, done);
});

gulp.task('test-e2e', ['server'], function(done) {
  gulp.src(['tests/e2e/**/**/*.spec.js'])
    .pipe(protractor({
      configFile: 'tests/protractor.conf.js'
    }))
    .on('error', function(e) {
      console.log(e);
      throw e
    })
    .on('end', function() {
      console.log('finished e2e tests');
      done();
    });
});

/* =========================================================================
 * Helper Functions
 * ========================================================================= */

function _init(stream) {
  stream.setMaxListeners(0);
  return stream;
}

function _replace(stream) {
  _init(stream);
  for (key in appConfig) {
    stream.pipe(replace('@@' + key, appConfig[key], {
      skipBinary: true
    }));
  }

  return stream;
}

function setupEnv(env) {
  // allow passing name as an argument
  if (env && env.indexOf('-') === 0) env = env.substring(1);

  // production
  if (env === 'master' || env === 'prod' || env === 'production') return 'production';
  // development
  else if (env === 'dev' || env === 'development') return 'development';
  // local
  else if (env === 'local') return 'local';
  // default
  else return 'development';
}
