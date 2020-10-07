const { getBucketConfig } = require('claptime-commons/dev/amplify');

exports.getBucketName = () => getBucketConfig().name;
