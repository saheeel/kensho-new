import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [hoverText, setHoverText] = useState('');

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let speed = 0.2;

    const updatePosition = () => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;
      gsap.set(cursor, { x: pos.x, y: pos.y });
    };

    const updateCoordinates = e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .hover-target');
      if (target) {
        // Hide completely over navbar or standard buttons we don't want giant text on
        if (target.closest('.navbar') || target.closest('.footer') || target.closest('form')) {
          cursor.classList.add('hide');
          return;
        }
        
        cursor.classList.remove('hide');
        cursor.classList.add('hover');
        setHoverText(target.dataset.cursorText || 'VIEW');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, .hover-target');
      if (target) {
        cursor.classList.remove('hover');
        cursor.classList.remove('hide');
        setHoverText('');
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
    <div className="custom-cursor" ref={cursorRef}>
      <span className="cursor-text" style={{ transform: 'translate(-50%, -50%)', display: 'block' }}>{hoverText}</span>
    </div>
  );
}
