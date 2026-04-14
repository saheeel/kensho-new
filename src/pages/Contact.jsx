import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Contact.css';

const Contact = () => {
  const containerRef = useRef(null);
  const [status, setStatus] = useState(""); // "", "sending", "success", "error"

  useEffect(() => {
    gsap.fromTo('.clip-text-inner-contact', 
      { y: '110%' },
      { y: '0%', duration: 1.5, stagger: 0.1, ease: 'expo.out', delay: 0.2 }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/myklzwpk", { // REPLACABLE: mqkowpvr
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

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
              Block No.6<br />
              Barwa Commercial Avenue, Doha
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
        {status === "success" ? (
          <div className="success-message animate-fade-in">
            <h2 className="text-accent" style={{fontSize: '3rem', marginBottom: '1.5rem'}}>THANK YOU.</h2>
            <p style={{fontSize: '1.2rem', opacity: 0.7}}>Your inquiry has been received. Our team will review your project details and reach out shortly.</p>
            <button className="btn-sleek" style={{marginTop: '2.5rem'}} onClick={() => setStatus("")}>SEND ANOTHER INQUIRY</button>
          </div>
        ) : (
          <>
            <p className="form-header">Provide us with a few details about your upcoming project or general inquiry. We selectively partner with brands aiming for massive growth.</p>
            
            <form className="clean-form" onSubmit={handleSubmit}>
              <div className="input-block">
                <input name="name" type="text" className="clean-input" placeholder="WHAT IS YOUR NAME? *" required />
              </div>
              <div className="input-block">
                <input name="email" type="email" className="clean-input" placeholder="YOUR EMAIL ADDRESS *" required />
              </div>
              <div className="input-block">
                <input name="company" type="text" className="clean-input" placeholder="COMPANY NAME OR URL" />
              </div>
              <div className="input-block">
                <textarea name="message" className="clean-input" placeholder="TELL US ABOUT THE PROJECT... *" required></textarea>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <button type="submit" className="btn-sleek" disabled={status === "sending"}>
                  {status === "sending" ? "SENDING..." : "SUBMIT INQUIRY →"}
                </button>
              </div>
              {status === "error" && (
                <p style={{color: '#ff4444', marginTop: '1rem', fontSize: '0.9rem'}}>Something went wrong. Please try again or email us directly.</p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Contact;
