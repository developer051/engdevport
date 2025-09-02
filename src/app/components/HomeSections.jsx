"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Section = ({ children, className = "" }) => (
  <section className={`py-16 sm:py-20 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);

const features = [
  {
    title: "โปรแกรมซ้อม",
    desc: "วางแผนซ้อมที่เหมาะกับทุกระดับ ตั้งแต่เริ่มต้นจนถึงทำเวลา",
    icon: "🏃‍♂️",
    color: "from-orange-500 to-orange-600"
  },
  {
    title: "คอมมิวนิตี้",
    desc: "เพื่อนร่วมทางให้กำลังใจ แลกเปลี่ยนเทคนิค และออกวิ่งด้วยกัน",
    icon: "👥",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    title: "ติดตามผล",
    desc: "ส่งผลวิ่ง ดูสถิติ และอันดับบน Leaderboard แบบเรียลไทม์",
    icon: "📊",
    color: "from-pink-500 to-pink-600"
  },
];

const stats = [
  { label: "สมาชิกทั้งหมด", value: "512+", icon: "👥" },
  { label: "ระยะทางสะสม (กม.)", value: "38K", icon: "🏃‍♂️" },
  { label: "อีเวนต์ที่จัด", value: "24", icon: "🎯" },
  { label: "พาร์ทเนอร์", value: "8", icon: "🤝" },
];

const partners = [
  { name: "RabbitLife", logo: "/rabbitlife-logo.png" },
  { name: "Nike", logo: "/next.svg" },
  { name: "Adidas", logo: "/vercel.svg" },
  { name: "Asics", logo: "/globe.svg" },
];

export default function HomeSections() {
  return (
    <div className="bg-white">
      {/* Features */}
      <Section>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section className="bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-left">
            สถิติ
          </h3>
        </motion.div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Partners */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            พันธมิตรของเรา
          </h3>
          <p className="text-gray-600">ร่วมผลักดันไลฟ์สไตล์เพื่อสุขภาพไปด้วยกัน</p>
        </motion.div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {partners.map((partner, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <div className="group relative p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 p-12 text-center text-white"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl font-extrabold mb-4">
              เริ่มวิ่งวันนี้ไปกับเรา
            </h3>
            <p className="text-xl text-orange-50 mb-8 max-w-2xl mx-auto">
              เข้าร่วมคอมมิวนิตี้ ส่งผลวิ่ง และพัฒนาตัวเองทุกสัปดาห์
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <motion.button
                  className="group relative bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">สมัครสมาชิก</span>
                  <div className="absolute inset-0 bg-orange-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </Link>
              <Link href="/leaderboard">
                <motion.button
                  className="group relative bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">ดู Leaderboard</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
