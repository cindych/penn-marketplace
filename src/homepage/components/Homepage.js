import React from 'react';
import {
  CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { v4 as uuidv4 } from 'uuid';
import links from '../assets/productimages.json';
import '../styles/Homepage.css';

const Homepage = () => (
  <div className="homepage pt-5">
    <div className="carousel-wrapper">
      <h1>Today&apos;s listings</h1>
      <CarouselProvider
        className="mt-1"
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={links.length}
        visibleSlides={5}
      >
        <Slider>
          {links.map((link, idx) => (
            <Slide index={idx} key={uuidv4()}>
              <Image src={link} alt="product pic" hasMasterSpinner={false} />
              <p>$5.99</p>
            </Slide>
          ))}
        </Slider>
        <div className="buttons">
          <ButtonBack className="btn me-2">Back</ButtonBack>
          <ButtonNext className="btn">Next</ButtonNext>
        </div>
      </CarouselProvider>
    </div>

    <div className="carousel-wrapper">
      <h1>Trending Listings</h1>
      <CarouselProvider
        className="mt-1"
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={links.length}
        visibleSlides={5}
      >
        <Slider>
          {links.map((link, idx) => (
            <Slide index={idx} key={uuidv4()}>
              <Image src={link} alt="product pic" hasMasterSpinner={false} />
              <p>$5.99</p>
            </Slide>
          ))}
        </Slider>
        <div className="buttons">
          <ButtonBack className="btn me-2">Back</ButtonBack>
          <ButtonNext className="btn">Next</ButtonNext>
        </div>
      </CarouselProvider>
    </div>

    <div className="carousel-wrapper">
      <h1>Saved Listings</h1>
      <CarouselProvider
        className="mt-1"
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={links.length}
        visibleSlides={5}
      >
        <Slider>
          {links.map((link, idx) => (
            <Slide index={idx} key={uuidv4()}>
              <Image src={link} alt="product pic" hasMasterSpinner={false} />
              <p>$5.99</p>
            </Slide>
          ))}
        </Slider>
        <div className="buttons">
          <ButtonBack className="btn me-2">Back</ButtonBack>
          <ButtonNext className="btn">Next</ButtonNext>
        </div>
      </CarouselProvider>
    </div>
    <div className="spacer" />
  </div>
);

export default Homepage;
