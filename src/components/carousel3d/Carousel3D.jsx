import React, { useEffect } from 'react';
import './carousel-3d.css';
import { triggerPageTransition, initializePageTransitions } from '../../utils/transitionAnimations';

const Carousel3D = ({ images = [], onOpenPopup }) => {
  const defaultImages = [
    "/slider-photos/1.jpg",
    "/slider-photos/2.jpg", 
    "/slider-photos/3.jpg",
    "/slider-photos/4.jpg",
    "/slider-photos/5.jpg",
    "/slider-photos/6.jpg",
    "/slider-photos/7.jpg",
    "/slider-photos/8.jpg",
    "/slider-photos/9.jpg",
    "/slider-photos/10.jpg"
  ];

  const carouselImages = images.length > 0 ? images : defaultImages;

  // Function to create animated spans from text
  const createAnimatedText = (text, startDelay = 0) => {
    const words = text.split(' ');
    return words.map((word, index) => (
      <span 
        key={index}
        style={{ 
          '--word-index': index,
          '--start-delay': `${startDelay}s`
        }}
      >
        {word}
      </span>
    ));
  };

  useEffect(() => {
    // Clean up any lingering transition states on page load (but don't trigger animation)
    initializePageTransitions();
  }, []);

  const scrollToSection = (sectionId, event) => {
    triggerPageTransition(sectionId, null, event);
  };

  return (
    <div className="carousel-container">
      <nav className="carousel-nav">
        <div className="nav-left">
          <button className="copyright-link" onClick={onOpenPopup}>
            <span className="link--top">Copyright</span>
            <span className="link--bottom">Copyright</span>
          </button>
        </div>
        <div className="nav-right">
          <button className="nav-btn">Storyline</button>
          <button className="nav-btn" onClick={(e) => scrollToSection('about', e)}>About Us</button>
          <button className="nav-btn" onClick={(e) => scrollToSection('contact', e)}>Contact</button>
        </div>
      </nav>
      
      <div className="carousel-wrapper">
        <div className="carousel">
          {carouselImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Carousel image ${index + 1}`}
              style={{ '--n': index }}
            />
          ))}
        </div>
      </div>

      <div className="carousel-text">
        <h1 className="animated-sentence">
          {createAnimatedText("Born of ruin", 0)}
        </h1>
        <h1 className="animated-sentence sentence-2">
          {createAnimatedText("Driven by vengeance", 1)}
        </h1>
      </div>
    </div>
  );
};

export default Carousel3D;