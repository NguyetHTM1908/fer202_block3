import React, { useCallback, useEffect, useState } from 'react';
import './Carousel.css';


const Carousel = ({ images, autoPlayInterval = 3000 }) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

 
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  /**
   * Auto-play functionality
 
   */
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [nextSlide, autoPlayInterval]);

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {/* Nút mũi tên trái  */}
        <button 
          className="carousel-arrow carousel-arrow-left"
          onClick={prevSlide}
          aria-label="Previous image"
        >
          ‹
        </button>

        {/* Slide hiện tại  */}
        <div className="carousel-slide">
          <img 
            src={images[currentIndex]} 
            alt={`Slide ${currentIndex + 1}`}
            className="carousel-image"
          />
         
          <div className="carousel-caption">
            <span className="slide-counter">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>

        {/* Nút mũi tên phải */}
        <button 
          className="carousel-arrow carousel-arrow-right"
          onClick={nextSlide}
          aria-label="Next image"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Carousel;
