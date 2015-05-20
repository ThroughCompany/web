/* =========================================================================
 * Dependencies
 * ========================================================================= */
var express = require('express');

//middleware
var compression = require('compression');
var ssl = require('../middleware/ssl');
var headers = require('../middleware/headers');
var notFound = require('../middleware/notFound');
var error = require('../middleware/error');
var prerender = require('prerender-node');
var indexFile = require('../middleware/indexFile');
var staticFiles = require('../middleware/static');

/* =========================================================================
 * Config
 * ========================================================================= */
var expressConfig = {
  configure: configure
};

function configure(appConfig) {
  var app = express();
  loadMiddleware(app, appConfig);
  return app;
}

function loadMiddleware(app, appConfig) {
  app.use(compression());
  app.use(ssl(appConfig));
  app.use(headers(appConfig));

  if (appConfig.SEO) {
    app.use(prerender.set('prerenderToken', appConfig.PRERENDER));
  }

  app.use(compression());
  app.use(ssl(appConfig));
  app.use(headers(appConfig));
  app.use(staticFiles(appConfig.BUILD_DIR));
  app.use(notFound());
  app.use(indexFile(appConfig));
  app.use(error());
}

/* =========================================================================
 * Private Helpers
 * ========================================================================= */
function htmlFile(res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
}

/* =========================================================================
 * Exports
 * ========================================================================= */
module.exports = expressConfig;
