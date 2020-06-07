import fs from 'fs';

const { NODE_ENV } = process.env;
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  );
}

const dotEnvFiles = [`.env.${NODE_ENV}.local`, `.env.${NODE_ENV}`].filter(
  Boolean
);

dotEnvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({ // eslint-disable-line
      path: dotenvFile,
    });
  }
});
