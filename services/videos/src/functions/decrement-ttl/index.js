const { pLimit } = require('claptime-commons/promise');

const {
  listVideoNodesByStatusSortByTitle,
  updateVideoNode,
} = require('../../lib/models');

const decrementTtl = async ({ id, ttl }) => {
  const input = {
    id,
    ttl: ttl - 1,
  };
  if (input.ttl === 0) {
    input.status = 'DRAFT';
    input.ttl = null;
  }
  console.log(input);
  try {
    await updateVideoNode(input);
  } catch (e) {
    console.error('error', e);
  }
};

module.exports.handler = async (event) => {
  console.log('event', JSON.stringify(event, null, 2));
  try {
    const videos = await listVideoNodesByStatusSortByTitle('PUBLISHED', {
      ttl: { ge: 0 },
    });
    if (!videos.length) {
      console.log('No videos currently with a TTL.');
      return;
    }

    console.log(`${videos.length} video to process`);

    const limit = pLimit(10);
    await Promise.all(videos.map((video) => limit(() => decrementTtl(video))));
  } catch (err) {
    console.error('Handler error', err);
  }
};
