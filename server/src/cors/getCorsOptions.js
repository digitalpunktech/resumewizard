export default environment => {
  const allowedOrigins = require(`./allowed-origins.${environment}`).default; // eslint-disable-line

  return {
    origin: allowedOrigins,
  };
};
