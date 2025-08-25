"use client";
import React from "react";
import Image from "next/image";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";


const AboutPage = () => {
  const skills = [
    {
      name: "Frontend Development",
      items: ["React.js", "Next.js", "TailwindCSS", "JavaScript"],
    },
    {
      name: "Backend Development",
      items: ["Node.js", "Python", "SQL", "RESTful APIs"],
    },
    {
      name: "Data Analytics",
      items: [
        "Data Mining",
        "Python Analytics",
        "Data Visualization",
        "Statistical Analysis",
      ],
    },
    {
      name: "Cybersecurity",
      items: [
        "Network Security",
        "Penetration Testing",
        "Security Auditing",
        "Risk Assessment",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <NavBar2 />
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-green-400">Me</span>
            </h1>
            <p className="text-xl  text-gray-300 max-w-3xl mx-auto">
              A passionate Full Stack Developer and Cybersecurity enthusiast
              with a strong foundation in Data Analytics. I transform complex
              problems into elegant solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Profile Image */}
            <div className="relative w-[400px] h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/supachai.jpg"
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </div>


            {/* Profile Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                Hi, I'm <span className="text-green-400">EngDev</span>
              </h2>
              <p className="text-gray-300">
                With over 5 years of experience in software development, I
                specialize in creating secure and scalable web applications. My
                passion lies in the intersection of technology and
                cybersecurity.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Full Stack Developer</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span>Cybersecurity Specialist</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <span>Data Analytics Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            My <span className="text-green-400">Skills</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-green-400/50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-4 text-green-400">
                  {skill.name}
                </h3>
                <ul className="space-y-2">
                  {skill.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-gray-300 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-2 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};


export default AboutPage;
