import React, { useState, useRef, useEffect } from 'react';
import './intro-animation.css';

const IntroAnimation = ({ onAnimationComplete }) => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [videoPhase, setVideoPhase] = useState('playing'); // 'playing', 'background', 'frozen'
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const hasStartedRef = useRef(false);
  const videoPhaseRef = useRef('playing');
  const overlayTimerRef = useRef(null);

  useEffect(() => {
    // Prevent double execution in StrictMode
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video && audio) {
      // Reset video to beginning
      video.currentTime = 0;
      video.loop = false;
      audio.currentTime = 0;
      audio.loop = true;
      
      // Start media immediately
      const startMedia = async () => {
        try {
          await video.play();
          console.log('Video started playing');
        } catch (error) {
          console.log('Video autoplay prevented:', error);
        }

        try {
          await audio.play();
        } catch (error) {
          console.log('Audio autoplay prevented:', error);
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

      // Monitor video time and handle slowdown + freeze naturally
      const handleTimeUpdate = () => {
        const currentTime = video.currentTime;
        console.log('Video time:', currentTime.toFixed(2));
        
        if (currentTime >= 5.0 && currentTime < 8.0 && videoPhaseRef.current !== 'frozen') {
          // Calculate slowdown factor with a smoother, less aggressive curve
          const progress = (currentTime - 5.0) / 3.0; // Progress from 5s to 8s of video content
          // Use an easing curve that's gentler at the end - goes from 1.0 to 0.25
          const playbackRate = Math.max(0.25, 1 - (progress * progress * 0.75)); // Quadratic easing
          video.playbackRate = playbackRate;
          console.log(`Video slowdown - time: ${currentTime.toFixed(2)}s, rate: ${playbackRate.toFixed(3)}x`);
        } else if (currentTime >= 8.0 && videoPhaseRef.current !== 'frozen') {
          console.log('Video naturally reached 8 seconds, freezing');
          video.pause();
          video.playbackRate = 1.0; // Reset playback rate
          setVideoPhase('frozen');
          videoPhaseRef.current = 'frozen';
        }
      };

      // Separate timer for hiding overlay and showing content at 2.5 seconds
      overlayTimerRef.current = setTimeout(() => {
        console.log('Hiding overlay at 2.5s, video time:', video.currentTime);
        console.log('Video paused:', video.paused);
        setShowOverlay(false);
        onAnimationComplete();
      }, 2500);

      // Add event listeners
      const handlePause = () => {
        console.log('Video paused at time:', video.currentTime, 'Phase:', videoPhaseRef.current);
      };
      
      const handlePlay = () => {
        console.log('Video resumed at time:', video.currentTime, 'Phase:', videoPhaseRef.current);
      };
      
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('pause', handlePause);
      video.addEventListener('play', handlePlay);

      // Start media immediately
      startMedia();

      return () => {
        if (overlayTimerRef.current) {
          clearTimeout(overlayTimerRef.current);
        }
        if (video) {
          video.removeEventListener('timeupdate', handleTimeUpdate);
          video.removeEventListener('pause', handlePause);
          video.removeEventListener('play', handlePlay);
        }
      };
    }
  }, []);

  return (
    <>
      {/* Video always visible, no blocking overlay */}
      <div className={`video-container ${videoPhase === 'frozen' ? 'frozen' : 'background'}`}>
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
    </>
  );
};

export default IntroAnimation;