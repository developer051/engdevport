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

  const getExperienceColor = (experience) => {
    const colors = {
      '100M': 'bg-red-100 text-red-800',
      '100K': 'bg-purple-100 text-purple-800',
      '42K': 'bg-blue-100 text-blue-800',
      '21K': 'bg-green-100 text-green-800',
      '10K': 'bg-yellow-100 text-yellow-800',
      '5K': 'bg-orange-100 text-orange-800',
      'beginner': 'bg-pink-100 text-pink-800'
    };
    return colors[experience] || 'bg-gray-100 text-gray-800';
  };

  const getExperienceLabel = (experience) => {
    return experience === 'beginner' ? 'นักวิ่งหน้าใหม่' : experience;
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
            Welcome the Human Network
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
                    <div className="aspect-square overflow-hidden p-4">
                      <img
                        src={user.profileImage || "/supachai.jpg"}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-full h-full object-cover rounded-lg hover:scale-105 transition-all duration-300"
                      />
                    </div>
                    
                    {/* Member Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 tracking-wide">
                        {user.firstName} {user.lastName}{user.nickname && ` [${user.nickname}]`}
                      </h3>
                      <p className="text-sm font-medium mb-4 text-orange-400">
                        {user.department}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {user.messageToRunners || "ไม่มีข้อความ"}
                      </p>
                      
                      {/* Running Experience Capsules */}
                      {user.runningExperience && user.runningExperience.length > 0 && (
                        <div className="mb-4">
                          <hr className="border-gray-200 mb-3" />
                          <p className="text-xs font-medium text-gray-500 mb-2">ประสบการณ์งานวิ่ง:</p>
                          <div className="flex flex-wrap gap-1">
                            {user.runningExperience.map((experience) => (
                              <span
                                key={experience}
                                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getExperienceColor(experience)}`}
                              >
                                {getExperienceLabel(experience)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
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
