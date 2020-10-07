module.exports = {
  graphql: {
    formatSuccess: data => ({
      status: 'SUCCESS',
      data,
    }),
    formatError: reason => ({
      status: 'ERROR',
      reason,
    }),
  },
  rest: {
    formatSuccess: body => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(body),
      };
      console.log('response', response);
      return response;
    },
    formatError: (statusCode, body) => {
      const response = {
        statusCode,
        body: JSON.stringify(body),
      };
      console.log('response', response);
      return response;
    },
  },
};
