import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let speed = 0.2;

    const updatePosition = () => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;
      gsap.set(cursor, { 
        x: pos.x, 
        y: pos.y,
        xPercent: -50,
        yPercent: -50
      });
    };

    const updateCoordinates = e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .hover-target');
      if (target) {
        cursor.classList.add('hover');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, .hover-target');
      if (target) {
        cursor.classList.remove('hover');
      }
    };

    window.addEventListener('mousemove', updateCoordinates);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    gsap.ticker.add(updatePosition);

    return () => {
      window.removeEventListener('mousemove', updateCoordinates);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      gsap.ticker.remove(updatePosition);
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef}></div>
  );
}
