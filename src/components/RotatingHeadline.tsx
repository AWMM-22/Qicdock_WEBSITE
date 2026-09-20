import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface RotatingHeadlineProps {
  /** Static introductory text preceding or above the dynamic word (default: "Designed to ") */
  staticText?: string;
  /** Dynamic rotating words (default: ["Adapt", "Connect", "Power", "Mount", "Dock", "Charge", "Go"]) */
  words?: string[];
  /** Layout orientation: 'stacked' (two lines) or 'inline' (single line) */
  layout?: 'stacked' | 'inline';
  /** Text alignment: 'left', 'center', or 'right' */
  align?: 'left' | 'center' | 'right';
  /** Optional container class overrides */
  className?: string;
  /** Class name for the static text */
  staticTextClassName?: string;
  /** Class name for the dynamic rotating word container/typography */
  dynamicTextClassName?: string;
  /** Color or gradient classes for the dynamic text (default: "text-[#0A1E3F]" for Navy Blue) */
  gradientClassName?: string;
  /** Interval in milliseconds between word rotations (default 2200ms = 2.2s) */
  intervalMs?: number;
}

const DEFAULT_WORDS = [
  'Adapt',
  'Connect',
  'Power',
  'Mount',
  'Dock',
  'Charge',
  'Go',
];

export default function RotatingHeadline({
  staticText = 'Designed to ',
  words = DEFAULT_WORDS,
  layout = 'stacked',
  align = 'left',
  className = '',
  staticTextClassName = '',
  dynamicTextClassName = '',
  gradientClassName = 'text-[#0A1E3F]',
  intervalMs = 2200,
}: RotatingHeadlineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [words, intervalMs]);

  // Longest word calculation ensures layout constraints prevent CLS (Cumulative Layout Shift)
  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), '');

  const alignmentClasses = {
    left: 'items-start text-left justify-start',
    center: 'items-center text-center justify-center',
    right: 'items-end text-right justify-end',
  }[align];

  const justifyClasses = {
    left: 'justify-start text-left',
    center: 'justify-center text-center',
    right: 'justify-end text-right',
  }[align];

  // Motion variants meeting exact specs:
  // Incoming: Y: +24px -> 0px, Opacity: 0 -> 1, Blur: 6px -> 0px over 0.4s
  // Outgoing: Y: 0px -> -24px, Opacity: 1 -> 0, Blur: 0px -> 6px over 0.4s
  const wordVariants = {
    initial: {
      y: 24,
      opacity: 0,
      filter: 'blur(6px)',
    },
    animate: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1], // Smooth cubic ease-out
      },
    },
    exit: {
      y: -24,
      opacity: 0,
      filter: 'blur(6px)',
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1], // Smooth cubic ease-in
      },
    },
  };

  const currentWord = words[currentIndex] || '';
  const isGradient = gradientClassName.includes('gradient') || gradientClassName.includes('bg-');

  return (
    <div
      id="rotating-headline-container"
      className={`select-none ${
        layout === 'stacked'
          ? 'flex flex-col gap-2 sm:gap-3 md:gap-4'
          : 'inline-flex flex-wrap items-baseline gap-x-2.5'
      } ${alignmentClasses} ${className}`}
    >
      {/* Static Text */}
      <span
        id="rotating-headline-static"
        className={`tracking-tight ${staticTextClassName}`}
      >
        {staticText}
      </span>

      {/* Dynamic Rotating Word Container with generous breathing room and guaranteed width/height constraints */}
      <span
        id="rotating-headline-dynamic-wrapper"
        className={`relative inline-flex items-center ${justifyClasses} overflow-visible ${
          layout === 'stacked' ? 'mt-1 sm:mt-1.5 md:mt-2' : ''
        } h-[1.18em] leading-[1.05]`}
      >
        {/* Hidden phantom placeholder to mathematically lock width to longest word & eliminate jitter */}
        <span
          className={`opacity-0 pointer-events-none select-none invisible uppercase tracking-tight ${dynamicTextClassName}`}
          aria-hidden="true"
        >
          {longestWord}
        </span>

        {/* Animated Word using motion/react & AnimatePresence popLayout */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={currentWord}
            variants={wordVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`absolute inset-0 flex items-center ${justifyClasses} overflow-visible`}
            style={{
              willChange: 'transform, opacity, filter',
            }}
          >
            <span
              className={`inline-block ${gradientClassName} ${
                isGradient ? 'bg-clip-text text-transparent' : ''
              } uppercase tracking-tight ${dynamicTextClassName}`}
              style={
                isGradient
                  ? {
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }
                  : undefined
              }
            >
              {currentWord}
            </span>
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
