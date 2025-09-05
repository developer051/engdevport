"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";

const LeaderboardPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
    checkCurrentUser();
  }, []);

  const checkCurrentUser = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("/api/leaderboard");
      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      } else {
        setError(data.error || "เกิดข้อผิดพลาดในการโหลดข้อมูล");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "text-yellow-400"; // Gold
      case 2:
        return "text-gray-300"; // Silver
      case 3:
        return "text-amber-600"; // Bronze
      default:
        return "text-gray-400";
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
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
              Leader<span className="text-orange-400">board</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              จะวิ่ง จะเดิน ในสวน cityrun หรือเดินบนเครื่อง หากเก็บระยะทางได้ก็ส่งผลการวิ่งทุกวัน
            </p>
          </div>
        </div>
      </section>

      {/* Leaderboard Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
              <p className="mt-2 text-gray-600">กำลังโหลดข้อมูล...</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700 text-center">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-4">
              {users.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">
                    ยังไม่มีข้อมูลผู้ใช้ในระบบ
                  </p>
                </div>
              ) : (
                <>
                  {/* Top 3 Podium */}
                  {users.length >= 3 && (
                    <div className="mb-12">
                      <div className="flex justify-center items-end space-x-20 mb-8">
                        {/* 2nd Place */}
                        <div className="text-center">
                          <div className="bg-gradient-to-b from-gray-100 to-gray-200 border-2 border-gray-400 rounded-xl p-6 w-48 h-40 flex flex-col justify-center shadow-lg">
                            <div className="text-3xl mb-2">🥈</div>
                            <div className="flex justify-center mb-3">
                              <img
                                className="h-12 w-12 rounded-full object-cover border-2 border-gray-400 shadow-md"
                                src={users[1]?.profileImage || "/supachai.jpg"}
                                alt={`${users[1]?.firstName} ${users[1]?.lastName}`}
                              />
                            </div>
                            <div className="text-sm font-semibold text-gray-700 mb-1 truncate">
                              {users[1]?.firstName} {users[1]?.lastName}
                            </div>
                            <div className="text-xs text-gray-500 mb-2">
                              {users[1]?.firstName} {users[1]?.lastName}
                            </div>
                            <div className="text-lg font-bold text-gray-700">
                              {users[1]?.totalDistance} km
                            </div>
                            {users[1]?.latestRun &&
                              users[1]?.latestRun.imagePath && (
                                <button
                                  onClick={() => {
                                    setSelectedImage(
                                      users[1].latestRun.imagePath
                                    );
                                    setShowImageModal(true);
                                  }}
                                  className="mt-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                  title="ภาพผลการวิ่งล่าสุด"
                                >
                                  <svg
                                    className="w-5 h-5 mx-auto"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                </button>
                              )}
                          </div>
                        </div>

                        {/* 1st Place */}
                        <div className="text-center">
                          <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-xl p-6 w-56 h-48 flex flex-col justify-center shadow-xl transform scale-105">
                            <div className="text-4xl mb-2">🥇</div>
                            <div className="flex justify-center mb-3">
                              <img
                                className="h-16 w-16 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
                                src={users[0]?.profileImage || "/supachai.jpg"}
                                alt={`${users[0]?.firstName} ${users[0]?.lastName}`}
                              />
                            </div>
                            <div className="text-base font-semibold text-yellow-600 mb-1 truncate">
                              {users[0]?.firstName} {users[0]?.lastName}
                            </div>
                            <div className="text-xs text-gray-600 mb-2">
                              {users[0]?.firstName} {users[0]?.lastName}
                            </div>
                            <div className="text-2xl font-bold text-yellow-600">
                              {users[0]?.totalDistance} km
                            </div>
                            {users[0]?.latestRun &&
                              users[0]?.latestRun.imagePath && (
                                <button
                                  onClick={() => {
                                    setSelectedImage(
                                      users[0].latestRun.imagePath
                                    );
                                    setShowImageModal(true);
                                  }}
                                  className="mt-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                  title="ดูภาพการวิ่งล่าสุด"
                                >
                                  <svg
                                    className="w-5 h-5 mx-auto"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                </button>
                              )}
                          </div>
                        </div>

                        {/* 3rd Place */}
                        <div className="text-center">
                          <div className="bg-gradient-to-b from-amber-50 to-amber-100 border-2 border-amber-600 rounded-xl p-6 w-48 h-36 flex flex-col justify-center shadow-lg">
                            <div className="text-3xl mb-2">🥉</div>
                            <div className="flex justify-center mb-3">
                              <img
                                className="h-12 w-12 rounded-full object-cover border-2 border-amber-600 shadow-md"
                                src={users[2]?.profileImage || "/supachai.jpg"}
                                alt={`${users[2]?.firstName} ${users[2]?.lastName}`}
                              />
                            </div>
                            <div className="text-sm font-semibold text-amber-700 mb-1 truncate">
                              {users[2]?.firstName} {users[2]?.lastName}
                            </div>
                            <div className="text-xs text-gray-600 mb-2">
                              {users[2]?.firstName} {users[2]?.lastName}
                            </div>
                            <div className="text-lg font-bold text-amber-700">
                              {users[2]?.totalDistance} km
                            </div>
                            {users[2]?.latestRun &&
                              users[2]?.latestRun.imagePath && (
                                <button
                                  onClick={() => {
                                    setSelectedImage(
                                      users[2].latestRun.imagePath
                                    );
                                    setShowImageModal(true);
                                  }}
                                  className="mt-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                  title="ดูภาพการวิ่งล่าสุด"
                                >
                                  <svg
                                    className="w-5 h-5 mx-auto"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                </button>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Full Leaderboard Table */}
                  <div className="bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200">
                    <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-800">
                        อันดับทั้งหมด
                      </h2>
                    </div>

                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            อันดับ
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            ชื่อ-นามสกุล
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            แผนก
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            ระยะทางสะสม
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            การวิ่งล่าสุด
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            ภาพผลการวิ่งล่าสุด
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            แก้ไข
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user, index) => {
                          const rank = index + 1;
                          return (
                            <tr
                              key={user.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div
                                  className={`text-sm font-medium ${getRankColor(
                                    rank
                                  )}`}
                                >
                                  {getRankIcon(rank)}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                      className="h-10 w-10 rounded-full object-cover"
                                      src={user.profileImage || "/supachai.jpg"}
                                      alt={`${user.firstName} ${user.lastName}`}
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-800">
                                      {user.firstName} {user.lastName}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      @{user.loginName}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-900 text-orange-200">
                                  {user.department}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div
                                  className={`text-sm font-bold ${getRankColor(
                                    rank
                                  )}`}
                                >
                                  {user.totalDistance || 0} km
                                </div>
                                <div className="text-xs text-gray-500">
                                  {user.totalRuns || 0} ครั้ง
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {user.latestRun ? (
                                  <div className="text-sm">
                                    <div className="font-medium text-gray-800">
                                      {user.latestRun.distance}{" "}
                                      {user.latestRun.distanceUnit}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {user.latestRun.time}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                      {new Date(
                                        user.latestRun.date
                                      ).toLocaleDateString("th-TH")}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-sm text-gray-400">-</div>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {user.latestRun && user.latestRun.imagePath ? (
                                  <button
                                    onClick={() => {
                                      setSelectedImage(
                                        user.latestRun.imagePath
                                      );
                                      setShowImageModal(true);
                                    }}
                                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                    title="ดูภาพการวิ่งล่าสุด"
                                  >
                                    <svg
                                      className="w-6 h-6"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                  </button>
                                ) : (
                                  <span className="text-gray-400 text-sm">
                                    ไม่มีภาพ
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {currentUser && currentUser.id === user.id ? (
                                  <Link
                                    href="/running-result/edit"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                                    title="แก้ไขการส่งผล"
                                  >
                                    <svg
                                      className="w-4 h-4 mr-1"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      />
                                    </svg>
                                    แก้ไขการส่งผล
                                  </Link>
                                ) : (
                                  <span className="text-gray-400 text-sm">-</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Stats Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md">
                      <div className="text-2xl font-bold text-orange-400">
                        {users.length}
                      </div>
                      <div className="text-sm text-gray-600">สมาชิกทั้งหมด</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md">
                      <div className="text-2xl font-bold text-green-400">
                        {users.reduce(
                          (sum, user) => sum + (user.totalRuns || 0),
                          0
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        การวิ่งทั้งหมด
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md">
                      <div className="text-2xl font-bold text-yellow-400">
                        {users.reduce(
                          (sum, user) => sum + (user.totalDistance || 0),
                          0
                        )}{" "}
                        km
                      </div>
                      <div className="text-sm text-gray-600">
                        ระยะทางรวมของทุกคน
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md">
                      <div className="text-2xl font-bold text-orange-300">
                        {users.length > 0
                          ? Math.round(
                              (users.reduce(
                                (sum, user) => sum + (user.totalDistance || 0),
                                0
                              ) /
                                users.length) *
                                100
                            ) / 100
                          : 0}{" "}
                        km
                      </div>
                      <div className="text-sm text-gray-600">ระยะทางเฉลี่ย</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => {
                setShowImageModal(false);
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="ภาพการวิ่งล่าสุด"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default LeaderboardPage;
