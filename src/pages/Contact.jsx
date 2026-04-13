import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Contact.css';

const Contact = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo('.clip-text-inner-contact', 
      { y: '110%' },
      { y: '0%', duration: 1.5, stagger: 0.1, ease: 'expo.out', delay: 0.2 }
    );
  }, []);

  return (
    <div className="contact-page" ref={containerRef}>
      <div className="grain-overlay"></div>
      
      <div className="contact-left">
        <h1 className="contact-title">
          <div className="clip-text"><span className="clip-text-inner-contact">START A</span></div><br/>
          <div className="clip-text"><span className="clip-text-inner-contact text-accent" style={{fontFamily: 'Playfair Display', fontStyle: 'italic', textTransform: 'lowercase'}}>project.</span></div>
        </h1>

        <div>
          <div className="contact-info-block">
            <div className="contact-label">HEADQUARTERS</div>
            <div className="contact-detail">
              Ten Works Business Center<br />
              Doha Souq Mall, Al Nasr
            </div>
          </div>
          <div className="contact-info-block" style={{marginTop: '2rem'}}>
            <div className="contact-label">ELECTRONIC MAIL</div>
            <div className="contact-detail">
              <a href="mailto:info@kenshomediagroup.com">info@kenshomediagroup.com</a>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-right">
        <p className="form-header">Provide us with a few details about your upcoming project or general inquiry. We selectively partner with brands aiming for massive growth.</p>
        
        <form className="clean-form" onSubmit={e => e.preventDefault()}>
          <div className="input-block">
            <input type="text" className="clean-input" placeholder="WHAT IS YOUR NAME? *" required />
          </div>
          <div className="input-block">
            <input type="email" className="clean-input" placeholder="YOUR EMAIL ADDRESS *" required />
          </div>
          <div className="input-block">
            <input type="text" className="clean-input" placeholder="COMPANY NAME OR URL" />
          </div>
          <div className="input-block">
            <textarea className="clean-input" placeholder="TELL US ABOUT THE PROJECT... *" required></textarea>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn-sleek">SUBMIT INQUIRY →</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
