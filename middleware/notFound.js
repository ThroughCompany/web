module.exports = function() {
  return function(req, res, next) {
    if (isFile(req)) {
      res.status(404).send('Not found');
    } else {
      next();
    }
  }
};

function isFile(req) {
  var fileName = req.path.split('/').pop();
  var isFile = fileName.split('.').length > 1;
  return isFile;
}
