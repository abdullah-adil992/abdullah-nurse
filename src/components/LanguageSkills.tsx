import { useEffect, useRef, useState } from 'react';

interface LanguageSkill {
  name: string;
  percentage: number;
  color: string;
}

const languages: LanguageSkill[] = [
  { name: 'Pashto', percentage: 85, color: 'hsl(var(--primary))' },
  { name: 'English', percentage: 70, color: 'hsl(221.2 83.2% 53.3%)' },
  { name: 'Urdu', percentage: 95, color: 'hsl(262.1 83.3% 57.8%)' },
];

const CircularProgress = ({ 
  language, 
  index, 
  isVisible 
}: { 
  language: LanguageSkill; 
  index: number;
  isVisible: boolean;
}) => {
  const [progress, setProgress] = useState(0);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const delay = index * 200; // Stagger effect
    const duration = 1500; // Animation duration
    const steps = 60;
    const stepDuration = duration / steps;
    
    const timer = setTimeout(() => {
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const currentProgress = (currentStep / steps) * language.percentage;
        setProgress(currentProgress);
        setDisplayPercentage(Math.round(currentProgress));
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setProgress(language.percentage);
          setDisplayPercentage(language.percentage);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, language.percentage, index]);

  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div 
      className="flex flex-col items-center gap-4 transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        transitionDelay: `${index * 200}ms`
      }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={language.color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-in-out"
            style={{
              filter: 'drop-shadow(0 0 8px currentColor)',
            }}
          />
        </svg>
        
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-foreground">
            {displayPercentage}%
          </span>
        </div>
      </div>
      
      {/* Language name */}
      <h3 className="text-xl font-semibold text-foreground">
        {language.name}
      </h3>
    </div>
  );
};

const LanguageSkills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 md:px-8 py-16 md:py-20"
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-foreground mb-12 md:mb-16">
          Language Skills
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {languages.map((language, index) => (
            <CircularProgress
              key={language.name}
              language={language}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguageSkills;
