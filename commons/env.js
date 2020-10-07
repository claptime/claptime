const getDomain = () => {
  switch (process.env.STAGE) {
    case 'prod':
      return 'https://www.clap-time.com';
    case 'staging':
      return 'https://staging.clap-time.com';
    default:
      return 'http://localhost:3000';
  }
};

module.exports = {
  getDomain,
};
