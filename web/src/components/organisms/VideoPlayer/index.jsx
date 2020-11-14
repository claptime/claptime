// https://medium.com/@bikegriffith/using-clappr-with-reactjs-14a338e3451f
import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Engine, initClapprPlayer } from 'p2p-media-loader-hlsjs';
import { gql } from '@apollo/client';
import uuidV4 from 'uuid/v4';
import styled from 'styled-components';

import consts from 'claptime/consts';
import { createView } from 'claptime/graphql/videonodes';
import { env } from 'claptime/lib/amplify';
import { useApolloClient } from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';
import { isMobile, rgbToRgba } from 'claptime/utils';
import { isAvailable } from 'claptime/lib/features';

import ClapButton from './Overlays/ClapButton';
import VideoInfos from './Overlays/VideoInfos';
import RightControl from './Overlays/RightControl';
import Arrow from './Overlays/Arrow';
import Share from './Overlays/Share';

const WATCHED_PERCENTAGE = 75;

const {
  device,
  style: {
    colors: { strawberry, primary },
    fonts: { stylizedVariant },
  },
} = consts;

// Need to use !important in order to override clappr style
const StyledContainer = styled.div`
  .media-control {
    font-family: ${stylizedVariant} !important;
    transition: background 0.4s ease-in-out !important;
    .bar-background {
      height: 4px !important;
    }
    .bar-fill-2 {
      background-color: ${strawberry} !important;
    }
    .media-control-background {
      display: none !important;
    }
    .media-control-layer {
      transition: all 0.4s ease-in-out !important;
      width: 76% !important;
      height: auto !important;
      margin: 0 12% !important;
    }
    .media-control-left-panel {
      @media ${device.mobileLandscape} {
        max-width: calc(100% - 212px) !important;
      }
    }
    .media-control-left-panel,
    .media-control-right-panel {
      height: 32px !important;
    }
    .media-control-center-panel {
      height: 32px !important;
      font-family: ${stylizedVariant} !important;
    }
    .seek-time {
      margin: 0 12% !important;
    }
    .bar-scrubber {
      top: 4px !important;
    }
    #video-player-infos {
      max-height: 75vh !important;
      margin-top: 40px !important;
      overflow: auto !important;
    }
    .video-title {
      min-width: 250px !important;
      max-width: 76vw !important;
      margin: 0 6px !important;
      color: white !important;
      display: inline-block !important;
      white-space: nowrap !important;
      text-overflow: ellipsis !important;
      overflow: hidden !important;
      vertical-align: bottom !important;
      font-size: 16px !important;
      @media ${device.mobileLandscape} {
        font-size: 22px !important;
      }
      .subtitle {
        font-size: 12x !important;
        @media ${device.mobileLandscape} {
          font-size: 18px !important;
        }
      }
    }
  }
  .media-control.playing {
    background: transparent !important;
    .media-control-layer {
      max-height: 36px !important;
    }
    .seek-time {
      bottom: 55px !important;
    }
  }
  .media-control.paused {
    background: ${rgbToRgba(primary, 0.85)} !important;
    .media-control-layer {
      max-height: 75vh !important;
    }
  }
`;

