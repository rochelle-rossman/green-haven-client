import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Link from 'next/link';

function DesignCarousel({ designs }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // const aspectRatio = 16 / 9; // set your desired aspect ratio here

  const carouselItems = designs.map((design) => (
    <Carousel.Item key={design.id}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link href={`/designs/${design.id}`} passHref>
          <Image
            src={design.imageUrl}
            alt="Design"
            style={{
              maxHeight: '500px',
              maxWidth: '80%',
              objectFit: 'contain',
            }}
          />
        </Link>
      </div>
    </Carousel.Item>
  ));

  return (
    <Carousel variant="dark" activeIndex={index} onSelect={handleSelect}>
      {carouselItems}
    </Carousel>
  );
}

DesignCarousel.propTypes = {
  designs: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string,
    }),
  ).isRequired,
};

export default DesignCarousel;
