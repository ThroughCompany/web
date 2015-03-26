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
  API: 'https://api.throughcompany.com',
  NEWRELIC: {
    name: 'throughcompany-web-prod',
    key: 'e7c5a21591fb5d706825572ef8cde21bb7cde86c'
  }
});

var development = _.extend(_.clone(defaultSettings), {
  ENV: 'development',
  API: 'http://api-dev.throughcompany.com',
  NEWRELIC: {
    name: 'throughcompany-web-dev',
    key: 'e7c5a21591fb5d706825572ef8cde21bb7cde86c'
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
