import React, { useEffect } from "react";
import "./Footer.css";
import AnimatedText from "../animated-text/AnimatedText";

const Footer = () => {
  useEffect(() => {
    const text = "blench studio";
    const container = document.getElementById("flicker-container");
    
    // Check if text is already created to prevent duplicates
    if (!container || container.children.length > 0) return;
    
    function createP(text) {
      container.innerHTML = '';
      for(let i = 0; i < text.length; i++) {
        const p = document.createElement("p");
        p.classList.add("flicker");
        container.appendChild(p);
        p.innerHTML = text[i];
      }
    }
    
    createP(text);
    
    // Intersection Observer to trigger animation when footer comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          // Mark as animated to prevent re-triggering
          entry.target.dataset.animated = 'true';
          
          let temp = 0;
          const flickerDuration = 100;
          
          const myInterval = setInterval(() => {
            const p = document.getElementsByClassName("flicker");
            const randomNumber = Math.floor(Math.random() * p.length);
            
            // Set transition duration for smoother effect
            for(let i = 0; i < p.length; i++) {
              p[i].style.transitionDuration = "0.2s";
            }
            
            temp = temp + 1;
            
            if(!p[randomNumber].classList.contains("on") && temp < flickerDuration) {
              p[randomNumber].classList.add("on");
            } else {
              if(temp < flickerDuration) {
                p[randomNumber].classList.remove("on");
                p[randomNumber].classList.remove("white");
              } else {
                p[randomNumber].classList.add("white");
                p[randomNumber].classList.remove("on");
              }
            }
            
            if(temp == flickerDuration + 500) {
              clearInterval(myInterval);
            }
          }, 20);
        }
      });
    }, {
      threshold: 0.5 // Trigger when 50% of the footer is visible
    });
    
    // Observe the footer section
    const footerSection = document.getElementById("footer");
    if (footerSection) {
      observer.observe(footerSection);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <section className="footer" id="footer">
      <div className="footer-content">
        <div className="catchphrase">
          <h1 className="animated-text">
            <p>
              At All Costs
              <span data-text="At All Costs"></span>
              <span data-text="At All Costs"></span>
            </p>
          </h1>
        </div>

        <div className="footer-sections">
          <div className="footer-section logo-section">
            <AnimatedText 
              text="Blench" 
              fontSize="32px"
              duration={0.6}
              staggerDelay={0.05}
              repeatDelay={2}
              className="footer-logo-text"
            />
            <p className="copyright">© 2025 Blench. All rights reserved.</p>
          </div>

          <div className="footer-section social-section">
            <div className="flicker-container" id="flicker-container">
              {/* text generated with JS */}
            </div>
            <div className="social-links">
              <a
                href="https://discord.gg/blench"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <img src="/icons/discord.svg" alt="Discord" />
              </a>
              <a
                href="https://x.com/blench"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <img src="/icons/x.svg" alt="X" />
              </a>
            </div>
          </div>

          <div className="footer-section contact-section">
            <h3>
              Contact
              <span>Contact</span>
              <span>Contact</span>
              <span className="contact-email">contact@blench.xyz</span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
