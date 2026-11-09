import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { LearningSection } from './components/LearningSection';
import { ProjectSection } from './components/ProjectSection';
import { ExperimentsSection } from './components/ExperimentsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import foxVideoAsset from './assets/video/fox_animation.mp4';
import foxLogo from './assets/images/fox_brand_logo.png';

export default function App() {
  const [activeSection, setActiveSection] = useState('top');
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initial loading screen animation timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Section scroll spy
  useEffect(() => {
    const sections = ['top', 'about', 'learning', 'project', 'experiments', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force play video on mount and on first user interaction
  useEffect(() => {
    const attemptPlay = () => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      }
    };

    attemptPlay();
    const handleInteraction = () => {
      attemptPlay();
    };

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('scroll', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  const scrollToProject = () => {
    const el = document.getElementById('project');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen text-slate-900 font-sans selection:bg-amber-500/20 selection:text-slate-900 relative">
      {/* Intro Loading Screen with Rotating Fox Logo */}
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* Fox Animation Video Background */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed inset-0 overflow-hidden -z-10 bg-slate-950"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={foxLogo}
          className="w-full h-full object-cover opacity-85 scale-105"
        >
          <source src={foxVideoAsset} type="video/mp4" />
          <source src="/fox_animation.mp4" type="video/mp4" />
          <source src="./fox_animation.mp4" type="video/mp4" />
        </video>
        
        {/* Soft balanced white overlay allowing the animated fox to shine clearly while keeping typography crisp */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/55 to-white/75" />
        
        {/* Warm golden light glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[520px] bg-gradient-to-b from-amber-400/20 via-orange-300/10 to-transparent rounded-full blur-3xl opacity-80" />
      </div>

      {/* Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main>
        <Hero onViewProject={scrollToProject} />
        <AboutSection />
        <LearningSection />
        <ProjectSection />
        <ExperimentsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
