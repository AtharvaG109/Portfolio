"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15
    }
  }
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: "0.85em",
    rotateX: 55,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 26,
      mass: 0.9
    }
  }
};

export function HeroHeadline({ text, highlights = [], className }) {
  const shouldReduceMotion = useReducedMotion();
  const highlightSet = new Set(highlights.map((word) => word.toLowerCase()));
  const words = text.split(" ");

  if (shouldReduceMotion) {
    return (
      <h1 className={className}>
        {words.map((word, index) => {
          const bare = word.toLowerCase().replace(/[^a-z0-9-]/g, "");
          return (
            <span key={`${word}-${index}`}>
              {highlightSet.has(bare) ? <span className="headline-highlight">{word}</span> : word}
              {index < words.length - 1 ? " " : null}
            </span>
          );
        })}
      </h1>
    );
  }

  return (
    <motion.h1
      className={className}
      aria-label={text}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => {
        const bare = word.toLowerCase().replace(/[^a-z0-9-]/g, "");
        return (
          <Fragment key={`${word}-${index}`}>
            <span className="headline-word-mask" aria-hidden="true">
              <motion.span className="headline-word" variants={wordVariants}>
                {highlightSet.has(bare) ? (
                  <span className="headline-highlight">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            </span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </motion.h1>
  );
}
