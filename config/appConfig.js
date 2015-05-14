/* =========================================================================
 * Dependencies
 * ========================================================================= */
var _ = require('underscore');

/* =========================================================================
 * App Config Settings
 * ========================================================================= */
var defaultSettings = {
  ROBOTS: '/',
  PORT: process.env.PORT || 2020,
  BUILD_DIR: 'build',
  NEWRELIC: {
    name: 'xxxxxxxxxx',
    key: 'xxxxxxxxxx'
  },
  GOOGLE_ANALYTICS: 'xxxxxxxxxx',
  SSL: process.env.SSL
};

var production = _.extend(_.clone(defaultSettings), {
  ENV: 'production',
  API: 'https://api.throughcompany.com',
  NEWRELIC: {
    name: 'throughcompany-web-prod',
    key: 'e7c5a21591fb5d706825572ef8cde21bb7cde86c'
  },
  GOOGLE_ANALYTICS: 'UA-61342983-1'
});

var development = _.extend(_.clone(defaultSettings), {
  ENV: 'development',
  API: 'https://api-dev.throughcompany.com',
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
