import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { portfolioData, Project } from '../data/portfolioData';
import { Github, ExternalLink, Bot, CheckCircle2, ChevronRight, X, AlertCircle } from 'lucide-react';

export const ProjectSection: React.FC = () => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

  const childVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitionConfig,
    },
  };

  return (
    <motion.section
      id="project"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "-60px" }}
      className="py-16 md:py-24 border-t border-slate-200/80"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div variants={childVariants} className="mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-amber-600 mb-2">
            03 / Featured Work
          </p>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Projects
            </h2>
            <span className="text-xs font-mono text-slate-500">
              Only showing completed work
            </span>
          </div>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
            Real projects built through hands-on practice. No fabricated clients or padded statistics.
          </p>
        </motion.div>

        {/* Project List */}
        <div className="space-y-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={childVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-6 sm:p-8 rounded-2xl bg-white/95 border border-slate-200/90 hover:border-slate-300 transition-colors shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-sky-50 text-sky-600 border border-sky-100">
                      <Bot className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                      Built & Maintained
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {project.title}
                  </h3>
                  {project.tagline && (
                    <p className="text-sm text-amber-700 font-medium mt-0.5">
                      {project.tagline}
                    </p>
                  )}
                </div>

                {/* Technologies used */}
                <div className="flex flex-wrap gap-1.5 self-start">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Exact Description Provided */}
              <p className="text-base text-slate-700 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Feature Grid */}
              <div className="mb-6 pt-5 border-t border-slate-100">
                <h4 className="text-xs font-mono uppercase text-slate-500 tracking-wider mb-3">
                  Implemented Bot Subsystems
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note */}
              {project.note && (
                <div className="mb-6 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{project.note}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-colors shadow-xs"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 font-medium text-sm transition-colors cursor-pointer shadow-2xs"
                >
                  <span>View Project Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {project.projectUrl ? (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
                  >
                    <span>Live Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Details Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto z-10"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-amber-600">
                <Bot className="w-4 h-4" />
                <span>Project Overview</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {selectedProject.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
                  Features & Systems Included:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
                  {selectedProject.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-sm transition-colors shadow-xs"
                >
                  <span>Open GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
