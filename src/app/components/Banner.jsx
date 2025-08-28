import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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

  const title = "Welcome Rabbit Runners";
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

        {/* Light Overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-90 z-10"></div>
      </div>

      {/* Content Container */}
      <motion.div
        className="relative h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-center h-screen pt-16">
          {/* Main Content Container - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto w-full">
            
            {/* Image Section - Left Side */}
            <motion.div 
              className="flex justify-center lg:justify-center items-center order-2 lg:order-1"
              variants={itemVariants}
            >
              <div className="relative">
                <motion.img
                  src="/rabbittran.png"
                  alt="RabbitLife Runner"
                  className="max-w-full h-auto max-h-[800px] lg:max-h-[1000px] w-full object-contain opacity-60"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 0.6, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </div>
            </motion.div>

            {/* Text Content - Right Side */}
            <div className="text-center lg:text-left order-1 lg:order-2">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className={`inline-block mr-2 ${
                    word === "EngDev" ? "text-orange-400" : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4"
              variants={itemVariants}
            >
              Join a community of driven runners, united by speed, spirit, and the thrill of the run. Whether you're chasing personal bests or just chasing the sunrise, RabbitLife Runners Club is your starting line.,{" "}
              <span className="text-orange-400 font-semibold">
                RabbitLife 
              </span>
              Runners
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              variants={itemVariants}
            >
              <Link href="/running-result">
                <motion.button
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ส่งผลการวิ่ง
                </motion.button>
              </Link>
              <Link href="/leaderboard">
              <motion.button
                className="w-full sm:w-auto bg-transparent border-2 border-yellow-500 text-yellow-600 px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 hover:text-white transition duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Leaderboard
              </motion.button>
              </Link>
            </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
