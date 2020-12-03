import style from './style.json';
import device from './device';

export default {
  DEFAULT_CLAP_VALUE: 2.0,
  MIN_CLAP_VALUE: 1.0,
  MIN_VIDEOS_IN_COLLECTION: 3,
  MAX_SVN_IN_COLLECTION: 10,
  style,
  device,
  blog: 'https://medium.com/claptime',
  helpCenter: 'https://claptime.slite.com/p/channel/AHqUp91QZuDZPMf2UijEwk',
  stripeDashboard: 'https://dashboard.stripe.com',
  collections: {
    covers: {
      filenames: {
        ORIGINAL: 'original.jpg',
        CROPPED_1500_300: '1500-300.jpg',
      },
    },
    default: {
      slug: 'la-scene-ouverte',
      categories: {
        FICTION: '2tTUw7PBJ',
        DOCUMENTARY: 'ia3o2wPRS',
        MUSIC_VIDEO: '2hn3AUqdHB',
        PERFORMING_ARTS: 'xjJKt0nG2',
      },
    },
  },
  news: {
    covers: {
      filenames: {
        CROPPED_1500_500: '1500-500.jpg',
      },
    },
  },
  profiles: {
    covers: {
      filenames: {
        CROPPED_512_512: '512-512.jpg',
      },
    },
  },
  userSettings: {
    notifications: {
      types: {
        NEWSLETTER: 'NEWSLETTER',
        LABFILMS_NEWSLETTER: 'LABFILMS_NEWSLETTER',
      },
      channels: {
        EMAIL: 'EMAIL',
      },
      frequencies: {
        ALWAYS: 'ALWAYS',
        NEVER: 'NEVER',
      },
    },
  },
  series: {
    status: {
      DRAFT: 'DRAFT',
      PUBLISHED: 'PUBLISHED',
    },
  },
  videos: {
    covers: {
      filenames: {
        ORIGINAL: 'original.jpg',
        CROPPED_600_800: '600-800.jpg',
      },
    },
    status: {
      IMPORT: 'IMPORT',
      UPLOAD: 'UPLOAD',
      PROCESSING: 'PROCESSING',
      PROCESSING_FAILED: 'PROCESSING_FAILED',
      DRAFT: 'DRAFT',
      PUBLISHED: 'PUBLISHED',
    },
    ttl: {
      MIN_DAYS: 1,
      MAX_DAYS: 90,
    },
  },
};
