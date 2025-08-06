import React, { useEffect } from 'react';
import { gsap } from 'gsap';

export const FloatingHearts = () => {
  useEffect(() => {
    const createFloatingHeart = () => {
      const heart = document.createElement('div');
      heart.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="#FF6B6B"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
      heart.style.position = 'fixed';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = '110%';
      heart.style.opacity = '0';
      heart.style.zIndex = '10';
      document.body.appendChild(heart);

      const duration = 5 + Math.random() * 5;
      
      gsap.to(heart, {
        y: `-${window.innerHeight + 100}`,
        x: `${(Math.random() - 0.5) * 100}`,
        rotation: Math.random() * 360,
        opacity: 0.7,
        duration: duration,
        ease: 'power1.out',
        onComplete: () => {
          document.body.removeChild(heart);
        }
      });

      setTimeout(createFloatingHeart, 300);
    };

    // Start floating hearts after a delay
    const heartTimer = setTimeout(() => {
      createFloatingHeart();
    }, 200);

    return () => {
      clearTimeout(heartTimer);
    };
  }, []);

  return null; // This component doesn't render anything visible
};