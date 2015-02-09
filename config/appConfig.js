/* =========================================================================
 * Dependencies
 * ========================================================================= */
var _ = require('underscore');

/* =========================================================================
 * App Config Settings
 * ========================================================================= */
var defaultSettings = {
  NEWRELIC: '2960e30f148c7141c12ffa97fa4485c88e05d15a',
  ROBOTS: '/',
  PORT: process.env.PORT || 2020,
  BUILD_DIR: 'build'
};

var production = _.extend(_.clone(defaultSettings), {
  ENV: 'production',
  NAME: 'www-prod',
  API: 'xxxxx' //TODO: need to setup
});

var development = _.extend(_.clone(defaultSettings), {
  ENV: 'development',
  NAME: 'www-dev',
  API: 'http://api-dev.throughcompany.com'
});

var local = _.extend(_.clone(defaultSettings), {
  ENV: 'local',
  NAME: 'www-local',
  API: 'http://localhost:3001'
});

var test = _.extend(_.clone(defaultSettings), {
  ENV: 'test',
  NAME: 'www-test',
  API: 'http://localhost:3001'
});

/* =========================================================================
 * Exports
 * ========================================================================= */
module.exports = {
  production: production,
  development: development,
  local: local,
  test: test
};
