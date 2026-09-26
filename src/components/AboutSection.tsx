import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { GraduationCap, Terminal } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { personal, skillsAndTools } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  const transitionConfig = {
    duration: shouldReduceMotion ? 0.01 : 0.75,
    ease: [0.22, 1, 0.36, 1],
  };

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...transitionConfig,
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitionConfig,
    },
  };

  return (
    <motion.section
      id="about"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "-60px" }}
      className="py-16 md:py-24 border-t border-slate-800/80"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div variants={childVariants} className="mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
            01 / Introduction
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            About Me
          </h2>
        </motion.div>

        {/* Story & Background */}
        <motion.div 
          variants={childVariants} 
          className="space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mb-12"
        >
          {personal.aboutText.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </motion.div>

        {/* Education Highlight Card */}
        <motion.div 
          variants={childVariants}
          className="p-5 sm:p-6 rounded-xl bg-slate-800/60 border border-slate-700/80 mb-12 flex items-start gap-4 hover:border-slate-600/80 transition-colors shadow-sm"
        >
          <div className="p-2.5 rounded-lg bg-sky-950/70 text-sky-400 border border-sky-800/50 shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-2 text-xs font-mono text-slate-400 mb-1">
              <span>Academic Background</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-medium">In Progress</span>
            </div>
            <h3 className="text-base font-semibold text-white">
              {personal.education.degree}
            </h3>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              Studying Computer Science and Information Technology, focusing on programming fundamentals, data structures, and computer systems.
            </p>
          </div>
        </motion.div>

        {/* Technical Experience & Learning */}
        <motion.div variants={childVariants}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-sky-400" />
            <span>Technologies & Tools I Have Worked With</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Programming & Tech */}
            <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/80 shadow-xs">
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-3 tracking-wide">
                Languages & Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsAndTools.languagesAndTech.map((item) => (
                  <span
                    key={item}
                    className="text-sm px-3 py-1 rounded-md bg-slate-750/90 text-slate-200 border border-slate-700/80 font-mono shadow-2xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Practical Areas */}
            <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/80 shadow-xs">
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-3 tracking-wide">
                Hands-on Exploration
              </h4>
              <ul className="space-y-2.5">
                {skillsAndTools.handsOnExperience.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-400 font-mono">
            * Listed as tools and domains I have actively used or studied; no exaggerated claims or arbitrary percentage bars.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};
