/* =========================================================================
 * Dependencies
 * ========================================================================= */
var appConfig = require('./config/appConfig')[process.env.NODE_ENV || 'development'];
var app = require('./config/expressConfig').configure(appConfig);
var newrelic;

if (process.env.NEWRELIC) {
  newrelic = require('newrelic');
}

// start server
app.listen(appConfig.PORT, function() {
  console.log('Listening on port: ' + appConfig.PORT);
}); 

/* =========================================================================
 * Exorts
 * ========================================================================= */
module.exports = app;
