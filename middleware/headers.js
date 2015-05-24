/* =========================================================================
 * Exports
 * ========================================================================= */
module.exports = function(appConfig) {
  return function(req, res, next) {
    res.set('Vary', 'Accept-Encoding');
    next();
  };
};
