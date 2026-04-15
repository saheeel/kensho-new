import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './NotFound.css';

const NotFound = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.notfound-content > *', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'expo.out',
        delay: 0.2
      });

      gsap.from('.notfound-bg-text', {
        scale: 1.2,
        opacity: 0,
        duration: 2.5,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="notfound-container" ref={containerRef}>
      <div className="notfound-bg-text">404</div>
      
      <div className="notfound-content" ref={contentRef}>
        <div className="glitch-wrapper">
          <h1 className="glitch-404" data-text="404">404</h1>
        </div>
        
        <h2 className="notfound-title">PAGE NOT FOUND.</h2>
        <p className="notfound-text">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/" className="btn-sleek">
          BACK TO HOME →
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
