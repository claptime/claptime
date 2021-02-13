import React, { useState } from 'react';
import styled from 'styled-components';

import { Carousel } from 'antd';
import { Lottie } from '@crello/react-lottie';
import Link from 'next/link';

import PropTypes from 'claptime/lib/prop-types';

import consts from 'claptime/consts';
import { Button, Title } from 'claptime/components/atoms';

// Duration of the longest animation
const LOOP_DURATION_MS = 8960;

const Container = styled.div`
  min-height: 100vh;

  text-color: ${(props) => props.textColor};

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  a {
    margin: 0 auto;
  }

  .ant-carousel {
    width: 100%
    text-align: center;
  }
  .illustration-section {
    display: flex;
    flex-direction: column;

    div:first-child {
      margin: auto;
    }
  }

  .carousel-title, .illustration-legend {
    color: ${(props) => props.textColor};
  }

  .carousel-title mark {
    line-height: 0em;
    padding-bottom: 0.5em;
  }

  .illustration-legend {
    margin: 0 8%;
    h2 {
      font-size: 1.2em;
    }
  }

  .claptime-title {
    margin-left: 9%;
  }

  .illustration-title {
    text-align: center;
  }

  .carousel-title span {
    position: relative;
    &:after {
      background-color: ${(props) => props.mainColor};
      content: "";
      height: 60%;
      position: absolute;
      left: 0;
      margin-left: 0.2em;
      top: 35%;
      width: 100%;
      z-index: -1;
    }
  }

  @media ${consts.device.mobileS} {
    .carousel-title {
      font-size: 2em;
      width: 90%;
      text-align: center;
      margin: 0 5%;
    }
  }
  @media ${consts.device.tablet} {
    .carousel-title {
      font-size: 3em;
    }
  }

  @media ${consts.device.laptop} {
    .carousel-title {
      font-size: 3.5em;
      width: 91%;
      margin: 0 0 0 9%;
      text-align: left;
    }
    .illustration-legend {
      height: auto;
    }
  }

  .ant-carousel .slick-dots-bottom {
    bottom: -25px;
  }

  svg {
    transition: transform 0.3s, filter 0.3s ease-in-out;
  }
  svg:hover {
    transform: scale(1.05);
  }
`;

const getLottie = (path, playing) => (
  <Lottie
    playingState={playing ? 'playing' : 'stopped'}
    width="60%"
    config={{
      autoplay: false,
      loop: true,
      path,
      rendererSettings: {},
    }}
  />
);

const getSection = (path, title, text, playing) => {
  return (
    <div className="illustration-section" key={path}>
      {getLottie(path, playing)}
      <div className="illustration-legend">
        <h2 className="illustration-title">{title}</h2>
        <p className="illustration-text">{text}</p>
      </div>
    </div>
  );
};

const LandingCarousel = ({
  title,
  iAm,
  iAmNot,
  iAmSwitchLink,
  buttonText,
  buttonLink,
  illustrations,
  mainColor,
  secondaryColor,
  textColor,
  buttonColor,
}) => {
  const [playing, setPlaying] = useState([true, true, true]);

  return (
    <>
      <Container mainColor={mainColor} textColor={textColor}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Title
              lineColor={mainColor}
              underlined={false}
              className="landing-title carousel-title"
            >
              {iAm}
            </Title>
            <Link href={iAmSwitchLink}>
              <a style={{ marginLeft: 36 }}>
                <Title
                  lineColor={secondaryColor}
                  faded
                  underlined={false}
                  className="landing-title carousel-title"
                >
                  {iAmNot}
                </Title>
              </a>
            </Link>
          </div>
          <Title
            lineColor={mainColor}
            underlined={false}
            className="landing-title carousel-title"
          >
            {title}
          </Title>
        </div>
        <Carousel
          slidesToShow={3}
          dots={false}
          autoplay
          autoplaySpeed={LOOP_DURATION_MS}
          responsive={[
            {
              breakpoint: 768,
              settings: {
                dots: true,
                afterChange: (index) =>
                  setPlaying(playing.map((v, i) => i === index)),
                slidesToShow: 1,
                infinite: true,
              },
            },
          ]}
          className="illustrations"
        >
          {illustrations.map((illustration, i) =>
            getSection(
              illustration.path,
              illustration.title,
              illustration.text,
              playing[i],
            ),
          )}
        </Carousel>
        <Link href={buttonLink}>
          <a>
            <Button color={buttonColor} text={buttonText} />
          </a>
        </Link>
      </Container>
    </>
  );
};

LandingCarousel.propTypes = {
  iAm: PropTypes.string.isRequired,
  iAmNot: PropTypes.string.isRequired,
  iAmSwitchLink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
  mainColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  illustrations: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  textColor: PropTypes.string,
  buttonColor: PropTypes.string,
};

LandingCarousel.defaultProps = {
  buttonColor: consts.style.colors.primary,
  textColor: consts.style.colors.primary,
};
export default LandingCarousel;
