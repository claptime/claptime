const scrapeIt = require('scrape-it');
const importVideo = require('../../../lib/import');
const {
  createCredit,
  getVideoNode,
  updateVideoNode,
} = require('../../../lib/models');

module.exports = async (event) => {
  const {
    arguments: { videoNodeId, labfilmsLink },
    identity: { username },
  } = event;

  const { data } = await scrapeIt(labfilmsLink, {
    title: 'h1',
    videoLink: {
      selector: 'iframe',
      attr: 'src',
    },
    // image: { // We could get the image, but they don't have the same format
    //   selector: 'meta[property="og:image"]',
    //   closest: true,
    //   attr: 'content',
    // },
    //
    // description: 'main', // We could get the description, but it would be messy
    credits: {
      listItem: '.Sidebar-user .Sidebar-userInfo',
      data: {
        name: '.Sidebar-userName',
        role: '.Sidebar-userSkill',
      },
    },
  });
  console.log('Scrapped data:', data);

  // Title + synopsis
  await updateVideoNode({
    id: videoNodeId,
    title: data.title || '',
  });

  // Credits
  if (data.credits) {
    await Promise.all(
      data.credits.map(({ role, name }) =>
        createCredit({
          creditVideoNodeId: videoNodeId,
          role,
          customProfile: name,
          owner: username,
        }),
      ),
    );
  }

  // Video
  if (data.videoLink) {
    // Remove query string
    let videoLink = data.videoLink.split('?')[0];
    // Replacing embed URL by standard URL
    // Youtube: https://www.youtube.com/embed/{videoId} to https://www.youtube.com/watch?v={videoId}
    videoLink = videoLink.replace('youtube.com/embed/', 'youtube.com/watch?v=');
    // Vimeo: https://player.vimeo.com/video/{videoId} to https://vimeo.com/{videoId}
    videoLink = videoLink.replace('player.vimeo.com/video/', 'vimeo.com/');
    await importVideo(username, videoNodeId, videoLink);
  }

  return getVideoNode(videoNodeId);
};
