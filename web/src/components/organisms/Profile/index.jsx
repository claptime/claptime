import React from 'react';
import { Tabs, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Covers, TextExpand } from 'claptime/components/atoms';
import { AddToList, Cards, Links } from 'claptime/components/molecules';
import { StaticVideosList } from 'claptime/components/organisms/VideosList';
import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';
import { joinElements } from 'claptime/utils/jsx';

const { Title } = Typography;

const {
  style: {
    colors: { dark, border },
  },
  device: { mobileS, tablet },
} = consts;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media ${tablet} {
    background-image: url(/assets/backgrounds/shapes-profile.svg);
    background-repeat: no-repeat;
    background-size: 58%;
  }
  margin: 3% 0;
  padding: 2% 9%;
`;

const ProfileInfos = styled.div`
  display: flex;
  color: ${dark};
  @media ${mobileS} {
    .profile-cover {
      display: none;
    }
    .profile-biography {
      width: 100%;
    }
    flex-direction: row;
    padding-left: 0;
  }
  @media ${tablet} {
    .profile-cover {
      display: block;
      flex-basis: 25%;
    }

    .profile-biography {
      width: 80%;
    }
    padding-bottom: 8%;
    padding-left: 9%;
  }
  .profile-biography {
    font-size: 0.875em;
    margin: 3% 0;
  }
`;

const StyledHead = styled.div`
  display: flex;
  @media ${mobileS} {
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.5em;
  }
  @media ${tablet} {
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 0;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  @media ${mobileS} {
    min-width: 0; /* https://stackoverflow.com/questions/26465745/ellipsis-in-flexbox-container */
    flex-basis: 100%;
    align-items: center;
  }
  @media ${tablet} {
    margin-left: 10%;
    flex-basis: 65%;
    align-items: baseline;
  }
`;

const Misc = styled.div`
  display: inline-flex;
  border-radius: 8px;
  border: solid 1px ${border};
  div {
    display: inline-flex;
    padding: 10px 20px;
  }
`;

const Profile = ({ profile }) => {
  const { t } = useTranslation();

  const videosPublished = profile.videoNodes.items.filter(
    (video) =>
      video.status === consts.videos.status.PUBLISHED &&
      video.nodeType === 'ROOT',
  );

  const films = videosPublished.filter(({ type }) => type === 'FILM');
  const series = videosPublished.filter(
    ({ type, childrenCount }) => type === 'SERIES' && childrenCount,
  );
  const collections = profile.collections.items.filter(
    ({ status }) => status === 'PUBLISHED',
  );

  return (
    <Container>
      <ProfileInfos>
        <Covers.Profile profileId={profile.id} width="100%" height="100%" />
        <Details>
          <StyledHead>
            <Title level={1} ellipsis={{ rows: 2 }}>
              {profile.name}
            </Title>
            <AddToList
              id={profile.id}
              type="Profile"
              list="FOLLOWED"
              style={{ marginLeft: 16 }}
            />
          </StyledHead>
          {films.length || series.length || collections.length ? (
            <Misc>
              <div>
                {joinElements([
                  films.length
                    ? t('profile.film', {
                        count: films.length,
                      })
                    : null,
                  series.length
                    ? t('profile.series', {
                        count: series.length,
                      })
                    : null,
                  collections.length
                    ? t('profile.collections', {
                        count: collections.length,
                      })
                    : null,
                ])}
              </div>
            </Misc>
          ) : null}
          <div className="profile-biography">
            <TextExpand text={profile.biography} />
          </div>
          <Links.Buttons links={profile.links || []} />
        </Details>
      </ProfileInfos>
      <Tabs tabPosition="top">
        {films.length && (
          <Tabs.TabPane tab={t(`profile.tabs.films`)} key="tab-films">
            <StaticVideosList videos={films} />
          </Tabs.TabPane>
        )}
        {series.length && (
          <Tabs.TabPane tab={t(`profile.tabs.series`)} key="tab-series">
            <StaticVideosList videos={series} />
          </Tabs.TabPane>
        )}
        {collections.length && (
          <Tabs.TabPane
            tab={t(`profile.tabs.collections`)}
            key="tab-collections"
          >
            <div style={{ padding: 16 }}>
              {collections.map((collection) => (
                <div style={{ margin: '36px 0' }} key={collection.id}>
                  <Cards.Collection collection={collection} />
                </div>
              ))}
            </div>
          </Tabs.TabPane>
        )}
      </Tabs>
    </Container>
  );
};

Profile.propTypes = {
  profile: PropTypes.claptime.profile.isRequired,
};

export default Profile;
