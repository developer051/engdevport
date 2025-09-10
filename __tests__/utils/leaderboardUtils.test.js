import {
  getRankColor,
  getRankIcon,
  formatTime,
  calculateStats,
  canEditUser
} from '../../src/utils/leaderboardUtils';

describe('leaderboardUtils', () => {
  describe('getRankColor', () => {
    test('ควรคืนค่าสีทองสำหรับอันดับ 1', () => {
      expect(getRankColor(1)).toBe('text-yellow-400');
    });

    test('ควรคืนค่าสีเงินสำหรับอันดับ 2', () => {
      expect(getRankColor(2)).toBe('text-gray-300');
    });

    test('ควรคืนค่าสีทองแดงสำหรับอันดับ 3', () => {
      expect(getRankColor(3)).toBe('text-amber-600');
    });

    test('ควรคืนค่าสีเทาสำหรับอันดับอื่นๆ', () => {
      expect(getRankColor(4)).toBe('text-gray-400');
      expect(getRankColor(10)).toBe('text-gray-400');
      expect(getRankColor(100)).toBe('text-gray-400');
    });

    test('ควรจัดการกับค่าที่ไม่ใช่ตัวเลข', () => {
      expect(getRankColor(null)).toBe('text-gray-400');
      expect(getRankColor(undefined)).toBe('text-gray-400');
      expect(getRankColor('1')).toBe('text-gray-400');
    });
  });

  describe('getRankIcon', () => {
    test('ควรคืนค่าเหรียญทองสำหรับอันดับ 1', () => {
      expect(getRankIcon(1)).toBe('🥇');
    });

    test('ควรคืนค่าเหรียญเงินสำหรับอันดับ 2', () => {
      expect(getRankIcon(2)).toBe('🥈');
    });

    test('ควรคืนค่าเหรียญทองแดงสำหรับอันดับ 3', () => {
      expect(getRankIcon(3)).toBe('🥉');
    });

    test('ควรคืนค่าหมายเลขอันดับสำหรับอันดับอื่นๆ', () => {
      expect(getRankIcon(4)).toBe('#4');
      expect(getRankIcon(10)).toBe('#10');
      expect(getRankIcon(100)).toBe('#100');
    });

    test('ควรจัดการกับค่าที่ไม่ใช่ตัวเลข', () => {
      expect(getRankIcon(null)).toBe('#null');
      expect(getRankIcon(undefined)).toBe('#undefined');
      expect(getRankIcon('5')).toBe('#5');
    });
  });

  describe('formatTime', () => {
    test('ควรแปลงวินาทีเป็นรูปแบบ HH:MM:SS ได้ถูกต้อง', () => {
      expect(formatTime(3661)).toBe('1:01:01'); // 1 ชม. 1 นาที 1 วินาที
      expect(formatTime(3600)).toBe('1:00:00'); // 1 ชม.
      expect(formatTime(60)).toBe('0:01:00'); // 1 นาที
      expect(formatTime(1)).toBe('0:00:01'); // 1 วินาที
      expect(formatTime(0)).toBe('0:00:00'); // 0 วินาที
    });

    test('ควรจัดการกับเวลาที่มากกว่า 24 ชั่วโมง', () => {
      expect(formatTime(86400)).toBe('24:00:00'); // 24 ชม.
      expect(formatTime(90061)).toBe('25:01:01'); // 25 ชม. 1 นาที 1 วินาที
    });

    test('ควรจัดการกับค่าที่ไม่ถูกต้อง', () => {
      expect(formatTime(-1)).toBe('0:00:00');
      expect(formatTime(null)).toBe('0:00:00');
      expect(formatTime(undefined)).toBe('0:00:00');
      expect(formatTime('abc')).toBe('0:00:00');
      expect(formatTime(NaN)).toBe('0:00:00');
    });

    test('ควรจัดการกับทศนิยม', () => {
      expect(formatTime(3661.5)).toBe('1:01:01'); // ปัดเศษลง
      expect(formatTime(3661.9)).toBe('1:01:01'); // ปัดเศษลง
    });
  });

  describe('calculateStats', () => {
    const mockUsers = [
      { totalRuns: 5, totalDistance: 10.5 },
      { totalRuns: 3, totalDistance: 7.2 },
      { totalRuns: 8, totalDistance: 15.8 }
    ];

    test('ควรคำนวณสถิติได้ถูกต้อง', () => {
      const stats = calculateStats(mockUsers);
      
      expect(stats.totalUsers).toBe(3);
      expect(stats.totalRuns).toBe(16);
      expect(stats.totalDistance).toBe(33.5);
      expect(stats.averageDistance).toBe(11.17);
    });

    test('ควรจัดการกับข้อมูลที่ขาดหาย', () => {
      const incompleteUsers = [
        { totalRuns: 5 }, // ไม่มี totalDistance
        { totalDistance: 10.5 }, // ไม่มี totalRuns
        {} // ไม่มีข้อมูลเลย
      ];
      
      const stats = calculateStats(incompleteUsers);
      
      expect(stats.totalUsers).toBe(3);
      expect(stats.totalRuns).toBe(5);
      expect(stats.totalDistance).toBe(10.5);
      expect(stats.averageDistance).toBe(3.5);
    });

    test('ควรจัดการกับ array ว่าง', () => {
      const stats = calculateStats([]);
      
      expect(stats.totalUsers).toBe(0);
      expect(stats.totalRuns).toBe(0);
      expect(stats.totalDistance).toBe(0);
      expect(stats.averageDistance).toBe(0);
    });

    test('ควรจัดการกับค่าที่ไม่ใช่ array', () => {
      expect(calculateStats(null)).toEqual({
        totalUsers: 0,
        totalRuns: 0,
        totalDistance: 0,
        averageDistance: 0
      });
      
      expect(calculateStats(undefined)).toEqual({
        totalUsers: 0,
        totalRuns: 0,
        totalDistance: 0,
        averageDistance: 0
      });
      
      expect(calculateStats('not an array')).toEqual({
        totalUsers: 0,
        totalRuns: 0,
        totalDistance: 0,
        averageDistance: 0
      });
    });
  });

  describe('canEditUser', () => {
    const currentUser = { id: 1, name: 'John' };
    const sameUser = { id: 1, name: 'John' };
    const differentUser = { id: 2, name: 'Jane' };

    test('ควรคืนค่า true เมื่อผู้ใช้ปัจจุบันและผู้ใช้เป้าหมายเป็นคนเดียวกัน', () => {
      expect(canEditUser(currentUser, sameUser)).toBe(true);
    });

    test('ควรคืนค่า false เมื่อผู้ใช้ปัจจุบันและผู้ใช้เป้าหมายเป็นคนละคน', () => {
      expect(canEditUser(currentUser, differentUser)).toBe(false);
    });

    test('ควรคืนค่า false เมื่อไม่มีผู้ใช้ปัจจุบัน', () => {
      expect(canEditUser(null, sameUser)).toBe(false);
      expect(canEditUser(undefined, sameUser)).toBe(false);
    });

    test('ควรคืนค่า false เมื่อไม่มีผู้ใช้เป้าหมาย', () => {
      expect(canEditUser(currentUser, null)).toBe(false);
      expect(canEditUser(currentUser, undefined)).toBe(false);
    });

    test('ควรคืนค่า false เมื่อไม่มีทั้งคู่', () => {
      expect(canEditUser(null, null)).toBe(false);
      expect(canEditUser(undefined, undefined)).toBe(false);
    });
  });
});

