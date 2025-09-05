"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

const StickyScrollReveal = ({ content, contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const cardRefs = useRef([]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const totalCards = content.length;

  const progressPerCard = 1 / totalCards;

  useEffect(() => {
    const unsubscribe = scrollYProgressSpring.on("change", (latest) => {
      const cardsBreakpoints = content.map((_, index) => index / totalCards);
      const closestBreakpointIndex = cardsBreakpoints.reduce(
        (acc, breakpoint, index) => {
          const distance = Math.abs(latest - breakpoint);
          if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
            return index;
          }
          return acc;
        },
        0
      );
      setActiveCard(closestBreakpointIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgressSpring, content.length, totalCards]);

  const backgroundColors = [
    "var(--slate-900)",
    "var(--black)",
    "var(--neutral-900)",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--cyan-500))",
  ];

  return (
    <div
      ref={ref}
      className="relative flex justify-center self-center overflow-hidden"
    >
      <div className="w-full max-w-4xl">
        {content.map((item, index) => (
          <motion.div
            key={item.title + index}
            className="my-20"
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <motion.div
              variants={{
                initial: {
                  opacity: 0,
                  y: 50,
                },
                animate: {
                  opacity: 1,
                  y: 0,
                },
              }}
              className="relative"
            >
              {index === 0 && (
                <motion.div
                  className="h-[40vh] w-full rounded-lg bg-muted-foreground/20"
                  style={{
                    background: linearGradients[index % linearGradients.length],
                  }}
                />
              )}
              {index !== 0 && (
                <motion.div
                  className="h-[40vh] w-full rounded-lg bg-muted-foreground/20"
                  style={{
                    background: linearGradients[index % linearGradients.length],
                  }}
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {item.title}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <div className="hidden lg:block w-60 ml-8">
        <div className="w-full">
          {content.map((item, index) => (
            <motion.div
              key={item.title + index}
              className="my-20"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: activeCard === index ? 1 : 0.3,
              }}
            >
              <div className="text-2xl font-bold text-slate-100">
                {item.title}
              </div>
              <p className="text-kg text-slate-300 max-w-sm mt-10">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickyScrollReveal;
