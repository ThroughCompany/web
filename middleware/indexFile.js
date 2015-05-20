var express = require('express');
var mime = express.static.mime;
var fs = require('fs');

module.exports = function(appConfig) {
  return function(req, res, next) {
    var path = appConfig.BUILD_DIR + '/index.html';

    res.set('Cache-Control', 'max-age=0, no-cache');
    res.contentType(mime.lookup(path));

    return fs.createReadStream(path)
      .on('error', next)
      .pipe(res);
  };
};
