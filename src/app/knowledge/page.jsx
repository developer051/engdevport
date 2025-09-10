"use client";
import React from "react";
import { motion } from "framer-motion";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";
import Link from "next/link";

const KnowledgePage = () => {
  // ข้อมูลตัวอย่างสำหรับ knowledge cards
  const knowledgeCards = [
    {
      id: 1,
      title: "เทคนิคการวิ่งที่ถูกต้อง",
      description: "เรียนรู้วิธีการวิ่งที่ถูกต้องเพื่อป้องกันการบาดเจ็บและเพิ่มประสิทธิภาพในการวิ่ง",
      image: "/uploads/running-results/1756893434493cfr8w4mz4_1756893896006.jpg",
      category: "เทคนิคการวิ่ง",
      readTime: "5 นาที",
      slug: "running-techniques"
    },
    {
      id: 2,
      title: "การเตรียมตัวก่อนวิ่ง",
      description: "ขั้นตอนการเตรียมตัวที่สำคัญก่อนออกไปวิ่ง รวมถึงการวอร์มอัพและการเตรียมอุปกรณ์",
      image: "/uploads/running-results/17568935940816dwwifz55_1756894296958.png",
      category: "การเตรียมตัว",
      readTime: "3 นาที",
      slug: "pre-run-preparation"
    },
    {
      id: 3,
      title: "โภชนาการสำหรับนักวิ่ง",
      description: "อาหารและเครื่องดื่มที่เหมาะสมสำหรับนักวิ่ง เพื่อเพิ่มพลังงานและฟื้นฟูร่างกาย",
      image: "/uploads/running-results/17568937927388uond8zyh_1757044350884.jpg",
      category: "โภชนาการ",
      readTime: "7 นาที",
      slug: "runner-nutrition"
    },
    {
      id: 4,
      title: "การป้องกันการบาดเจ็บ",
      description: "วิธีการป้องกันและดูแลรักษาการบาดเจ็บที่อาจเกิดขึ้นจากการวิ่ง",
      image: "/uploads/running-results/17568941842885v0fkasir_1756894390632.jpeg",
      category: "การป้องกัน",
      readTime: "6 นาที",
      slug: "injury-prevention"
    },
    {
      id: 5,
      title: "การฝึกซ้อมแบบ Interval",
      description: "เทคนิคการฝึกซ้อมแบบ Interval Training เพื่อเพิ่มความเร็วและความอดทน",
      image: "/uploads/running-results/1756957251535v5brzpwew_1756973335184.jpg",
      category: "การฝึกซ้อม",
      readTime: "8 นาที",
      slug: "interval-training"
    },
    {
      id: 6,
      title: "การเลือกรองเท้าวิ่ง",
      description: "คู่มือการเลือกรองเท้าวิ่งที่เหมาะสมกับเท้าและสไตล์การวิ่งของคุณ",
      image: "/uploads/running-results/17569709255800qh574k9t_1756988061983.jpg",
      category: "อุปกรณ์",
      readTime: "4 นาที",
      slug: "running-shoes-guide"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <NavBar2 />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              <span className="text-orange-400">Knowledge</span> Center
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              รวมความรู้และเทคนิคการวิ่งที่สำคัญ เพื่อพัฒนาทักษะและป้องกันการบาดเจ็บ
            </p>
          </div>
        </div>
      </section>

      {/* Knowledge Cards Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              บทความความรู้
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ค้นพบเทคนิคและเคล็ดลับการวิ่งที่ช่วยให้คุณวิ่งได้ดีขึ้นและปลอดภัยขึ้น
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {knowledgeCards.map((card) => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/knowledge/${card.slug}`}>
                  <div className="relative">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {card.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white bg-opacity-90 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {card.readTime}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {card.description}
                    </p>
                    
                    <div className="flex items-center text-orange-500 font-medium">
                      <span>อ่านต่อ</span>
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            พร้อมเริ่มต้นการวิ่งแล้วหรือยัง?
          </h2>
          <p className="text-orange-100 mb-8 text-lg">
            เข้าร่วมกับชุมชนนักวิ่งของเราและเริ่มต้นการเดินทางสู่สุขภาพที่ดี
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center px-6 py-3 bg-white text-orange-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              สมัครสมาชิก
            </Link>
            <Link
              href="/leaderboard"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-orange-600 transition-colors"
            >
              ดูอันดับ
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default KnowledgePage;
