import React, { useState } from 'react'
import IntroAnimation from './components/intro-animation/IntroAnimation'
import Carousel3D from './components/carousel3d/Carousel3D'
import About from './components/about/About'
import TeamSection from './components/team/TeamSection'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'
import Popup from './components/popup/Popup'
import Storyline from "./components/storyline/Storyline.jsx";

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [key, setKey] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleIntroComplete = () => {
    setIntroComplete(true);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Reset intro on page refresh/reload
  React.useEffect(() => {
    // Only reset if not already in progress
    if (introComplete) {
      setIntroComplete(false);
      setKey(prev => prev + 1);
    }
  }, []);

  return (
    <div className="App">
      <IntroAnimation key={key} onAnimationComplete={handleIntroComplete} />
      
      {introComplete && (
        <div className="main-content">
          <div className="content-container">
            <Carousel3D onOpenPopup={openPopup} />
            <Storyline />
            <About />
            <TeamSection />
            <Contact />
            <Footer />
          </div>
        </div>
      )}
      
      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <div style={{ color: '#000000', fontFamily: 'Poppins, sans-serif' }}>
          <h2 style={{ color: '#ff0000', textAlign: 'center', marginBottom: '2rem' }}>Blench NFT Collection Ownership Terms & Conditions</h2>
          <h3>Ownership</h3>
          <p>By purchasing a Blench NFT, you own the underlying token on the blockchain. However, ownership of the NFT does not transfer intellectual property rights of the associated artwork.</p>

          <h3>License</h3>
          <p>Subject to your continued compliance with these Terms, Blench grants you a worldwide, non-exclusive license to use, display, and resell the artwork associated with your NFT for personal, non-commercial use.</p>

          <h3>Commercial Rights</h3>
          <p>Commercial usage of the artwork, including use for merchandise, branding, or other revenue-generating activities, is strictly prohibited without explicit written permission from Blench.</p>

          <h3>Prohibited Uses</h3>
          <p>You may not use the artwork in any way that is unlawful, defamatory, or harmful to the reputation of Blench.</p>

          <h3>Rights Reserved</h3>
          <p>Blench retains all rights, title, and interest in and to the artwork and associated intellectual property.</p>

          <h3>Changes to Terms</h3>
          <p>Blench reserves the right to update these Terms at any time. <br/>

            By purchasing a Blench NFT, you agree to be bound by these Terms.</p>
          <br/>
          <h3>© 2025 Blench NFT Project. All rights reserved.</h3>
        </div>
      </Popup>
    </div>
  )
}

export default App