const VideoPlayer = ({ video, embed }) => {
  const [portalReady, setPortalReady] = useState(false);
  const apolloClient = useApolloClient();
  const [, dispatchWatched] = useReducer(
    useMemo(
      () => (watched) => {
        if (!watched) {
          apolloClient.mutate({
            mutation: gql(createView),
            variables: {
              input: {
                id: uuidV4(),
                viewVideoNodeId: video.id,
                owner: video.createdBy,
              },
            },
          });
        }
        return true;
      },
      [apolloClient, video],
    ),
    false,
  );

  const playerRef = useRef(null);
  const player = useRef(null);
  const pluginPortal = useRef(null);

  useEffect(() => {
    const init = async () => {
      const Clappr = (await import('@clappr/player')).default;
      // Must import with @clappr/stats-plugin/src/clappr-stats instead of @clappr/stats-plugin
      // to avoid this error:
      // ./node_modules/@clappr/stats-plugin/dist/clappr-stats.js:3:0
      // Module not found: Can't resolve 'Clappr'
      // Because it requires Clappr instead of clappr...
      // https://github.com/clappr/clappr-stats/blob/1ff79a4c2dbf535139c443e3eb90f15b6e6ddb5a/webpack.config.js
      const ClapprStats = (
        await import('@clappr/stats-plugin/src/clappr-stats')
      ).default;
      const ClapprCreatePortal = (await import('./ClapprCreatePortal')).default;

      let playing = false;

      const showMediaControl = () => {
        const offset =
          player.current.core.mediaControl.$('#video-player-infos').height() +
          96;
        player.current.core.mediaControl
          .$('.seek-time')
          .css('bottom', `${offset}px`);
        player.current.core.mediaControl.$el.addClass('paused');
        player.current.core.mediaControl.$el.removeClass('playing');
        playing = false;
      };
      const hideMediaControl = () => {
        player.current.core.mediaControl.$el.addClass('playing');
        player.current.core.mediaControl.$el.removeClass('paused');
        playing = true;
      };

      player.current = new Clappr.Player({
        autoPlay: !embed,
        parent: playerRef.current,
        source: `https://cdn-${env}.clap-time.com/${video.id}/master.m3u8`,
        width: '100%',
        height: '100%',
        poster: {
          showOnVideoEnd: false,
        },
        playback: {
          hlsjsConfig: {
            liveSyncDurationCount: 7,
            loader: Engine.isSupported()
              ? new Engine().createLoaderClass()
              : undefined,
            enableWorker: false, // TODO not working when set to true
          },
        },

        plugins: [ClapprCreatePortal, ClapprStats],
        clapprStats: {
          onReport: async ({ extra: { watchedPercentage } }) => {
            if (watchedPercentage >= WATCHED_PERCENTAGE) {
              dispatchWatched();
            }
          },
        },
      });

      if (isMobile()) {
        player.current.on(Clappr.Events.PLAYER_FULLSCREEN, (isFullscreen) => {
          if (isFullscreen) {
            window.screen.orientation
              .lock('landscape')
              .catch((err) =>
                console.log(
                  `Error attempting to set orientation to landscape: ${err.message} (${err.name})`,
                ),
              );
          } else {
            window.screen.orientation
              .unlock()
              .catch((err) =>
                console.log(
                  `Error attempting to unset orientation: ${err.message} (${err.name})`,
                ),
              );
          }
        });
      }

      if (Engine.isSupported()) {
        initClapprPlayer(player.current);
      }

      pluginPortal.current = player.current
        .getPlugin('claptime')
        .addPluginPortal('.container');

      if (isMobile()) {
        const plugin = player.current.getPlugin('click_to_pause');
        plugin && plugin.disable();
      }
      player.current.on(Clappr.Events.PLAYER_PAUSE, showMediaControl);
      player.current.on(Clappr.Events.PLAYER_PLAY, hideMediaControl);

      /* media control should not drop down on pause -> remove cc bottom: -50px */
      player.current.listenTo(
        player.current.core.mediaControl,
        Clappr.Events.MEDIACONTROL_HIDE,
        () => {
          if (!playing) {
            player.current.core.mediaControl
              .$('.media-control-layer')
              .css('bottom', '0');
          } else {
            player.current.core.mediaControl
              .$('.media-control-layer')
              .css('bottom', '-50px');
          }
        },
      );
      player.current.listenTo(
        player.current.core.mediaControl,
        Clappr.Events.MEDIACONTROL_SHOW,
        () => {
          player.current.core.mediaControl
            .$('.media-control-layer')
            .css('bottom', '0');
        },
      );
      player.current.listenToOnce(
        player.current,
        Clappr.Events.PLAYER_PLAY,
        () => {
          player.current.core.mediaControl
            .$('.media-control-layer')
            .append('<div id="video-player-infos" />');

          if (video.parentNode) {
            player.current.core.mediaControl
              .$('.media-control-left-panel')
              .append(
                `<span class="video-title">${video.parentNode.title} : <span class="subtitle">${video.title}</span></span>`,
              );
          } else {
            player.current.core.mediaControl
              .$('.media-control-left-panel')
              .append(`<span class="video-title">${video.title}</span>`);
          }
          setPortalReady(true);
          if (isMobile()) {
            Clappr.Utils.Fullscreen.requestFullscreen(
              player.current.core.el,
            ).catch((err) =>
              console.log(
                `Error attempting to enable full-screen mode: ${err.message} (${err.name})`,
              ),
            );
          }
        },
      );
    };
    init();

    return () => {
      if (player.current) {
        player.current.destroy();
        player.current = null;
      }
    };
  }, [video, embed]);

  return (
    <>
      <StyledContainer
        ref={playerRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      {portalReady &&
        ReactDOM.createPortal(
          <VideoInfos video={video} />,
          document.getElementById('video-player-infos'),
        )}
      {portalReady &&
        ReactDOM.createPortal(
          <RightControl player={player.current} video={video} embed={embed} />,
          document.getElementsByClassName('media-control-right-panel')[0],
        )}
      {portalReady &&
        ReactDOM.createPortal(<Arrow video={video} />, pluginPortal.current)}
      {portalReady &&
        ReactDOM.createPortal(
          <Share videoId={video.id} player={player.current} />,
          pluginPortal.current,
        )}
      {portalReady &&
        isAvailable('clap-animation') &&
        ReactDOM.createPortal(<ClapButton />, pluginPortal.current)}
    </>
  );
};

VideoPlayer.propTypes = {
  video: PropTypes.claptime.videoNode.isRequired,
  embed: PropTypes.bool.isRequired,
};

export default VideoPlayer;
