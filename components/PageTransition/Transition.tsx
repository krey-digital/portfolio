'use client';

import { motion } from "framer-motion";
import { ReactNode } from "react";

const calculateRandomBlockDelay = (rowIndex: number, totalRows: number) => {
  const blockDelay = Math.random() * 0.5;
  const rowDelay = (totalRows - rowIndex - 1) * 0.05;
  return blockDelay + rowDelay;
};

export const Transition = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <div className="blocks-container absolute top-0 z-[9999] transition-in">
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <div className="row" key={rowIndex}>
            {Array.from({ length: 11 }).map((_, blockIndex) => (
              <motion.div
                key={blockIndex}
                className="block"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: calculateRandomBlockDelay(rowIndex, 10)
                }}
              ></motion.div>
            ))}
          </div>
        ))}
      </div>

      <div className="blocks-container transition-out">
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <div className="row" key={rowIndex}>
            {Array.from({ length: 11 }).map((_, blockIndex) => (
              <motion.div
                key={blockIndex}
                className="block"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: calculateRandomBlockDelay(rowIndex, 10)
                }}
              ></motion.div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
