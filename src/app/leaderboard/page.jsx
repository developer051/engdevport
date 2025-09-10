"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";
import { getRankColor, getRankIcon, formatTime, calculateStats, canEditUser } from "../../utils/leaderboardUtils";

const LeaderboardPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedUserHistory, setSelectedUserHistory] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
    checkCurrentUser();
  }, []);

  const checkCurrentUser = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
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


  const fetchUserHistory = async (userId, userName) => {
    setHistoryLoading(true);
    try {
      const response = await fetch(`/api/running-history/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setSelectedUserHistory({
          userId,
          userName,
          ...data
        });
        setShowHistoryModal(true);
      } else {
        setError(data.error || 'เกิดข้อผิดพลาดในการดึงข้อมูลประวัติการวิ่ง');
      }
    } catch (error) {
      console.error('Fetch history error:', error);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    } finally {
      setHistoryLoading(false);
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
              จะวิ่ง จะเดิน ในสวน cityrun หรือเดินบนเครื่อง
              หากเก็บระยะทางได้ก็ส่งผลการวิ่งทุกวัน
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
                            <div className="text-base font-medium text-orange-600 mb-1 truncate">
                              {users[1]?.firstName} {users[1]?.lastName}
                            </div>
                            <div className="text-xs text-gray-500 mb-2">
                              {users[1]?.firstName} {users[1]?.lastName}
                            </div>
                            <div className="text-lg font-bold text-gray-700">
                              {users[1]?.totalDistance} km
                            </div>
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
                            <div className="text-lg font-medium text-orange-600 mb-1 truncate">
                              {users[0]?.firstName} {users[0]?.lastName}
                            </div>
                            <div className="text-xs text-gray-600 mb-2">
                              {users[0]?.firstName} {users[0]?.lastName}
                            </div>
                            <div className="text-2xl font-bold text-yellow-600">
                              {users[0]?.totalDistance} km
                            </div>
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
                            <div className="text-base font-medium text-orange-600 mb-1 truncate">
                              {users[2]?.firstName} {users[2]?.lastName}
                            </div>
                            <div className="text-xs text-gray-600 mb-2">
                              {users[2]?.firstName} {users[2]?.lastName}
                            </div>
                            <div className="text-lg font-bold text-amber-700">
                              {users[2]?.totalDistance} km
                            </div>
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
                            ประวัติการส่งผล
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
                                    <div className="text-base font-medium text-orange-600">
                                      {user.firstName} {user.lastName}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      @{user.loginName}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-xs font-semibold text-gray-600">
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
                                <button
                                  onClick={() => fetchUserHistory(user.id, `${user.firstName} ${user.lastName}`)}
                                  disabled={historyLoading}
                                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                  title="ดูประวัติการส่งผลทั้งหมด"
                                >
                                  {historyLoading ? (
                                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  ) : (
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
                                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                      />
                                    </svg>
                                  )}
                                  ประวัติ
                                </button>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {canEditUser(currentUser, user) ? (
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
                                  <span className="text-gray-400 text-sm">
                                    -
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Stats Summary */}
                  {(() => {
                    const stats = calculateStats(users);
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md">
                          <div className="text-2xl font-bold text-orange-400">
                            {stats.totalUsers}
                          </div>
                          <div className="text-sm text-gray-600">สมาชิกทั้งหมด</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md">
                          <div className="text-2xl font-bold text-green-400">
                            {stats.totalRuns}
                          </div>
                          <div className="text-sm text-gray-600">
                            การวิ่งทั้งหมด
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md">
                          <div className="text-2xl font-bold text-yellow-400">
                            {stats.totalDistance} km
                          </div>
                          <div className="text-sm text-gray-600">
                            ระยะทางรวมของทุกคน
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md">
                          <div className="text-2xl font-bold text-orange-300">
                            {stats.averageDistance} km
                          </div>
                          <div className="text-sm text-gray-600">ระยะทางเฉลี่ย</div>
                        </div>
                      </div>
                    );
                  })()}
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

      {/* Running History Modal */}
      {showHistoryModal && selectedUserHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  ประวัติการส่งผลของ {selectedUserHistory.userName}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  จำนวนการวิ่งทั้งหมด: {selectedUserHistory.stats?.totalRuns || 0} ครั้ง
                </p>
              </div>
              <button
                onClick={() => {
                  setShowHistoryModal(false);
                  setSelectedUserHistory(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
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
            </div>

            {/* Stats Summary */}
            {selectedUserHistory.stats && (
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedUserHistory.stats.totalRuns}
                    </div>
                    <div className="text-sm text-gray-600">ครั้ง</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedUserHistory.stats.totalDistance} km
                    </div>
                    <div className="text-sm text-gray-600">ระยะทางรวม</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {selectedUserHistory.stats.totalTime}
                    </div>
                    <div className="text-sm text-gray-600">เวลารวม</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {selectedUserHistory.stats.averageDistance} km
                    </div>
                    <div className="text-sm text-gray-600">ระยะทางเฉลี่ย</div>
                  </div>
                </div>
              </div>
            )}

            {/* History Table */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {selectedUserHistory.results && selectedUserHistory.results.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          วันที่วิ่ง
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          ระยะทาง
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          เวลา
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          รูปภาพ
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          คะแนน
                        </th>
                        {canEditUser(currentUser, { id: selectedUserHistory.userId }) && (
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            แก้ไข
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedUserHistory.results.map((result) => (
                        <tr key={result.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-800">
                              {new Date(result.submittedAt).toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(result.submittedAt).toLocaleTimeString('th-TH', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-800">
                              {result.distance} {result.distanceUnit}
                            </div>
                            <div className="text-xs text-gray-500">
                              ({result.distanceInKm} km)
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-800">
                              {formatTime(result.totalSeconds)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {result.hours}h {result.minutes}m {result.seconds}s
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {result.imagePath ? (
                              <a
                                href={result.imagePath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 inline-block"
                                title="เปิดรูปภาพในแท็บใหม่"
                              >
                                <img
                                  src={result.imagePath}
                                  alt="ภาพการวิ่ง"
                                  className="w-12 h-12 object-cover rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200"
                                />
                              </a>
                            ) : (
                              <span className="text-gray-400 text-sm">ไม่มีภาพ</span>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              {result.score} คะแนน
                            </span>
                          </td>
                          {canEditUser(currentUser, { id: selectedUserHistory.userId }) && (
                            <td className="px-4 py-4 whitespace-nowrap">
                              <Link
                                href={`/running-result/edit?id=${result.id}`}
                                className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                                title="แก้ไขผลการวิ่ง"
                              >
                                <svg
                                  className="w-3 h-3 mr-1"
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
                                แก้ไข
                              </Link>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-2">📝</div>
                  <p className="text-gray-600 text-lg">
                    ยังไม่มีประวัติการส่งผล
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    เริ่มต้นการวิ่งและส่งผลการวิ่งครั้งแรกของคุณ
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default LeaderboardPage;
