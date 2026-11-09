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
        return <Code2 className="w-5 h-5 text-amber-600" />;
      case 'web development':
        return <Layers className="w-5 h-5 text-sky-600" />;
      case 'graphic design':
        return <Palette className="w-5 h-5 text-indigo-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <motion.section
      id="learning"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "-60px" }}
      className="py-16 md:py-24 border-t border-slate-200/80 bg-slate-100/50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div variants={cardVariants} className="mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-amber-600 mb-2">
            02 / Continuous Growth
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Currently Learning
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
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
              className="p-5 rounded-xl bg-white/95 border border-slate-200/90 hover:border-slate-300 transition-colors flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    {getIcon(item.name)}
                  </div>
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                    item.status?.toLowerCase().includes('completed')
                      ? 'text-sky-700 bg-sky-50 border-sky-200 font-medium'
                      : 'text-emerald-700 bg-emerald-50 border-emerald-200 font-medium'
                  }`}>
                    {item.status || 'Active Study'}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-xs font-mono text-amber-600 mb-3">
                  {item.category}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {item.notes}
                </p>

                {item.tools && item.tools.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Self-paced</span>
                <span>{item.status || 'In Progress'}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
