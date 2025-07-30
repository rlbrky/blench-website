import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './animated-text.css';

const AnimatedText = ({ 
  text, 
  fontSize = "26px", 
  duration = 0.75,
  staggerDelay = 0.0125,
  repeatDelay = 0.65,
  slowMotionSpeed = 0.15,
  className = ""
}) => {
  const textRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!textRef.current || !text) return;

    const textElement = textRef.current;
    
    // Clear existing content
    textElement.innerHTML = '';
    
    // Create span for each character
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.className = 'animated-char';
      span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space for spaces
      textElement.appendChild(span);
    });
    
    // GSAP Animation
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: repeatDelay,
      yoyo: true
    });
    
    const chars = textElement.querySelectorAll('.animated-char');
    
    // Set initial random positions for each character
    chars.forEach(char => {
      gsap.set(char, {
        x: gsap.utils.random(-500, 500),
        y: gsap.utils.random(-500, 500),
        rotation: gsap.utils.random(-720, 720),
        scale: 0,
        opacity: 0
      });
    });
    
    // Animate to final positions
    tl.to(chars, {
      duration: duration,
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      ease: "power4.inOut",
      stagger: staggerDelay
    });
    
    timelineRef.current = tl;
    
    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [text, fontSize, duration, staggerDelay, repeatDelay]);

  const handleMouseEnter = () => {
    if (timelineRef.current) {
      timelineRef.current.timeScale(slowMotionSpeed);
    }
  };

  const handleMouseLeave = () => {
    if (timelineRef.current) {
      timelineRef.current.timeScale(1);
    }
  };

  return (
    <div 
      className={`animated-text-container ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={textRef}
        className="animated-text-element"
        style={{ fontSize }}
      />
    </div>
  );
};

export default AnimatedText;