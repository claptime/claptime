const { getHandler } = require('claptime-commons/appsync');

const addEpisodeToSeries = require('./resolvers/addEpisodeToSeries');
const addVideoNode = require('./resolvers/addVideoNode');
const importVideo = require('./resolvers/importVideo');
const likesCount = require('./resolvers/likesCount');
const publishVideoNode = require('./resolvers/publishVideoNode');
const removeEpisodeFromSeries = require('./resolvers/removeEpisodeFromSeries');
const removeVideoNode = require('./resolvers/removeVideoNode');
const moveEpisodeAfter = require('./resolvers/moveEpisodeAfter');
const setVideoNodeMeta = require('./resolvers/setVideoNodeMeta');
const submitVideoNodeToCollection = require('./resolvers/submitVideoNodeToCollection');
const unpublishVideoNode = require('./resolvers/unpublishVideoNode');
const validateSubmission = require('./resolvers/validateSubmission');

module.exports.handler = getHandler({
  Mutation: {
    addEpisodeToSeries: {
      handler: addEpisodeToSeries,
      checkOwnership: [
        {
          modelName: 'VideoNode',
          idArgumentName: 'seriesVideoNodeId',
        },
        {
          modelName: 'VideoNode',
          idArgumentName: 'episodeVideoNodeId',
        },
      ],
    },
    addVideoNode: {
      handler: addVideoNode,
      checkOwnership: [
        {
          modelName: 'Profile',
          idArgumentName: 'profileId',
        },
      ],
    },
    importVideo: {
      handler: importVideo,
      checkOwnership: [
        {
          modelName: 'VideoNode',
          idArgumentName: 'videoNodeId',
        },
      ],
    },
    publishVideoNode: {
      handler: publishVideoNode,
      checkOwnership: [
        {
          modelName: 'VideoNode',
          idArgumentName: 'videoNodeId',
        },
      ],
    },
    removeEpisodeFromSeries: {
      handler: removeEpisodeFromSeries,
      checkOwnership: [
        {
          modelName: 'VideoNode',
          idArgumentName: 'videoNodeId',
        },
      ],
    },
    removeVideoNode: {
      handler: removeVideoNode,
      checkOwnership: [
        {
          modelName: 'VideoNode',
          idArgumentName: 'videoNodeId',
        },
      ],
    },
    moveEpisodeAfter: {
      handler: moveEpisodeAfter,
      checkOwnership: [
        {
          modelName: 'VideoNode',
          idArgumentName: 'episodeVideoNodeId',
        },
        {
          modelName: 'VideoNode',
          idArgumentName: 'previousEpisodeVideoNodeId',
        },
      ],
    },
    setVideoNodeMeta: {
      handler: setVideoNodeMeta,
      checkOwnership: [
        {
          modelName: 'VideoNode',
          idArgumentName: 'videoNodeId',
        },
      ],
    },
    submitVideoNodeToCollection: {
      handler: submitVideoNodeToCollection,
      checkOwnership: [
        {
          modelName: 'VideoNode',
          idArgumentName: 'videoNodeId',
        },
      ],
    },
    unpublishVideoNode: {
      handler: unpublishVideoNode,
      checkOwnership: [
        {
          modelName: 'VideoNode',
          idArgumentName: 'videoNodeId',
        },
      ],
    },
    validateSubmission: {
      handler: validateSubmission,
    },
  },
  VideoNode: {
    likesCount: {
      handler: likesCount,
    },
  },
});
