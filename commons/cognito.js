const AWS = require('./aws');

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

const getCognitoGroupsForUser = async (userPoolId, userId) => {
  const params = {
    UserPoolId: userPoolId,
    Username: userId /* required */,
  };
  console.log(`Trying to get groups for user : ${userId}`);
  try {
    const groups = await cognitoidentityserviceprovider
      .adminListGroupsForUser(params)
      .promise();
    console.log(groups);
    return groups;
  } catch (err) {
    console.log(` -> getGroupsForUser error : ${err}`);
    return [];
  }
};

const getCognitoUserById = async (userPoolId, userId) => {
  const params = {
    UserPoolId: userPoolId,
    Username: userId /* required */,
  };

  console.log(`Trying to get user with username : ${userId}`);
  try {
    const user = await cognitoidentityserviceprovider
      .adminGetUser(params)
      .promise();
    console.log(user);
    return user;
  } catch (err) {
    console.log(` -> getCognitoUserById error : ${err}`);
    return null;
  }
};

module.exports = {
  getCognitoUserById,
  getCognitoGroupsForUser,
};
