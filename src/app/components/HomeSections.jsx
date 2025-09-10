"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const Section = ({ children, className = "" }) => (
  <section className={`py-1 sm:py-1 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);

const features = [
  {
    title: "แนะนำสถานที่วิ่ง",
    desc: "สวนไหนสวย สวนไหนดี วิ่งแล้วได้ NewPB แนะนำกันเล้ย",
    icon: <span style={{ fontSize: "4rem", lineHeight: 1 }}>🗺️</span>,
    color: "from-orange-600 to-orange-300",
    link: "/park",
  },
  {
    title: "Knowledge Center",
    desc: "สอนวิ่งอย่างถูกวิธี เพื่อพัฒนาทักษะและป้องกันการบาดเจ็บ",
    icon: <span style={{ fontSize: "4rem", lineHeight: 1 }}>📚</span>,
    color: "from-blue-300 to-blue-600",
    link: "/knowledge",
  },
  {
    title: "ประชาสัมพันธ์งานวิ่ง",
    desc: "งานไหนดี งานไหนสนุก เราไปด้วยกัน",
    icon: <span style={{ fontSize: "4rem", lineHeight: 1 }}>📢</span>,
    color: "from-pink-500 to-pink-600",
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
          ></motion.div>
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
              {feature.link ? (
                <Link href={feature.link}>
                  <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              ) : (
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
