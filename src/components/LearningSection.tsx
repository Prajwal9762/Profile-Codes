import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { BookOpen, Layers, Code2, Palette } from 'lucide-react';

export const LearningSection: React.FC = () => {
  const { currentlyLearning } = portfolioData;
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
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitionConfig,
    },
  };

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'python':
        return <Code2 className="w-5 h-5 text-sky-400" />;
      case 'web development':
        return <Layers className="w-5 h-5 text-sky-400" />;
      case 'graphic design':
        return <Palette className="w-5 h-5 text-sky-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <motion.section
      id="learning"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "-60px" }}
      className="py-16 md:py-24 border-t border-slate-800/80 bg-slate-900/30"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div variants={cardVariants} className="mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
            02 / Continuous Growth
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Currently Learning
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl">
            Areas I am actively dedicating time to expand my understanding and practical skills.
          </p>
        </motion.div>

        {/* Learning Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentlyLearning.map((item) => (
            <motion.div
              key={item.name}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-slate-600/90 transition-colors flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-slate-750 border border-slate-700">
                    {getIcon(item.name)}
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                    Active Study
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-1">
                  {item.name}
                </h3>
                <p className="text-xs font-mono text-sky-400/90 mb-3">
                  {item.category}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.notes}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Self-paced</span>
                <span>In Progress</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
