import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Text animation for title
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const title = "Welcome to EngDev Portfolio";
  const words = title.split(" ");

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Fallback */}
      <div className="absolute inset-0 bg-gray-300">
        {/* Primary background image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/ds.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        {/* Fallback background image */}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      </div>

      {/* Content Container */}
      <motion.div
        className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-center h-screen pt-16">
          {/* Text Content - Centered */}
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className={`inline-block mr-2 ${
                    word === "EngDev" ? "text-green-400" : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 leading-relaxed px-4"
              variants={itemVariants}
            >
              I am a full-stack developer passionate about creating innovative
              web solutions,{" "}
              <span className="text-green-400 font-semibold">
                Data Analytics
              </span>
              ,{" "}
              <span className="text-green-400 font-semibold">
                Cybersecurity
              </span>{" "}
              and
              <span className="text-green-400 font-semibold"> AI </span>
              delivering exceptional user experiences.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={itemVariants}
            >
              <motion.button
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.button>
              <motion.button
                className="w-full sm:w-auto bg-transparent border-2 border-green-400 text-green-400 px-6 py-3 rounded-lg font-medium hover:bg-green-400 hover:text-black transition duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
