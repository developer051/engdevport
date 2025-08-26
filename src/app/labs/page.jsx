"use client";
import React from "react";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";
import Image from "next/image";

const LAB_SECTIONS = [
  {
    id: "da",
    title: "Data Analytics",
    description:
      "สำรวจข้อมูล สร้างแดชบอร์ด และสร้างอินไซต์ที่ขับเคลื่อนการตัดสินใจ",
    image: "/ds.jpg",
    items: [
      "ETL/ELT Pipeline",
      "Dashboard & Visualization",
      "Statistical Analysis",
    ],
  },
  {
    id: "cyber",
    title: "Cybersecurity",
    description:
      "ทดสอบความปลอดภัย ประเมินความเสี่ยง และออกแบบมาตรการป้องกันระบบ",
    image: "/cs.jpg",
    items: ["Vulnerability Scan", "Pentest Basics", "Security Hardening"],
  },
  {
    id: "ai",
    title: "AI & ML",
    description:
      "สร้างโมเดลแมชชีนเลิร์นนิง ทดลอง LLM และทำงานประมวลผลภาษาธรรมชาติ",
    image: "/ai.jpg",
    items: ["Classification/Regression", "LLM Prototyping", "NLP Pipelines"],
  },
];

export default function LabsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <NavBar2 />

      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold">
              Labs <span className="text-green-400">Projects</span>
            </h1>
            <p className="text-gray-300 mt-3">
              <span className="react-text-animation">
                งานทดลองและโปรเจกต์ด้าน Data Analytics, Cybersecurity และ AI
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LAB_SECTIONS.map((sec) => (
              <article
                key={sec.id}
                className="group rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-green-400/50 transition-colors"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={sec.image}
                    alt={sec.title}
                    fill
                    className="object-contain bg-black/60"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-green-400">
                    {sec.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {sec.description}
                  </p>
                  <ul className="text-gray-300 text-sm list-disc list-inside space-y-1">
                    {sec.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


