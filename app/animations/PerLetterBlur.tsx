"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type PerLetterBlurProps = {
  children?: ReactNode;
};

export default function PerLetterBlur({ children }: PerLetterBlurProps) {
  const text = typeof children === "string" ? children : "";
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.015,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{
        letterSpacing: "-0.02em",
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: {
              opacity: 0,
              filter: "blur(12px)",
              y: 12,
            },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
