/* =========================================================================
 * Exports
 * ========================================================================= */
module.exports = function(appConfig) {
  return function(err, req, res, next) {
    res.status(500).send(err);
  };
};
