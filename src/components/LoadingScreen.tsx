import React from 'react';
import { motion } from 'framer-motion';
import foxLogo from '../assets/images/fox_brand_logo.png';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer glowing pulsing ring */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-32 h-32 rounded-full bg-gradient-to-tr from-amber-400/30 via-orange-400/20 to-amber-200/40 blur-md pointer-events-none"
        />

        {/* Orbiting Rotating Dashed Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-28 h-28 rounded-full border-2 border-dashed border-amber-500/80"
        />

        {/* Secondary reverse orbiting accent ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-36 h-36 rounded-full border border-orange-300/40 border-t-amber-500"
        />

        {/* Center rotating & floating Logo */}
        <div className="absolute flex items-center justify-center">
          <motion.img
            src={foxLogo}
            alt="Prajwal Pokharel"
            animate={{
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-16 h-16 rounded-2xl object-cover shadow-lg border border-slate-200 ring-2 ring-amber-400/50"
          />
        </div>
      </div>

      {/* Loading title text & animated dots */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 flex flex-col items-center"
      >
        <span className="text-sm font-semibold tracking-wider text-slate-800 uppercase font-mono">
          Prajwal Pokharel
        </span>
        <span className="text-xs text-amber-600 mt-1 font-mono">
          Loading Portfolio...
        </span>
      </motion.div>
    </motion.div>
  );
};
