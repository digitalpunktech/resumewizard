import appLogger from '../logging/appLogger';

const readableMessage = 'A system error occurred.';

const logError = err => {
  appLogger.error({
    message: err.systemMessage || readableMessage,
    error: err,
  });
};

const getDecoratedErrorMessage = ({ statusCode, message }) => {
  if (statusCode < 500) return message;

  return (message || readableMessage).trim();
};

const buildResponse = err => {
  const statusCode = Number(err.statusCode || 500);
  const { message, forbiddenResponseCode, code } = err;

  const decoratedMessage = getDecoratedErrorMessage({
    statusCode,
    message,
  });

  return {
    statusCode,
    message: decoratedMessage,
    code,
    forbiddenResponseCode,
  };
};

export default (err, req, res, next) => { //eslint-disable-line
  logError(err);

  const errorResponse = buildResponse(err);

  res.status(errorResponse.statusCode);
  res.json(errorResponse);
};
