// components/MainContent.js
import React, { useState, useEffect } from 'react';
import carousel1 from '../assets/carouselnewone.png';
import carousel2 from '../assets/carouselnew2.png';
import carousel3 from '../assets/carouselnew3.png';
import carousel4 from '../assets/carouselnew4.png';
import carousel5 from '../assets/carousel6.png';
import '../Goat Css/Carousel.css';

const MainContent = () => {
  const slides = [
    { image: carousel1},
    { image: carousel2 },
    { image: carousel3 },
    { image: carousel4 },
    { image: carousel5 }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-content">
      <div className="carousel-container slide-up">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="banner-content">
              <h1 className="banner-heading">{slide.heading}</h1>
               
            </div>
            <img src={slide.image} alt={slide.heading} className="banner-image" />
          </div>
        ))}

        <div className="banner-navigation">
          <button className="nav-arrow left-arrow" onClick={prevSlide}>&#10094;</button>
          <button className="nav-arrow right-arrow" onClick={nextSlide}>&#10095;</button>
        </div>

        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <span 
              key={index} 
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
