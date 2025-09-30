import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate animation progress (0 to 1)
  const progress = Math.min(scrollY / 400, 1);
  
  // Image transforms
  const imageScale = 1 - progress * 0.7; // Scale from 1 to 0.3
  const imageTranslateY = -progress * 200; // Move up
  const imageBorderRadius = progress * 50; // 0% to 50%
  const imageOpacity = 1 - progress * 0.3; // Slight fade
  
  // Text animations
  const textTranslateX = progress * 100 - 100; // Slide from left (-100 to 0)
  const textOpacity = progress;
  
  // Background blur
  const backgroundBlur = progress * 8;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background blur overlay */}
      <div 
        className="absolute inset-0 bg-background/50 transition-all duration-300"
        style={{ 
          backdropFilter: `blur(${backgroundBlur}px)`,
          WebkitBackdropFilter: `blur(${backgroundBlur}px)`
        }}
      />
      
      {/* Large image section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32">
        <div 
          className="relative z-10 transition-all duration-300 ease-in-out"
          style={{
            transform: `translateY(${imageTranslateY}px) scale(${imageScale})`,
            opacity: imageOpacity
          }}
        >
          <div 
            className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] overflow-hidden shadow-2xl transition-all duration-300 ease-in-out"
            style={{ 
              borderRadius: `${imageBorderRadius}%`,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=800&fit=crop"
              alt="Abdullah - Professional Nurse"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Hero Section with name */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 -mt-32">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Circular image (visible when scrolled) */}
          <div className="flex justify-center md:justify-end order-2 md:order-1">
            <div 
              className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-primary/20 transition-all duration-500"
              style={{
                opacity: progress,
                transform: `scale(${0.8 + progress * 0.2})`
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=800&fit=crop"
                alt="Abdullah - Professional Nurse"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name and title - slides from left */}
          <div 
            className="text-center md:text-left order-1 md:order-2 transition-all duration-700 ease-out"
            style={{
              transform: `translateX(${textTranslateX}%)`,
              opacity: textOpacity
            }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-4 md:mb-6">
              Abdullah
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mb-4 md:mb-6">
              Professional Nurse
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl">
              Dedicated to providing exceptional healthcare with compassion, expertise, and unwavering commitment to patient well-being.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
