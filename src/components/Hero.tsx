import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Code } from 'lucide-react';
import foxLogo from '../assets/images/fox_brand_logo_1787738690434.jpg';

interface HeroProps {
  onViewProject: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewProject }) => {
  const { personal, socials } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  const transitionConfig = {
    duration: shouldReduceMotion ? 0.01 : 0.75,
    ease: [0.22, 1, 0.36, 1],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitionConfig,
    },
  };

  return (
    <section id="top" className="relative pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Avatar & Status Header */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 mb-8">
            <div className="relative group shrink-0 w-24 h-24 sm:w-28 sm:h-28">
              {/* Subtle warm amber/orange aura matching the fox */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-500/30 via-orange-500/20 to-sky-500/20 blur-md opacity-75 group-hover:opacity-100 transition duration-500" />
              <img
                src={foxLogo}
                alt="Prajwal Pokharel"
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-slate-700/90 shadow-2xl bg-slate-900 ring-1 ring-white/10 group-hover:scale-[1.02] transition-transform duration-300"
              />
              <span 
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-[#111827] shadow-sm" 
                title="Active student & developer" 
              />
            </div>

            <div>
              {/* Status indicator */}
              <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 mb-2 px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700/80 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{personal.education.status} {personal.education.degree}</span>
              </div>
              <p className="text-sm font-medium text-slate-400">
                Developer & CSIT Student
              </p>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={itemVariants} 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4"
          >
            {personal.name}
          </motion.h1>

          {/* Natural Subtitle */}
          <motion.p 
            variants={itemVariants} 
            className="text-lg sm:text-xl font-medium text-sky-400 mb-5"
          >
            {personal.role}
          </motion.p>

          {/* Short honest sentence */}
          <motion.p 
            variants={itemVariants} 
            className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8"
          >
            {personal.shortBio}
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onViewProject}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-950 font-medium text-sm transition-all duration-150 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[#111827] cursor-pointer"
            >
              <Code className="w-4 h-4 text-slate-700" />
              <span>View Project</span>
              <ArrowDown className="w-3.5 h-3.5 text-slate-700" />
            </button>

            <a
              href={socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 font-medium text-sm transition-colors duration-150 shadow-xs"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href={socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 font-medium text-sm transition-colors duration-150 shadow-xs"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
