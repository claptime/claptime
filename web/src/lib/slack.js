import { Storage } from 'aws-amplify';
import consts from 'claptime/consts';
import { env } from 'claptime/lib/amplify';
import { getUrl } from 'claptime/lib/profiles';

const SLACK_WEBHOOK = process.env.NEXT_PUBLIC_SLACK_WEBHOOK;

export const postSlackMessage = (body) => {
  if (env !== 'prod') {
    console.info(
      `[${env}] Slack message skipped. Body=${JSON.stringify(body)}`,
    );
    return Promise.resolve();
  }
  return fetch(SLACK_WEBHOOK, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const profileUpdateSlackAlert = async (
  user,
  name,
  biography,
  links,
  profileId,
) =>
  postSlackMessage({
    icon_emoji: ':point_right:',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${user.firstName} ${user.lastName}* (user ${
            user.username
          }) updated his profile:
- *Name*: ${name}
- *Biography*: ${biography}
- *Avatar*: <${await Storage.get(
            `profiles/${profileId}/${consts.profiles.covers.filenames.CROPPED_512_512}`,
          )}|link>
- *Facebook*: ${getUrl(links, 'FACEBOOK')}
- *Instagram*: ${getUrl(links, 'INSTAGRAM')}
- *LabFilms*: ${getUrl(links, 'LABFILMS')}
- *Website*: ${getUrl(links, 'WEBSITE')}
<${window.location.origin}/profile/${profileId}|*View more*>`,
        },
      },
    ],
    username: 'Big Brother',
    channel: '#creators-updates',
  });

export default {
  postSlackMessage,
  profileUpdateSlackAlert,
};
