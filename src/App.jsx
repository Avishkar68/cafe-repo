import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Flower, Heart, Sparkles, Gift, Cake, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const BirthdayWebsite = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const carouselRef = useRef(null);
  const flowersRef = useRef([]);
  const memorySectionRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMemoryMessage, setShowMemoryMessage] = useState(false);
  const audioRef = useRef(null);
  const currentImageIndex = useRef(0);
  const memoryImagesContainerRef = useRef(null);

  // Sample images array - replace with your actual image URLs
  const memoryImages = [
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop',
  ];

  // Add flowers to the ref array
  const addToFlowersRef = (el) => {
    if (el && !flowersRef.current.includes(el)) {
      flowersRef.current.push(el);
    }
  };

  // Function to play the song and start showing images
  const playSongAndMemories = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Replace with your "Varoon" song URL
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setShowMemoryMessage(true);
        // Clear the images container
        if (memoryImagesContainerRef.current) {
          memoryImagesContainerRef.current.innerHTML = '';
        }
      });
    }

    setIsPlaying(true);
    audioRef.current.play();
    startShowingImages();
  };

  // Function to show images one by one
  const startShowingImages = () => {
    currentImageIndex.current = 0;
    showNextImage();
  };

  const showNextImage = () => {
    if (currentImageIndex.current >= memoryImages.length || !isPlaying) {
      return;
    }

    // Clear previous images
    if (memoryImagesContainerRef.current) {
      memoryImagesContainerRef.current.innerHTML = '';
    }

    // Create new image element
    const img = document.createElement('img');
    img.src = memoryImages[currentImageIndex.current];
    img.className = 'absolute inset-0 w-full h-full object-cover rounded-lg';
    img.style.opacity = '0';

    if (memoryImagesContainerRef.current) {
      memoryImagesContainerRef.current.appendChild(img);
    }

    // Animate image appearance
    gsap.to(img, {
      opacity: 1,
      duration: 1,
      onComplete: () => {
        // After showing for 3 seconds, fade out and show next image
        gsap.to(img, {
          opacity: 0,
          duration: 1,
          delay: 3,
          onComplete: () => {
            currentImageIndex.current++;
            if (currentImageIndex.current < memoryImages.length) {
              showNextImage();
            }
          }
        });
      }
    });
  };

  useEffect(() => {
    // Title animation
    gsap.from(titleRef.current, {
      duration: 1.5,
      y: -50,
      opacity: 0,
      ease: 'elastic.out(1, 0.5)',
    });

    // Subtitle animation
    gsap.from(subtitleRef.current, {
      duration: 1,
      x: -100,
      opacity: 0,
      delay: 0.5,
      ease: 'power3.out',
    });

    // Flowers animation
    flowersRef.current.forEach((flower, i) => {
      gsap.from(flower, {
        duration: 1,
        scale: 0,
        opacity: 0,
        delay: 0.2 + i * 0.1,
        ease: 'back.out(1.7)',
      });
    });

    // Infinite carousel animation
    const carousel = carouselRef.current;
    if (carousel && carousel.firstElementChild) {
      const firstImage = carousel.firstElementChild;
      
      gsap.to(carousel, {
        x: -firstImage.offsetWidth,
        duration: 20,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % firstImage.offsetWidth)
        }
      });
    }

    // Floating hearts animation
    const createFloatingHeart = () => {
      const heart = document.createElement('div');
      heart.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="#FF6B6B"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
      heart.style.position = 'absolute';
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
    }, 2000);

    return () => {
      clearTimeout(heartTimer);
      if (carousel) {
        gsap.killTweensOf(carousel);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Your single image repeated multiple times to create a continuous strip
  const carouselImages = [
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop',
  ];

  const memories = [
    { id: 1, text: "Our first meet", icon: <Sparkles className="inline mb-1" /> },
    { id: 2, text: "Shared laughter", icon: <Heart className="inline mb-1" /> },
    { id: 3, text: "Special moments", icon: <Flower className="inline mb-1" /> },
    { id: 4, text: "Future dreams", icon: <Gift className="inline mb-1" /> },
  ];

  return (
    <div className="min-h-screen overflow-hidden relative flex flex-col items-center justify-center" style={{ backgroundColor: '#004030' }}>
      {/* Floating flowers decoration */}
      <div className="absolute top-10 left-10" ref={addToFlowersRef}>
        <Flower size={40} color="#FEFAE0" />
      </div>
      <div className="absolute top-20 right-16" ref={addToFlowersRef}>
        <Flower size={50} color="#FEFAE0" />
      </div>
      <div className="absolute bottom-20 left-1/4" ref={addToFlowersRef}>
        <Flower size={45} color="#FEFAE0" />
      </div>
      <div className="absolute bottom-1/3 right-20" ref={addToFlowersRef}>
        <Flower size={35} color="#FEFAE0" />
      </div>
      <div className="absolute top-1/4 left-1/3" ref={addToFlowersRef}>
        <Flower size={55} color="#FEFAE0" />
      </div>

      {/* Main content - perfectly centered */}
      <div className="w-full max-w-4xl px-4 py-8 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="mb-6"
        >
          <Cake size={80} color="#FEFAE0" />
        </motion.div>

        <div className="text-center w-full">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
            style={{ 
              color: '#FEFAE0',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              fontFamily: "'Dancing Script', cursive, sans-serif"
            }}
          >
            Happy Birthday Falashree!
          </h1>

          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl mb-8 max-w-md mx-auto leading-relaxed"
            style={{ 
              color: '#FEFAE0',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              letterSpacing: '0.5px'
            }}
          >
            Wishing you a day filled with love, joy, and wonderful surprises!
          </p>
        </div>

        {/* Continuous horizontal image strip */}
        <div className="w-full mb-8 overflow-hidden relative h-48 mx-auto">
          <div 
            ref={carouselRef}
            className="flex absolute top-0 left-0 h-full"
          >
            {carouselImages.map((img, index) => (
              <div key={index} className="h-full px-2 flex-shrink-0">
                <img 
                  src={img} 
                  alt={`Memory ${index}`}
                  className="h-full w-auto object-cover rounded-lg shadow-lg"
                  style={{ minWidth: '300px', maxWidth: 'none' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Special memories - centered grid */}
        <div className="w-full flex justify-center mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {memories.map((memory) => (
              <motion.div
                key={memory.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-opacity-20 bg-white rounded-xl p-4 text-center backdrop-blur-sm"
                style={{ 
                  color: '#FEFAE0', 
                  border: '1px solid #FEFAE0',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="text-2xl mb-1">{memory.icon}</div>
                <p 
                  className="text-md font-medium"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {memory.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Birthday message */}
        <div className="w-full max-w-lg text-center relative mb-6 px-4">
          <div className="absolute -top-4 -left-4">
            <Sparkles size={20} color="#FEFAE0" />
          </div>
          <div className="absolute -bottom-4 -right-4">
            <Sparkles size={20} color="#FEFAE0" />
          </div>
          <p 
            className="text-base md:text-lg italic leading-relaxed p-4 rounded-lg"
            style={{ 
              color: '#FEFAE0',
              backgroundColor: 'rgba(0, 64, 48, 0.5)',
              border: '1px solid rgba(254, 250, 224, 0.3)',
              fontFamily: "'Playfair Display', serif",
              lineHeight: '1.6'
            }}
          >
            "On this special day, I wish you endless happiness, success in all your endeavors, 
            and a life filled with love and beautiful moments. You're an amazing person, 
            and I'm grateful to have you in my life. Enjoy your day to the fullest!"
          </p>
        </div>

        {/* Interactive confetti button */}
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: '0 5px 15px rgba(254, 250, 224, 0.4)' }}
          whileTap={{ scale: 0.9 }}
          className="mt-6 px-6 py-2 rounded-full flex items-center font-medium transition-all"
          style={{ 
            backgroundColor: '#FEFAE0', 
            color: '#004030',
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: '0.5px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          onClick={() => {
            // Create confetti effect
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
          }}
        >
          <Sparkles className="mr-2" />
          Click for Surprise!
        </motion.button>
      </div>

      {/* Song and Memory Section */}
   {/* Song and Memory Section */}
<div 
  ref={memorySectionRef}
  className="w-full py-12 px-4 flex flex-col items-center justify-center"
  style={{ backgroundColor: 'rgba(0, 64, 48, 0.8)' }}
>
  {!isPlaying && !showMemoryMessage ? (
    <div className="text-center max-w-lg">
      <h2 
        className="text-2xl md:text-3xl font-bold mb-6"
        style={{ 
          color: '#FEFAE0',
          fontFamily: "'Dancing Script', cursive, sans-serif"
        }}
      >
        A Special Song for You
      </h2>
      <p 
        className="text-lg mb-8"
        style={{ 
          color: '#FEFAE0',
          fontFamily: "'Montserrat', sans-serif"
        }}
      >
        Here's a song dedicated just for you. Press play to listen while we take a walk down memory lane.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 rounded-full flex items-center mx-auto font-medium"
        style={{ 
          backgroundColor: '#FEFAE0', 
          color: '#004030',
          fontFamily: "'Montserrat', sans-serif"
        }}
        onClick={playSongAndMemories}
      >
        <Play className="mr-2" />
        Play Song
      </motion.button>
    </div>
  ) : isPlaying ? (
    <div className="w-full max-w-2xl h-64 md:h-80 relative rounded-lg overflow-hidden">
      <div 
        ref={memoryImagesContainerRef}
        className="w-full h-full relative"
      />
    </div>
  ) : showMemoryMessage ? (
    <div className="text-center max-w-lg">
      <h2 
        className="text-2xl md:text-3xl font-bold mb-6"
        style={{ 
          color: '#FEFAE0',
          fontFamily: "'Dancing Script', cursive, sans-serif"
        }}
      >
        Thank You for the Memories
      </h2>
      <p 
        className="text-lg mb-4"
        style={{ 
          color: '#FEFAE0',
          fontFamily: "'Montserrat', sans-serif"
        }}
      >
        Every moment with you is special. Here's to creating many more beautiful memories together!
      </p>
      <div className="mt-6">
        <Sparkles size={40} color="#FEFAE0" />
      </div>
    </div>
  ) : null}
</div>

      {/* Add Google Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@300;400;500&family=Playfair+Display:ital@1&display=swap');
        `}
      </style>
    </div>
  );
};

export default BirthdayWebsite;