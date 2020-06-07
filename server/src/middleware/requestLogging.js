import appLogger from '../logging/appLogger';

const requestLoggingMiddleware = (req, res, next) => {
  res.on('finish', () => {
    appLogger.info({
      message: {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
      },
    });
  });

  next();
};

export default requestLoggingMiddleware;
