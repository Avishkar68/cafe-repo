import React from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Sparkles } from 'lucide-react';

export const ConfettiButton = ({ children = "Click for Surprise!" }) => {
  const createConfetti = () => {
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.innerHTML = ['🎉', '🎊', '✨', '🥳', '🎁', '🎂'][Math.floor(Math.random() * 6)];
      confetti.style.position = 'fixed';
      confetti.style.left = `${50 + (Math.random() - 0.5) * 30}%`;
      confetti.style.top = '60%';
      confetti.style.fontSize = `${20 + Math.random() * 20}px`;
      confetti.style.zIndex = '100';
      confetti.style.opacity = '0';
      document.body.appendChild(confetti);

      gsap.to(confetti, {
        y: `-${Math.random() * 300}`,
        x: `${(Math.random() - 0.5) * 300}`,
        rotation: Math.random() * 360,
        opacity: 1,
        duration: 2,
        ease: 'power1.out',
        onComplete: () => {
          document.body.removeChild(confetti);
        }
      });
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1, boxShadow: '0 5px 15px rgba(254, 250, 224, 0.4)' }}
      whileTap={{ scale: 0.9 }}
      className="mt-6 px-6 py-2 cursor-pointer rounded-full flex items-center font-medium transition-all"
      style={{ 
        backgroundColor: '#FEFAE0', 
        color: '#004030',
        fontFamily: "'Montserrat', sans-serif",
        letterSpacing: '0.5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
      onClick={createConfetti}
    >
      <Sparkles className="mr-2" />
      {children}
    </motion.button>
  );
};