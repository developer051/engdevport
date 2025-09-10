/**
 * ฟังก์ชันสำหรับกำหนดสีของอันดับ
 * @param {number} rank - อันดับของผู้ใช้
 * @returns {string} CSS class สำหรับสีของอันดับ
 */
export const getRankColor = (rank) => {
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

/**
 * ฟังก์ชันสำหรับกำหนดไอคอนของอันดับ
 * @param {number} rank - อันดับของผู้ใช้
 * @returns {string} ไอคอนหรือตัวเลขอันดับ
 */
export const getRankIcon = (rank) => {
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

/**
 * ฟังก์ชันสำหรับแปลงเวลาจากวินาทีเป็นรูปแบบ HH:MM:SS
 * @param {number} totalSeconds - เวลาทั้งหมดในหน่วยวินาที
 * @returns {string} เวลาในรูปแบบ HH:MM:SS
 */
export const formatTime = (totalSeconds) => {
  if (typeof totalSeconds !== 'number' || totalSeconds < 0) {
    return '0:00:00';
  }
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * ฟังก์ชันสำหรับคำนวณสถิติของผู้ใช้
 * @param {Array} users - รายการผู้ใช้
 * @returns {Object} สถิติต่างๆ
 */
export const calculateStats = (users) => {
  if (!Array.isArray(users) || users.length === 0) {
    return {
      totalUsers: 0,
      totalRuns: 0,
      totalDistance: 0,
      averageDistance: 0
    };
  }

  const totalRuns = users.reduce((sum, user) => sum + (user.totalRuns || 0), 0);
  const totalDistance = users.reduce((sum, user) => sum + (user.totalDistance || 0), 0);
  const averageDistance = totalDistance / users.length;

  return {
    totalUsers: users.length,
    totalRuns,
    totalDistance: Number(totalDistance.toFixed(2)),
    averageDistance: Number(averageDistance.toFixed(2))
  };
};

/**
 * ฟังก์ชันสำหรับตรวจสอบว่าผู้ใช้สามารถแก้ไขข้อมูลได้หรือไม่
 * @param {Object} currentUser - ผู้ใช้ปัจจุบัน
 * @param {Object} targetUser - ผู้ใช้เป้าหมาย
 * @returns {boolean} true ถ้าสามารถแก้ไขได้
 */
export const canEditUser = (currentUser, targetUser) => {
  if (!currentUser || !targetUser) {
    return false;
  }
  
  return currentUser.id === targetUser.id;
};

