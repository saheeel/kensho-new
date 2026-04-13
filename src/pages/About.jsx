import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './About.css';

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo('.clip-text-inner-about', 
      { y: '110%' },
      { y: '0%', duration: 1.5, stagger: 0.1, ease: 'expo.out', delay: 0.2 }
    );
  }, []);

  return (
    <div className="about-page" ref={containerRef}>
      <div className="grain-overlay"></div>
      
      <section className="about-hero">
        <h1 className="about-title">
          <div className="clip-text"><span className="clip-text-inner-about">BEYOND</span></div><br/>
          <div className="clip-text"><span className="clip-text-inner-about text-accent" style={{fontFamily: 'Playfair Display', fontStyle: 'italic', textTransform: 'lowercase'}}>the ordinary</span></div>
        </h1>
        <p className="about-manifesto">
          Kensho Media is a dynamic digital marketing agency based in Qatar. We believe that great marketing is built on profound understanding, not mere algorithms. We engineer <span className="text-accent">sustainable growth</span> by respecting audience intelligence and crafting exquisite authentic experiences.
        </p>
      </section>

      <section className="founders-section">
        <span className="section-label">THE ARCHITECTS</span>
        
        <div className="founder-grid">
          <div className="founder-card">
            <div className="founder-img-wrapper">
              <img src="/sulthan2.jpg" alt="Sulthan Abdulla" />
            </div>
            <div className="founder-info">
              <h3>SULTHAN ABDULLA</h3>
              <p>Managing Director</p>
            </div>
            <p className="founder-bio">With an eagle eye for operational excellence and strategic foresight, Sulthan bridges the gap between creative chaos and surgical business outcomes.</p>
          </div>

          <div className="founder-card" style={{ marginTop: '10vh' }}>
            <div className="founder-img-wrapper">
              <img src="/khalisa.jpg" alt="Afeefath Khalisa" />
            </div>
            <div className="founder-info">
              <h3>AFEEFATH KHALISA</h3>
              <p>Chief Operating Officer</p>
            </div>
            <p className="founder-bio">Khalisa orchestrates the agency's pulse. A master of execution and process, ensuring every campaign is deployed flawlessly and scales infinitely.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
