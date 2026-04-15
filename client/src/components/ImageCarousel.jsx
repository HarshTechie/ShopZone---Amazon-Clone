import React, { useState } from 'react';
import { getImageUrl } from '../api';

const PLACEHOLDER = 'https://placehold.co/500x500?text=No+Image';

function ImageCarousel({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="carousel">
        <div className="carousel-main">
          <img src={PLACEHOLDER} alt="Placeholder" />
        </div>
      </div>
    );
  }

  return (
    <div className="carousel">
      <div className="carousel-thumbnails">
        {images.map((img, index) => (
          <div
            key={img.id}
            className={`carousel-thumb ${index === selectedIndex ? 'active' : ''}`}
            onMouseEnter={() => setSelectedIndex(index)}
          >
            <img
              src={getImageUrl(img.image_url)}
              alt={`View ${index + 1}`}
              loading="lazy"
              decoding="async"
              onError={(e) => { e.target.src = PLACEHOLDER; }}
            />
          </div>
        ))}
      </div>
      <div className="carousel-main">
        <img
          src={getImageUrl(images[selectedIndex].image_url)}
          alt="Product"
          decoding="async"
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
      </div>
    </div>
  );
}

export default ImageCarousel;
