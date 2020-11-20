const graphqlHandler = require('./graphql');
const restHandler = require('./rest');

exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 2));

  const handler = event.httpMethod ? restHandler : graphqlHandler;

  return handler(event);
};
