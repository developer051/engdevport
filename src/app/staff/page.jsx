"use client";
import React from "react";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";

const StaffPage = () => {
  // Staff members data
  const staffMembers = [
    {
      id: 1,
      name: "SUPACHAI OCHAROS",
      position: "Developer",
      image: "/supachai.jpg",
      description: "Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      id: 2,
      name: "ANN RICHMOND",
      position: "creative leader", 
      image: "/ai.jpg",
      description: "Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      id: 3,
      name: "BOB GREENFIELD",
      position: "programming guru",
      image: "/cs.jpg", 
      description: "Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      id: 4,
      name: "SARAH WILSON",
      position: "data scientist",
      image: "/ds.jpg", 
      description: "Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#"
      }
    }
  ];

  return (
    <main className="min-h-screen">
      <NavBar2 />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Meet The <span className="text-green-400">Team</span>
            </h1>
            <p className="text-sm text-gray-300">
              Image by <a href="#" className="underline text-green-400 hover:text-green-300">Supachai Ocharos</a>
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
            <section className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {staffMembers.map((member) => (
              <div key={member.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
                {/* Member Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                
                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium mb-4 text-green-400">
                    {member.position}
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed mb-6">
                    {member.description}
                  </p>
                  
                  {/* Social Icons */}
                  <div className="flex space-x-4">
                    <a 
                      href={member.social.facebook} 
                      className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a 
                      href={member.social.twitter} 
                      className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                      aria-label="Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a 
                      href={member.social.instagram} 
                      className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.494 0-4.51-2.016-4.51-4.51s2.016-4.51 4.51-4.51 4.51 2.016 4.51 4.51-2.016 4.51-4.51 4.51zm7.05-10.66h-.051a1.032 1.032 0 01-1.031-1.031c0-.569.463-1.031 1.031-1.031s1.031.463 1.031 1.031-.463 1.031-.98 1.031zm2.466 10.66c-2.494 0-4.51-2.016-4.51-4.51s2.016-4.51 4.51-4.51 4.51 2.016 4.51 4.51-2.016 4.51-4.51 4.51z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default StaffPage;
