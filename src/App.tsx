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

  // Ensure video reliably starts playing when ready
  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Handled: muted autoplay
        });
      }
    };

    playVideo();
    window.addEventListener('click', playVideo, { once: true });
    window.addEventListener('touchstart', playVideo, { once: true });

    return () => {
      window.removeEventListener('click', playVideo);
      window.removeEventListener('touchstart', playVideo);
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
        className="pointer-events-none fixed inset-0 overflow-hidden -z-10 bg-slate-900"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={foxLogo}
          className="w-full h-full object-cover opacity-85 filter contrast-105 scale-105"
        >
          {/* Direct imported asset bundled by Vite */}
          <source src={foxVideoAsset} type="video/mp4" />
          <source src="./fox_animation.mp4" type="video/mp4" />
          <source src="/fox_animation.mp4" type="video/mp4" />
        </video>
        
        {/* Balanced light overlay: allows the fox animation to clearly shine through while keeping cards and text sharp */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/75 backdrop-blur-[0.5px]" />
        
        {/* Subtle warm amber ambient lighting */}
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
