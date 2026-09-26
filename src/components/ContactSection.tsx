import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Github, Linkedin, MessageSquare, Mail, Copy, Check, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { socials } = portfolioData;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitionConfig,
    },
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <motion.section
      id="contact"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "-60px" }}
      className="py-16 md:py-24 border-t border-slate-800/80 bg-slate-900/30"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div variants={childVariants} className="mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
            05 / Get In Touch
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Social & Contact
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl">
            Feel free to reach out for conversations about coding, collaborative projects, or tech discussions.
          </p>
        </motion.div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <motion.div
            variants={childVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-5 sm:p-6 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-sky-950/70 text-sky-400 border border-sky-800/50">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-white">Email</span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(socials.email.address, 'email')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-2 py-1 rounded bg-slate-750 hover:bg-slate-700 border border-slate-650 transition-colors cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedKey === 'email' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-300 mb-3 break-all">
              {socials.email.address}
            </p>
            <a
              href={`mailto:${socials.email.address}`}
              className="text-xs text-sky-400 hover:text-sky-300 font-medium inline-flex items-center gap-1 pt-2 border-t border-slate-700/70"
            >
              <span>Send an email</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </motion.div>

          {/* GitHub */}
          <motion.div
            variants={childVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-5 sm:p-6 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-slate-750 text-slate-200 border border-slate-650">
                  <Github className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-white">GitHub</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Prajwal9762</span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-300 mb-3">
              github.com/Prajwal9762
            </p>
            <a
              href={socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-sky-400 hover:text-sky-300 font-medium inline-flex items-center gap-1 pt-2 border-t border-slate-700/70"
            >
              <span>Visit profile</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </motion.div>

          {/* LinkedIn */}
          <motion.div
            variants={childVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-5 sm:p-6 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-sky-950/70 text-sky-400 border border-sky-800/50">
                  <Linkedin className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-white">LinkedIn</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Connect</span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-300 mb-3 truncate">
              prajwal-pokharel-1a77b943a
            </p>
            <a
              href={socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-sky-400 hover:text-sky-300 font-medium inline-flex items-center gap-1 pt-2 border-t border-slate-700/70"
            >
              <span>Visit profile</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </motion.div>

          {/* Discord */}
          <motion.div
            variants={childVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-5 sm:p-6 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-950/70 text-indigo-400 border border-indigo-800/50">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-white">Discord</span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(socials.discord.handle, 'discord')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-2 py-1 rounded bg-slate-750 hover:bg-slate-700 border border-slate-650 transition-colors cursor-pointer"
                title="Copy Discord handle"
              >
                {copiedKey === 'discord' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-300 mb-3">
              Handle: <span className="text-white font-medium">{socials.discord.handle}</span>
            </p>
            <span className="text-xs text-slate-400 pt-2 border-t border-slate-700/70">
              Direct message on Discord
            </span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
