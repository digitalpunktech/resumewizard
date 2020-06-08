import cors from 'cors';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';

import getCorsOptions from './cors/getCorsOptions';
// Middlewares
import errorHandlerMiddleware from './middleware/errorHandler';
import requestLoggingMiddleware from './middleware/requestLogging';
import { initDBConnection } from './utils/database';

const app = express();

app.use(express.json({ limit: '50mb' }));

// Set up mongodb connection with mongoose
initDBConnection();

const corsOptions = getCorsOptions(process.env.NODE_ENV);
app.use(cors(corsOptions));

app.use(compression());
app.use(helmet());

app.use(requestLoggingMiddleware);

app.use(errorHandlerMiddleware);

// 404 handler
app.use((_, res) => {
  res.status(404).json({
    message: 'Not Found. The resource you are looking for does not exist!',
  });
});

export default app;
