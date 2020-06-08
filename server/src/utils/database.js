import mongoose from 'mongoose';

import appLogger from '../logging/appLogger';

// eslint-disable-next-line import/prefer-default-export
export const initDBConnection = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch(error =>
      appLogger.error({ message: 'Failed to connect to database', error })
    );
};
