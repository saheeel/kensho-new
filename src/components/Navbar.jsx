import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle transparent vs glass styling
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // If scrolling down aggressively, hide. If scrolling up, show.
      // Don't hide navbar if mobile menu is open
      if (currentScrollY > lastScrollY.current && currentScrollY > 150 && !isMobileMenuOpen) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hidden' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="container">
        <Link to="/" className="nav-brand hover-target" data-cursor-text="HOME">
          <img src="/logo.png" alt="Kensho Media Logo" />
        </Link>
        
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-item hover-target" data-text="HOME">
              <span>HOME</span>
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-item hover-target" data-text="OUR AGENCY">
              <span>OUR AGENCY</span>
            </Link>
          </li>
          <li>
            <Link to="/blogs" className="nav-item hover-target" data-text="INSIGHTS">
              <span>INSIGHTS</span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-item hover-target" data-text="TALK TO US">
              <span>TALK TO US</span>
            </Link>
          </li>
        </ul>
        
        <button 
          className={`menu-trigger hover-target ${isMobileMenuOpen ? 'active' : ''}`} 
          data-cursor-text={isMobileMenuOpen ? 'CLOSE' : 'OPEN'}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* Mobile Menu Card Popup */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-card">
          <ul className="mobile-nav-links">
            <li>
              <Link to="/" className="mobile-nav-item hover-target">HOME</Link>
            </li>
            <li>
              <Link to="/about" className="mobile-nav-item hover-target">OUR AGENCY</Link>
            </li>
            <li>
              <Link to="/blogs" className="mobile-nav-item hover-target">INSIGHTS</Link>
            </li>
            <li>
              <Link to="/contact" className="mobile-nav-item hover-target">TALK TO US</Link>
            </li>
          </ul>
          
          <div className="mobile-menu-footer">
            <p>Doha, Qatar</p>
            <p className="mobile-menu-email">hello@kenshomedia.com</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
