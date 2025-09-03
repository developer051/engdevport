"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AIChatBox from "./AIChatBox";

const FloatingAICoach = () => {
  const [isVisible, setIsVisible] = useState(true); // แสดงตลอดเวลา
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-hide logic - ปิดการใช้งาน
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (!isExpanded) {
  //       setIsVisible(false);
  //     }
  //   }, 10000); // Hide after 10 seconds if not interacted

  //   return () => clearTimeout(timer);
  // }, [isExpanded]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    // ไม่ต้องตั้งค่า isVisible เป็น true เพราะจะแสดงตลอดเวลา
  };

  const openChat = () => {
    setIsChatOpen(true);
    setIsExpanded(false);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const minimizeChat = () => {
    setIsChatOpen(false);
  };

  const coachMessages = [
    "💪 พร้อมวิ่งกันหรือยัง?",
    "🏃‍♂️ วันนี้วิ่งแล้วหรือยัง?",
    "🎯 มาตั้งเป้าหมายใหม่กัน!",
    "⚡ อย่าลืมวอร์มอัพนะ!",
    "🌟 คุณทำได้แน่นอน!",
    "💧  อย่าลืมดื่มน้ำนะ!",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % coachMessages.length);
    }, 5000);

    return () => clearInterval(messageTimer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed z-50"
            style={{
              right: "24px",
              bottom: `${24 + scrollY * 0.1}px`, // Slight parallax effect with scroll
            }}
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Speech Bubble */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="absolute bottom-full right-0 mb-4 bg-white rounded-2xl shadow-2xl p-6 max-w-sm border-4 border-orange-200"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Speech bubble arrow */}
                  <div className="absolute bottom-[-12px] right-6 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-white"></div>
                  <div className="absolute bottom-[-16px] right-6 w-0 h-0 border-l-[14px] border-r-[14px] border-t-[14px] border-l-transparent border-r-transparent border-t-orange-200"></div>

                  <div className="text-center">
                    <h3 className="text-lg font-bold text-orange-600 mb-2">
                      AI Running Coach
                    </h3>
                    <p className="text-gray-700 text-sm mb-3">
                      {coachMessages[currentMessage]}
                    </p>
                    <div className="space-y-2">
                      <button
                        onClick={openChat}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-red px-3 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                      >
                        💬 เริ่มสนทนา
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI Coach Character */}
            <motion.div
              className="relative cursor-pointer group"
              onClick={toggleExpanded}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full blur-xl opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Coach Image */}
              <div className="relative w-32 h-32 bg-gradient-to-br from-orange-400 to-blue-500 rounded-full shadow-2xl border-4 border-white overflow-hidden">
                <img
                  src="/coach-rabbit.png"
                  alt="AI Running Coach"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback emoji if image not found */}
                <div
                  className="absolute inset-0 flex items-center justify-center text-4xl"
                  style={{ display: "none" }}
                >
                  🐰
                </div>
              </div>

              {/* Notification dot */}
              <motion.div
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                คลิกเพื่อคุยกับ AI Coach
              </div>
            </motion.div>

            {/* Minimize/Close buttons */}
            <div className="absolute -top-4 -left-4 flex space-x-1">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVisible(false);
                }}
                className="w-10 h-10 bg-red-500 text-white rounded-full text-lg font-bold flex items-center justify-center hover:bg-red-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chat Box */}
      <AIChatBox
        isOpen={isChatOpen}
        onClose={closeChat}
        onMinimize={minimizeChat}
      />
    </>
  );
};

export default FloatingAICoach;
