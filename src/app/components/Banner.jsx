import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Banner = () => {
  const [stats, setStats] = useState({
    activeMembers: 0,
    totalRuns: 0,
    uniqueEvents: 0
  });
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลสถิติจาก API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Enhanced Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Enhanced zoom animation for the rabbit image
  const zoomVariants = {
    animate: {
      scale: [1, 1.08, 1],
      rotateY: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Enhanced aura animation
  const auraVariants = {
    animate: {
      scale: [1, 1.15, 1],
      opacity: [0.2, 0.5, 0.2],
      rotate: [0, 180, 360],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Floating particles animation
  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Number counter animation
  const numberVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const welcomeText = "Welcome";
  const runnerText = "Rabbit Runners";
  const subtitle = "ไม่ว่าคุณจะวิ่งมาแล้วหลายพันไมล์ หรือคิดจะเริ่มวิ่งวันนี้ เราคือ RabbitLife Runner และเราจะวิ่งไปด้วยกัน";

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <motion.div 
          className="absolute top-0 -left-4 w-80 h-80 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute top-0 -right-4 w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute -bottom-8 left-20 w-80 h-80 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [180, 360, 180],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.08'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        {/* Floating Particles */}
        <motion.div
          className="absolute top-20 left-10 w-3 h-3 bg-orange-400 rounded-full"
          variants={particleVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-20 w-2 h-2 bg-yellow-400 rounded-full"
          variants={particleVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-4 h-4 bg-pink-400 rounded-full"
          variants={particleVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
        />
        <motion.div
          className="absolute bottom-20 right-1/3 w-2 h-2 bg-purple-400 rounded-full"
          variants={particleVariants}
          animate="animate"
          style={{ animationDelay: '0.5s' }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-7rem)]">
          {/* Left: Enhanced Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Enhanced Badge */}
            <motion.div 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 text-sm font-semibold mb-8 border border-orange-200 shadow-lg backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-bold">RabbitLife Community</span>
              <motion.span 
                className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </motion.div>

            {/* Enhanced Title */}
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="mb-8"
            >
              {/* Welcome Text with Enhanced Gradient */}
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-3"
                variants={letterVariants}
              >
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
                  {welcomeText}
                </span>
              </motion.h1>
              
              {/* Enhanced Rabbit Runners Text */}
              <motion.h2
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-gray-900 drop-shadow-lg"
                variants={letterVariants}
              >
                {runnerText}
              </motion.h2>
            </motion.div>

            {/* Enhanced Subtitle */}
            <motion.p 
              className="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-10 max-w-2xl font-medium"
              variants={itemVariants}
            >
              ไม่ว่าคุณจะวิ่งมาแล้วหลายพันไมล์ หรือคิดจะเริ่มวิ่งวันนี้ เราคือ{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 font-bold">"RabbitLife Runner"</span>
              {" "}และเราจะวิ่งไปด้วยกัน
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-16"
              variants={itemVariants}
            >
              <Link href="/running-result">
                <motion.button
                  className="group relative w-full sm:w-auto bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>ส่งผลการวิ่ง</span>
                    <motion.svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </Link>
              <Link href="/leaderboard">
                <motion.button
                  className="group relative w-full sm:w-auto bg-white/90 backdrop-blur-sm border-3 border-yellow-500 text-yellow-700 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-yellow-500 hover:text-white transition-all duration-300 transform hover:-translate-y-2 shadow-2xl hover:shadow-3xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Leaderboard</span>
                    <motion.svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </motion.svg>
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Enhanced Stats with Real Data */}
            <motion.div 
              className="grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0"
              variants={itemVariants}
            >
              <motion.div 
                className="text-center p-6 rounded-3xl bg-white/90 backdrop-blur-md shadow-xl border border-orange-200 hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div 
                  className="text-3xl font-black text-gray-900 mb-2"
                  variants={numberVariants}
                  initial="hidden"
                  animate="visible"
                  key={stats.activeMembers}
                >
                  {loading ? (
                    <motion.div 
                      className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"
                    />
                  ) : (
                    `${stats.activeMembers}+`
                  )}
                </motion.div>
                <div className="text-sm font-semibold text-gray-600">สมาชิก</div>
              </motion.div>
              <motion.div 
                className="text-center p-6 rounded-3xl bg-white/90 backdrop-blur-md shadow-xl border border-orange-200 hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div 
                  className="text-3xl font-black text-gray-900 mb-2"
                  variants={numberVariants}
                  initial="hidden"
                  animate="visible"
                  key={stats.uniqueEvents}
                >
                  {loading ? (
                    <motion.div 
                      className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto"
                    />
                  ) : (
                    stats.uniqueEvents || 12
                  )}
                </motion.div>
                <div className="text-sm font-semibold text-gray-600">งานวิ่ง/ปี</div>
              </motion.div>
              <motion.div 
                className="text-center p-6 rounded-3xl bg-white/90 backdrop-blur-md shadow-xl border border-orange-200 hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div 
                  className="text-3xl font-black text-gray-900 mb-2"
                  variants={numberVariants}
                  initial="hidden"
                  animate="visible"
                  key={stats.totalRuns}
                >
                  {loading ? (
                    <motion.div 
                      className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"
                    />
                  ) : (
                    "24/7"
                  )}
                </motion.div>
                <div className="text-sm font-semibold text-gray-600">ชุมชน</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Enhanced Hero Image */}
          <motion.div 
            className="order-1 lg:order-2 relative"
            variants={itemVariants}
          >
            <div className="relative max-w-xl mx-auto">
              {/* Enhanced Floating Elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-300 to-red-300 rounded-full opacity-70"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full opacity-70"
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Enhanced Aura Effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/30 via-yellow-400/30 to-pink-400/30 blur-3xl"
                variants={auraVariants}
                animate="animate"
                style={{
                  transform: 'scale(1.3)',
                  zIndex: 1
                }}
              />
              
              {/* Enhanced Main Image with Zoom Animation */}
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.img
                  src="/rabbittran.png"
                  alt="RabbitLife Runner"
                  className="w-full h-auto drop-shadow-2xl filter contrast-110 brightness-110"
                  variants={zoomVariants}
                  animate="animate"
                  style={{
                    imageRendering: 'high-quality',
                    WebkitImageRendering: 'high-quality'
                  }}
                />
              </motion.div>

              {/* Additional decorative elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-60"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-60"
                animate={{
                  scale: [1.5, 1, 1.5],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
