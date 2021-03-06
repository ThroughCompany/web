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
//var fontcustom = require('fontcustom');

require('gulp-task-list')(gulp);

console.log('\n\nENV: ' + ENV + '\n\n');

/* =========================================================================
 * Constants
 * ========================================================================= */
var BUILDDIR = 'build';

//js
var MINIFIEDSCRIPT = 'throughcompanyApp.min.js';
var UGLIFYOPTIONS = {
  mangle: true,
  compress: true
};

//css
var LESSOPTIONS = {
  compress: ENV_PROD
};

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
gulp.task('copy', ['clean'], function(next) {
  return _init(gulp.src('src/**/*.*'))
    .pipe(gulp.dest(BUILDDIR));
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
gulp.task('css', ['replace'], function() {
  return _init(gulp.src('build/less/main.less'))
    .pipe(less(LESSOPTIONS))
    .pipe(gulp.dest(BUILDDIR + '/css'));
});

/**
 * Minify javascript files
 */
gulp.task('js', ['copy', 'replace'], function() {
  var target = gulp.src(BUILDDIR + '/index.html');

  var sources = gulp.src(BUILDDIR + '/app/**/**/*.js')
    .pipe(gulpIf(ENV_PROD, uglify(MINIFIEDSCRIPT, UGLIFYOPTIONS)))
    .pipe(gulpIf(ENV_PROD, gulp.dest(BUILDDIR + '/app')));

  return target.pipe(inject(sources, {
      starttag: '<!-- inject:js -->',
      endtag: '<!-- endinject -->',
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
