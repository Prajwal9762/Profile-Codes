import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { GraduationCap, Terminal, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { personal, skillsAndTools, certifications } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  const transitionConfig = {
    duration: shouldReduceMotion ? 0.01 : 0.85,
    ease: [0.16, 1, 0.3, 1],
  };

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 45 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...transitionConfig,
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
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
      viewport={{ once: true, amount: 0.12, margin: "-40px" }}
      className="py-16 md:py-24 border-t border-slate-200/80"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div variants={childVariants} className="mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-amber-600 mb-2">
            01 / Introduction
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            About Me
          </h2>
        </motion.div>

        {/* Story & Background */}
        <motion.div 
          variants={childVariants} 
          className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl mb-12"
        >
          {personal.aboutText.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </motion.div>

        {/* Education & Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {/* Education Highlight Card */}
          <motion.div 
            variants={childVariants}
            className="p-5 sm:p-6 rounded-xl bg-white/95 border border-slate-200/90 flex items-start gap-4 hover:border-slate-300 transition-colors shadow-xs"
          >
            <div className="p-2.5 rounded-lg bg-sky-50 text-sky-600 border border-sky-100 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-x-2 text-xs font-mono text-slate-500 mb-1">
                <span>Academic Background</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-600 font-medium">In Progress</span>
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                {personal.education.degree}
              </h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Studying Computer Science and Information Technology, focusing on programming fundamentals, data structures, and computer systems.
              </p>
            </div>
          </motion.div>

          {/* Certification / Achievement Card */}
          {certifications && certifications.length > 0 && (
            <motion.div 
              variants={childVariants}
              className="p-5 sm:p-6 rounded-xl bg-white/95 border border-slate-200/90 flex items-start gap-4 hover:border-slate-300 transition-colors shadow-xs"
            >
              <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-100 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-x-2 text-xs font-mono text-slate-500 mb-1">
                  <span>Certification</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-600 font-medium">{certifications[0].issuer}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  {certifications[0].title}
                </h3>
                {certifications[0].notes && (
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {certifications[0].notes}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Technical Experience & Learning */}
        <motion.div variants={childVariants}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-600 mb-4 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-600" />
            <span>Technologies & Tools I Have Worked With</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Programming & Tech */}
            <div className="p-5 rounded-xl bg-white/95 border border-slate-200/90 shadow-xs">
              <h4 className="text-xs font-mono uppercase text-slate-500 mb-3 tracking-wide">
                Languages & Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsAndTools.languagesAndTech.map((item) => (
                  <span
                    key={item}
                    className="text-sm px-3 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200 font-mono"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Practical Areas */}
            <div className="p-5 rounded-xl bg-white/95 border border-slate-200/90 shadow-xs">
              <h4 className="text-xs font-mono uppercase text-slate-500 mb-3 tracking-wide">
                Hands-on Exploration
              </h4>
              <ul className="space-y-2.5">
                {skillsAndTools.handsOnExperience.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-500 font-mono">
            * Listed as tools and domains I have actively used or studied; no exaggerated claims or arbitrary percentage bars.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};
