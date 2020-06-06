import appLogger from '../logging/appLogger';

const readableMessage = 'A system error occurred.';

const logError = (err, requestId) => {
  appLogger.error({
    message: err.systemMessage || readableMessage,
    requestId,
    error: err,
  });
};

const getDecoratedErrorMessage = ({ statusCode, message, requestId }) => {
  if (statusCode < 500) return message;

  const trimmedMessage = (message || readableMessage).trim();
  const endsWithSelectPunctuation = /[.|?|!]$/.test(trimmedMessage);
  const fullStop = endsWithSelectPunctuation ? '' : '.';

  return `${trimmedMessage}${fullStop} Please try again. If error persists, get in touch with us. Request ID: ${requestId}.`;
};

const buildResponse = (err, requestId) => {
  const statusCode = Number(err.statusCode || 500);
  const { message, forbiddenResponseCode, code } = err;

  const decoratedMessage = getDecoratedErrorMessage({
    statusCode,
    message,
    requestId,
  });

  return {
    statusCode,
    message: decoratedMessage,
    code,
    requestId,
    forbiddenResponseCode,
  };
};

export default (err, req, res, next) => { //eslint-disable-line
  const { requestId } = res.locals;
  logError(err, requestId);

  const errorResponse = buildResponse(err, requestId);

  res.status(errorResponse.statusCode);
  res.json(errorResponse);
};
