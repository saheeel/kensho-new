import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    // Force a slightly delayed refresh to catch accurate page height after content settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const anim = gsap.fromTo('.giant-text-fill', 
      { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' },
      {
        clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: 'none',
        scrollTrigger: {
          trigger: '.footer-giant-title',
          start: 'top 100%', 
          end: 'bottom bottom',
          scrub: 1.5,
          invalidateOnRefresh: true,
        }
      }
    );

    return () => {
      clearTimeout(refreshTimer);
      anim.kill();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-inner">
        <div className="footer-col">
          <h4>LOCATE US</h4>
          <p>
            Block No.6<br />
            Barwa Commercial Avenue, Doha
          </p>
        </div>
        <div className="footer-col">
          <h4>GET IN TOUCH</h4>
          <a href="mailto:info@kenshomediagroup.com">info@kenshomediagroup.com</a>
          <a href="tel:97450590808">(+974) 5059 0808</a>
          
          <div className="footer-socials">
            <a href="https://www.instagram.com/kenshomedia.qa" target="_blank" rel="noopener noreferrer" className="social-link"><Instagram size={18} /></a>
            <a href="https://www.facebook.com/people/Kensho-Media/100093452855409/" target="_blank" rel="noopener noreferrer" className="social-link"><Facebook size={18} /></a>
            <a href="https://www.linkedin.com/company/kensho-media-qatar/" target="_blank" rel="noopener noreferrer" className="social-link"><Linkedin size={18} /></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>NAVIGATION</h4>
          <Link to="/">Home</Link>
          <Link to="/about">Our Agency</Link>
          <Link to="/blogs">Insights</Link>
          <Link to="/contact">Talk To Us</Link>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <span>© 2026 KENSHO MEDIA GROUP</span>
        <button className="hover-target" data-cursor-text="UP" onClick={scrollToTop}>BACK TO TOP ↑</button>
      </div>

      <div className="footer-giant-title">
        <div className="giant-text-outline">KENSHO</div>
        <div className="giant-text-fill">KENSHO</div>
      </div>
    </footer>
  );
};

export default Footer;
