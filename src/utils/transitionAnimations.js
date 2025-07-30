// Page transition animation utilities
export const triggerPageTransition = (targetSectionId, onComplete, event) => {
  // Only trigger if event is provided (indicating it's from a nav-right button click)
  if (!event) {
    console.log('Animation blocked - no event provided');
    return;
  }
  
  console.log('Animation triggered for:', targetSectionId);
  
  // Get the content container
  const contentContainer = document.querySelector('.content-container');
  if (!contentContainer) return;
  
  // Create overlay that matches content-container position and size
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    width: 60%;
    max-width: 1200px;
    min-height: 100vh;
    background: #ff0000;
    transform: translate(-50%, -50%);
    z-index: 9999;
    border-radius: 20px;
    transform-origin: center center;
  `;
  
  document.body.appendChild(overlay);
  
  // Hide content during animation
  const allSections = contentContainer.querySelectorAll('section, .carousel-container, .about-container, .contact-container');
  allSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 0.1s ease';
  });
  
  // Apply the exact animation from original
  overlay.classList.add('animate_content');
  
  setTimeout(() => {
    overlay.classList.remove('animate_content');
  }, 3200);
  
  // After 1500ms, scroll to target section and show fadeIn effect
  setTimeout(() => {
    overlay.classList.add('fadeIn');
    
    const element = document.getElementById(targetSectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    if (onComplete) onComplete();
  }, 1500);
  
  // Show content back after animation at 2800ms
  setTimeout(() => {
    allSections.forEach(section => {
      section.style.opacity = '1';
    });
  }, 2800);
  
  // Start fade out effect after animation completes
  setTimeout(() => {
    overlay.style.transition = 'opacity 0.8s ease-out';
    overlay.style.opacity = '0';
  }, 3200);

  // Remove overlay after fade out completes
  setTimeout(() => {
    overlay.classList.remove('fadeIn');
    if (overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  }, 4000); // 3200ms + 800ms fade out
};

// Initialize page loaded state
export const initializePageTransitions = () => {
  // Clean up any lingering overlays
  const existingOverlays = document.querySelectorAll('.animate_content, .fadeIn');
  existingOverlays.forEach(overlay => {
    if (overlay.parentNode && !overlay.classList.contains('content-container')) {
      overlay.parentNode.removeChild(overlay);
    }
  });
  
  // Ensure all content is visible
  const allSections = document.querySelectorAll('section, .carousel-container, .about-container, .contact-container');
  allSections.forEach(section => {
    section.style.opacity = '1';
  });
};