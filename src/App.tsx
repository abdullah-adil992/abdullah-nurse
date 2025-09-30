import { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection';
import LanguageSkills from './components/LanguageSkills';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <HeroSection />
      <LanguageSkills />
      <Toaster />
    </div>
  );
}

export default App;
