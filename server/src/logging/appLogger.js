import os from 'os';
import process from 'process';

const HOSTNAME = os.hostname();
const PID = process.pid;
const LEVEL_TAGS = {
  FATAL: 'FATAL',
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
  TRACE: 'TRACE',
};
const LOG_LEVELS = {
  [LEVEL_TAGS.FATAL]: 60,
  [LEVEL_TAGS.ERROR]: 50,
  [LEVEL_TAGS.WARN]: 40,
  [LEVEL_TAGS.INFO]: 30,
  [LEVEL_TAGS.DEBUG]: 20,
  [LEVEL_TAGS.TRACE]: 10,
};
const DEFAULT_LEVEL_TAG = LEVEL_TAGS.INFO;

const defaultLoggerConfig = {
  hostname: HOSTNAME,
  environment: process.env.NODE_ENV,
  level: LOG_LEVELS[DEFAULT_LEVEL_TAG],
  levelTag: DEFAULT_LEVEL_TAG,
  message: '',
  pid: PID,
};

const timeStamp = () => ({
  timestamp: Date.now(),
  timestampISO: new Date().toISOString(),
});

const log = info => {
  const level = LOG_LEVELS[info.levelTag] || LOG_LEVELS[DEFAULT_LEVEL_TAG];
  const logInfo = {
    ...defaultLoggerConfig,
    ...timeStamp(),
    ...info,
    level,
  };

  if (['dev', 'local'].includes(process.env.NODE_ENV)) {
    // eslint-disable-next-line no-console
    console.log(logInfo);
  } else {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(logInfo));
  }
};

const appLogger = {
  fatal: ({ message, error = {} }) => {
    const err = {
      message: error.message,
      stack: error.stack,
      requestUrl: error.requestUrl,
      requestMethod: error.requestMethod,
    };
    log({
      message,
      error: err,
      levelTag: LEVEL_TAGS.FATAL,
    });
  },

  error: ({ message, error = {} }) => {
    const err = {
      message: error.message,
      stack: error.stack,
      requestUrl: error.requestUrl,
      requestMethod: error.requestMethod,
    };
    log({
      message,
      error: err,
      levelTag: LEVEL_TAGS.ERROR,
    });
  },

  warn: ({ message }) =>
    log({
      message,
      levelTag: LEVEL_TAGS.WARN,
    }),

  info: ({ message }) => {
    log({ message });
  },

  debug: ({ message }) =>
    log({
      message,
      levelTag: LEVEL_TAGS.DEBUG,
    }),

  trace: ({ message }) =>
    log({
      message,
      levelTag: LEVEL_TAGS.TRACE,
    }),
};

export default appLogger;
