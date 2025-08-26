"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";

const StaffPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Staff data - ในการใช้งานจริงจะดึงจาก API
  const staffMembers = [
    {
      id: 1,
      name: "Alice Johnson",
      position: "Project Manager",
      image: "/supachai.jpg",
      backgroundColor: "bg-gradient-to-br from-orange-500 to-red-600",
      description: "Expert in project management with 8+ years of experience leading cross-functional teams.",
      skills: ["Agile", "Scrum", "Leadership", "Strategic Planning"]
    },
    {
      id: 2,
      name: "Robert Brown",
      position: "UX Designer",
      image: "/supachai.jpg",
      backgroundColor: "bg-gradient-to-br from-gray-400 to-gray-600",
      description: "Creative UX designer passionate about creating intuitive and beautiful user experiences.",
      skills: ["UI/UX Design", "Figma", "User Research", "Prototyping"]
    },
    {
      id: 3,
      name: "Emily White",
      position: "Marketing Specialist",
      image: "/supachai.jpg",
      backgroundColor: "bg-gradient-to-br from-gray-800 to-black",
      description: "Digital marketing expert with focus on data-driven growth strategies.",
      skills: ["Digital Marketing", "SEO", "Analytics", "Content Strategy"]
    },
    {
      id: 4,
      name: "Joana Doe",
      position: "Creative Director",
      image: "/supachai.jpg",
      backgroundColor: "bg-gradient-to-br from-orange-400 to-yellow-500",
      description: "Visionary creative director with expertise in brand development and visual storytelling.",
      skills: ["Creative Direction", "Branding", "Visual Design", "Strategy"]
    },
    {
      id: 5,
      name: "Michael Chen",
      position: "Full Stack Developer",
      image: "/supachai.jpg",
      backgroundColor: "bg-gradient-to-br from-blue-500 to-purple-600",
      description: "Full stack developer specializing in modern web technologies and scalable solutions.",
      skills: ["React", "Node.js", "Python", "Cloud Architecture"]
    },
    {
      id: 6,
      name: "Sarah Wilson",
      position: "Data Scientist",
      image: "/supachai.jpg",
      backgroundColor: "bg-gradient-to-br from-green-500 to-teal-600",
      description: "Data scientist with expertise in machine learning and predictive analytics.",
      skills: ["Python", "Machine Learning", "Data Analysis", "AI"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <NavBar2 />
      
      {/* Hero Section */}
      <section className="pt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              The Team Behind Our{" "}
              <span className="relative">
                Success
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-3 bg-yellow-400 -z-10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              </p>
            </motion.p>
          </motion.div>

          {/* Navigation Arrows */}
          <div className="flex justify-end mb-8">
            <div className="flex space-x-2">
              <button className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Staff Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {staffMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={cardVariants}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredCard(member.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image Container */}
                <motion.div
                  className={`relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 ${member.backgroundColor}`}
                  whileHover={{ 
                    y: -12,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  
                  {/* Profile Image */}
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover mix-blend-overlay opacity-90"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  />
                  
                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center"
                    whileHover={{ 
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.div
                      className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-sm font-medium px-4">
                        {member.description}
                      </p>
                      <div className="flex flex-wrap justify-center gap-1 mt-3 px-4">
                        {member.skills.slice(0, 2).map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Floating Badge */}
                  <motion.div
                    className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "rgba(255, 255, 255, 0.3)"
                    }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                </motion.div>

                {/* Name and Position */}
                <motion.div
                  className="text-center"
                  animate={hoveredCard === member.id ? { y: -5 } : { y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {member.position}
                  </p>
                  
                  {/* Skills Pills */}
                  <motion.div
                    className="flex flex-wrap justify-center gap-1 mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredCard === member.id ? 1 : 0,
                      y: hoveredCard === member.id ? 0 : 10
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {member.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center mt-16"
          >
            <motion.button
              className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Our Team
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default StaffPage;
