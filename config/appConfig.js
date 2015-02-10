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
  BUILD_DIR: 'build',
  NEWRELIC: {
    name: 'xxxxxxxxxx',
    key: 'xxxxxxxxxx'
  },
};

var production = _.extend(_.clone(defaultSettings), {
  ENV: 'production',
  API: 'xxxxx', //TODO: need to setup
  NEWRELIC: {
    name: 'throughcompany-web-prod',
    key: '462c7ca3a4079021f443e836d9b9357ef276ba42'
  }
});

var development = _.extend(_.clone(defaultSettings), {
  ENV: 'development',
  API: 'throughcompany-api-dev.herokuapp.com',
  NEWRELIC: {
    name: 'throughcompany-web-prod',
    key: '462c7ca3a4079021f443e836d9b9357ef276ba42'
  }
});

var local = _.extend(_.clone(defaultSettings), {
  ENV: 'local',
  API: 'http://localhost:3001'
});

var test = _.extend(_.clone(defaultSettings), {
  ENV: 'test',
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
