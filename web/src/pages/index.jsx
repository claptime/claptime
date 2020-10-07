import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Title } from 'claptime/components/atoms';
import { Layouts } from 'claptime/components/molecules';
import Collections from 'claptime/components/organisms/Collections';
import OfflineSection from 'claptime/components/organisms/LandingOfflineSection';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import consts from 'claptime/consts';
import { useUserState } from 'claptime/lib/user';

const {
  device: { mobileS, laptopL },
} = consts;

const Section = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  > div {
    width: 100%;
    margin: auto;
  }

  @media ${mobileS} {
    h1 {
      width: 100%;
      text-align: center;
      margin-bottom: 60px;
      font-size: 3em;
    }
  }
  @media ${laptopL} {
    h1 {
      text-align: left;
      font-size: 4em;
    }
  }
`;

const Container = styled.main``;

const LandingPage = () => {
  const { t } = useTranslation();
  const user = useUserState();

  return (
    <NavBarTemplate>
      <>
        {!user.isLoggedIn && <OfflineSection />}
        <Container>
          <Layouts.Strip background="shapes-landing">
            <Section id="collections">
              <div>
                <Title underlined={false}>
                  {t('landingPage.findYourHappiness')}
                </Title>
                <Collections />
              </div>
            </Section>
          </Layouts.Strip>
        </Container>
      </>
    </NavBarTemplate>
  );
};

export default LandingPage;
