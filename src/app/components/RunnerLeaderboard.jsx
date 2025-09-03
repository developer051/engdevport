"use client";
import React, { useState, useEffect } from "react";

const RunnerLeaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

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

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "text-yellow-500";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-amber-600";
      default:
        return "text-gray-600";
    }
  };

  const filteredUsers = users.filter(user =>
    user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.loginName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const top3Users = filteredUsers.slice(0, 3);
  const remainingUsers = filteredUsers.slice(3);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        <p className="mt-2 text-gray-600">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-2">⚠️</div>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={fetchLeaderboard}
          className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
        >
          ลองใหม่
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-yellow-50 rounded-2xl p-8 shadow-lg">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent mb-3">
          อันดับนักวิ่ง
        </h2>
        <p className="text-gray-700 text-xl">
          ร่วมสนุกชาเลนจ์ไปด้วยกัน ด้วยการสะสมกิโลวิ่ง
        </p>
      </div>



      {/* Top 3 Runners Section */}
      <div className="mb-10">
        <div className="flex justify-center items-end space-x-30 mb-8">
          {/* 2nd Place */}
          {top3Users[1] && (
            <div className="text-center transform scale-90">
              <div className="relative mb-4">
                <img
                  src={top3Users[1].profileImage || "/supachai.jpg"}
                  alt={`${top3Users[1].firstName} ${top3Users[1].lastName}`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 shadow-xl"
                />
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-4xl">
                  🥈
                </div>
              </div>
              <h3 className="font-bold text-gray-700 text-lg mb-2">
                {top3Users[1].firstName} {top3Users[1].lastName}
              </h3>
              <p className="text-xl font-bold text-gray-600">
                {top3Users[1].totalDistance || 0} km
              </p>
            </div>
          )}

          {/* 1st Place */}
          {top3Users[0] && (
            <div className="text-center transform scale-110">
              <div className="relative mb-4">
                <img
                  src={top3Users[0].profileImage || "/supachai.jpg"}
                  alt={`${top3Users[0].firstName} ${top3Users[0].lastName}`}
                  className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400 shadow-2xl"
                />
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-5xl">
                  🥇
                </div>
              </div>
              <h3 className="font-bold text-gray-700 text-xl mb-2">
                {top3Users[0].firstName} {top3Users[0].lastName}
              </h3>
              <p className="text-2xl font-bold text-yellow-600">
                {top3Users[0].totalDistance || 0} km
              </p>
            </div>
          )}

          {/* 3rd Place */}
          {top3Users[2] && (
            <div className="text-center transform scale-90">
              <div className="relative mb-4">
                <img
                  src={top3Users[2].profileImage || "/supachai.jpg"}
                  alt={`${top3Users[2].firstName} ${top3Users[2].lastName}`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-amber-600 shadow-xl"
                />
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-4xl">
                  🥉
                </div>
              </div>
              <h3 className="font-bold text-gray-700 text-lg mb-2">
                {top3Users[2].firstName} {top3Users[2].lastName}
              </h3>
              <p className="text-xl font-bold text-amber-600">
                {top3Users[2].totalDistance || 0} km
              </p>
            </div>
          )}
        </div>

        {/* Total Runners Count */}
        <div className="text-center mb-6">
          <p className="text-gray-600 text-xl">
            จำนวนนักวิ่งทั้งหมด {users.length.toLocaleString()} คน
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Display name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
          />
        </div>
      </div>

      {/* Show More Button */}
      {remainingUsers.length > 0 && (
        <div className="text-center mb-8">
          <button
            onClick={() => setShowMore(!showMore)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {showMore ? "ซ่อนรายการ" : `แสดงเพิ่มเติม (${remainingUsers.length} คน)`}
          </button>
        </div>
      )}

      {/* Hidden Leaderboard Cards */}
      {showMore && remainingUsers.length > 0 && (
        <div className="space-y-4 mb-8">
          {remainingUsers.map((user, index) => {
            const rank = index + 4; // เริ่มจากอันดับที่ 4
            return (
              <div key={user.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`text-2xl font-bold ${getRankColor(rank)}`}>
                      {getRankIcon(rank)}
                    </div>
                    <div className="flex items-center space-x-4">
                      <img
                        className="h-16 w-16 rounded-full object-cover border-4 border-orange-200 shadow-lg"
                        src={user.profileImage || "/supachai.jpg"}
                        alt={`${user.firstName} ${user.lastName}`}
                      />
                      <div>
                        <div className="text-lg font-semibold text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          @{user.loginName}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">
                      {user.totalDistance || 0} km
                    </div>
                    <div className="text-sm text-gray-500">ระยะทางสะสม</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RunnerLeaderboard;

