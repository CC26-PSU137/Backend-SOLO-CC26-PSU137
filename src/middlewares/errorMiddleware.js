const errorMiddleware = (err, req, res, next) => {
  res.status(err.status || 500).json({
    status: 'failed',
    message: err.message || 'Internal Server Error',
  });
};

export default errorMiddleware;