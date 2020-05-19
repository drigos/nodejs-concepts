export default (req, res, next) => {
  res.jsonError = function jsonError(err) {
    return this.json({
      error: {
        message: err.message,
        type: err.type,
        code: err.code,
        status: err.status,
        url: req.originalUrl,
        extensions: err.extensions,
      },
    });
  };

  res.jsonData = function jsonData(data) {
    return this.json({ data });
  };

  return next();
};
