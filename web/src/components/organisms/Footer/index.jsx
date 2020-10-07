import React from 'react';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import styled from 'styled-components';
import { Typography } from 'antd';

import consts from 'claptime/consts';
import { SocialNetworkIcons } from 'claptime/components/molecules';

const {
  device,
  style: {
    colors: { primary, strawberry },
  },
} = consts;

const { Title } = Typography;

const Container = styled.div`
  display: flex;
  > div {
    flex-basis: 33.3%;
    text-align: center;
  }
  @media ${device.mobileS} {
    justify-content: space-between;
    flex-direction: column;
  }
  @media ${device.tablet} {
    justify-content: space-between;
    flex-direction: row;
  }

  a {
    color: ${primary};
  }

  a:hover {
    color: ${strawberry};
  }
`;

const Section = styled.div`
  .title {
    font-weight: bold;
  }
`;

const Subtitle = styled.div`
  border-top: 1px solid;
  padding-top: 15px;
  margin: 5% 20% 0;
  width: 60%;
  text-align: center;
`;

const StyledStrip = styled.div`
  background-image: url(/assets/backgrounds/footer.svg) !important;
  background-size: 100% !important;
  background-repeat: no-repeat !important;
  min-height: unset !important;
  padding: 5% 10% 0 10% !important;
`;

function Footer() {
  const { t } = useTranslation();
  return (
    <StyledStrip>
      <Container>
        <Section>
          <Title level={3}>{t('footer.navigation.title')}</Title>
          <p>
            <Link href="/">
              <a>{t('footer.navigation.home')}</a>
            </Link>
          </p>
          <p>
            <Link href="/about/spectators">
              <a>{t('navbar.spectators')}</a>
            </Link>
          </p>
          <p>
            <Link href="/about/filmmakers">
              <a>{t('navbar.filmmakers')}</a>
            </Link>
          </p>
        </Section>
        <Section>
          <Title level={3}>{t('footer.misc.title')}</Title>
          <p>
            <a href={consts.blog} target="_blank" rel="noopener noreferrer">
              {t('footer.misc.blog')}
            </a>
          </p>
          <p>
            <a
              href={consts.helpCenter}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('footer.misc.helpCenter')}
            </a>
          </p>
          <p>
            <Link href="/partners">
              <a>{t('footer.misc.partners')}</a>
            </Link>
          </p>
          <p>
            <Link href="/about/press">
              <a>{t('navbar.press')}</a>
            </Link>
          </p>
          <p>
            <Link href="/legal">
              <a>{t('footer.misc.legalTerms')}</a>
            </Link>
          </p>
        </Section>
        <Section>
          <Title level={3}>{t('footer.contact.title')}</Title>
          <SocialNetworkIcons color={primary} />
        </Section>
      </Container>

      <Subtitle>
        <p>
          <span style={{ fontWeight: 'bold' }}>
            {t('claptime')} — {t('punchline')}
          </span>
          <br />
          {t('madeInFrance')}
        </p>
      </Subtitle>
    </StyledStrip>
  );
}

export default Footer;
