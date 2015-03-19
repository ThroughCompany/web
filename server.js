/* =========================================================================
 * Dependencies
 * ========================================================================= */
if (process.env.NEWRELIC) {
  var newrelic = require('newrelic');
}

var appConfig = require('./config/appConfig')[process.env.NODE_ENV || 'development'];
var app = require('./config/expressConfig').configure(appConfig);

// start server
app.listen(appConfig.PORT, function() {
  console.log('Listening on port: ' + appConfig.PORT);
});

/* =========================================================================
 * Exorts
 * ========================================================================= */
module.exports = app;
