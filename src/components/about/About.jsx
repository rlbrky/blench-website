import React from 'react';
import './about.css';

const About = () => {
  return (
    <section className="about-us" id="about-us">
      <div className="about-content">
        <div className="about-image">
          <img src="/about-us.png" alt="About Blench" />
        </div>
        <div className="about-text">
          <div className="about-main-content">
            <p>Our name once meant to flinch in fear.<br />
            But not here. Not in our world.</p>
            
            <p>In our world, it's a scar, not a weakness.<br />
            Now, it stands for the ones who don't back down.<br />
            The ones shaped by fire, not broken by it.</p>
            
            <p>Blench is built on a story.<br />
            A story born in a peaceful place and shattered in a single night.<br />
            Grief turned into grit.<br />
            Fear into fuel.<br />
            And from the ashes, a quiet oath was made.</p>
            
            <p>Blench isn't just a name.<br />
            It's a scar, a symbol, a promise.<br />
            For those who carry their past like armor.</p>
          </div>
          
          <p className="about-closing">This is where that journey begins.</p>
        </div>
      </div>
    </section>
  );
};

export default About;