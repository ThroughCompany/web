// Dependencies
var fs = require('fs');
var _ = require('underscore');
var mime = require('express').static.mime;

// Constants
var METHODS = ['GET', 'HEAD'];

module.exports = function(dir) {
  return function(req, res, next) {
    var path = req.path;
    var mimeType = mime.lookup(path);
    if (mimeType === 'text/html') {
      res.set('Cache-Control', 'max-age=0, no-cache');
    } else {
      res.set('Cache-Control', 'max-age=31536000'); //cache non-html files for 1 year
    }

    if (!_.contains(METHODS, req.method)) {
      return next();
    }
    return fs.createReadStream(dir + req.path)
      .on('open', function() {
        res.contentType(mime.lookup(req.path));
        res.status(200);
      })
      .on('error', function(err) {
        next();
      })
      .pipe(res);
  };
};
