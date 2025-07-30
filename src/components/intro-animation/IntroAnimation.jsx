import React, { useState, useRef, useEffect } from 'react';
import './intro-animation.css';

const IntroAnimation = ({ onAnimationComplete }) => {
  const [showVideo, setShowVideo] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Prevent double execution
    if (hasCompleted) return;
    
    // Reset state on component mount
    setShowVideo(true);
    
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video && audio) {
      // Reset video to beginning and ensure it doesn't loop
      video.currentTime = 0;
      video.loop = false;
      audio.currentTime = 0;
      audio.loop = true; // Audio should loop continuously
      
      // Force reload the video source
      video.load();
      audio.load();

      // Always show content after exactly 5 seconds
      const timer = setTimeout(() => {
        if (!hasCompleted) {
          setShowVideo(false);
          setHasCompleted(true);
          onAnimationComplete();
        }
      }, 5000);

      // Start media with user interaction fallback
      const startMedia = async () => {
        try {
          // Try to start video (muted so should work)
          await video.play();
        } catch (error) {
          console.log('Video autoplay prevented:', error);
        }

        try {
          // Try to start audio
          await audio.play();
        } catch (error) {
          console.log('Audio autoplay prevented:', error);
          // Create a click handler to start audio on first user interaction
          const startAudioOnClick = async () => {
            try {
              await audio.play();
              document.removeEventListener('click', startAudioOnClick);
            } catch (e) {
              console.log('Audio still failed:', e);
            }
          };
          document.addEventListener('click', startAudioOnClick);
        }
      };

      // Small delay to ensure proper loading
      setTimeout(startMedia, 100);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [onAnimationComplete, hasCompleted]);

  return (
    <>
      <div className={`intro-overlay ${!showVideo ? 'hidden' : ''}`}>
        <video
          ref={videoRef}
          className="intro-video"
          muted={true}
          playsInline
        >
          <source src="/intro-video.mp4" type="video/mp4" />
        </video>
      </div>
      
      <audio ref={audioRef} loop>
        <source src="/background-song.mp3" type="audio/mpeg" />
      </audio>
      
      {!showVideo && (
        <div className="frozen-background">
          <video
            className="frozen-video"
            muted
            playsInline
          >
            <source src="/intro-video.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </>
  );
};

export default IntroAnimation;