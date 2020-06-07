#!/usr/bin/env node
import http from 'http';

import './environmentConfig';
import app from './app';

/**
 *  Create HTTP server.
 *  Get port from environment or args
 */

const port = process.env.PORT || 5000;
app.set('port', port);

const appServer = http.createServer(app);

function onListening(serverName, server) {
  const addr = server.address();
  // eslint-disable-next-line no-console
  console.info(`${serverName} listening on ${addr.port}`);
}

function onError(serverName, error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EADDRINUSE':
      // eslint-disable-next-line no-console
      console.error(`${serverName}: ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const appServerName = 'ResumeWizard';
appServer.listen(port);
appServer.on('error', error => onError(appServerName, error));
appServer.on('listening', () => onListening(appServerName, appServer));
