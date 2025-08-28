"use client";
import React, { useState, useEffect } from "react";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";

const StaffPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/leaderboard');
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data);
      } else {
        setError(data.error || 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <NavBar2 />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Rabbit <span className="text-orange-400">Runners</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Meet our talented team of Rabbit Members who are passionate about delivering exceptional results
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
              <p className="mt-2 text-gray-600">กำลังโหลดข้อมูล...</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700 text-center">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {users.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600 text-lg">ยังไม่มีข้อมูลผู้ใช้ในระบบ</p>
                </div>
              ) : (
                users.map((user) => (
                  <div key={user.id} className="bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200">
                    {/* Member Image */}
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={user.profileImage || "/supachai.jpg"}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                      />
                    </div>
                    
                    {/* Member Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 tracking-wide">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm font-medium mb-4 text-orange-400">
                        {user.department}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed mb-6">
                        {user.messageToRunners || "ไม่มีข้อความ"}
                      </p>
                      
                      {/* Social Icons */}
                      <div className="flex space-x-4">
                        <a 
                          href="#" 
                          className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                          aria-label="Facebook"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                        <a 
                          href="#" 
                          className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                          aria-label="Twitter"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        </a>
                        <a 
                          href="#" 
                          className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                          aria-label="Instagram"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.494 0-4.51-2.016-4.51-4.51s2.016-4.51 4.51-4.51 4.51 2.016 4.51 4.51-2.016 4.51-4.51 4.51zm7.05-10.66h-.051a1.032 1.032 0 01-1.031-1.031c0-.569.463-1.031 1.031-1.031s1.031.463 1.031 1.031-.463 1.031-.98 1.031zm2.466 10.66c-2.494 0-4.51-2.016-4.51-4.51s2.016-4.51 4.51-4.51 4.51 2.016 4.51 4.51-2.016 4.51-4.51 4.51z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default StaffPage;
