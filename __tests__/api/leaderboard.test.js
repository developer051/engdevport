/**
 * API Tests สำหรับ Leaderboard functions
 */

describe('Leaderboard API Functions', () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  describe('fetchLeaderboard', () => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard");
        const data = await response.json();

        if (response.ok) {
          return { success: true, data };
        } else {
          return { success: false, error: data.error || "เกิดข้อผิดพลาดในการโหลดข้อมูล" };
        }
      } catch (error) {
        return { success: false, error: "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์" };
      }
    };

    test('ควรส่งคืนข้อมูลผู้ใช้เมื่อ API สำเร็จ', async () => {
      const mockUsers = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          totalDistance: 100,
          totalRuns: 20
        }
      ];

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers
      });

      const result = await fetchLeaderboard();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUsers);
      expect(global.fetch).toHaveBeenCalledWith('/api/leaderboard');
    });

    test('ควรส่งคืนข้อผิดพลาดเมื่อ API ล้มเหลว', async () => {
      const mockError = { error: 'Database connection failed' };

      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => mockError
      });

      const result = await fetchLeaderboard();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Database connection failed');
    });

    test('ควรส่งคืนข้อผิดพลาดเมื่อเกิด network error', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchLeaderboard();

      expect(result.success).toBe(false);
      expect(result.error).toBe('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    });

    test('ควรส่งคืนข้อผิดพลาดเริ่มต้นเมื่อไม่มี error message', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({})
      });

      const result = await fetchLeaderboard();

      expect(result.success).toBe(false);
      expect(result.error).toBe('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    });
  });

  describe('fetchUserHistory', () => {
    const fetchUserHistory = async (userId) => {
      try {
        const response = await fetch(`/api/running-history/${userId}`);
        const data = await response.json();

        if (response.ok) {
          return { success: true, data };
        } else {
          return { success: false, error: data.error || 'เกิดข้อผิดพลาดในการดึงข้อมูลประวัติการวิ่ง' };
        }
      } catch (error) {
        return { success: false, error: 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์' };
      }
    };

    test('ควรส่งคืนประวัติการวิ่งเมื่อ API สำเร็จ', async () => {
      const mockHistory = {
        stats: {
          totalRuns: 10,
          totalDistance: 50,
          totalTime: '5:00:00',
          averageDistance: 5
        },
        results: [
          {
            id: 1,
            distance: 5,
            distanceUnit: 'km',
            totalSeconds: 1800,
            submittedAt: '2024-01-15T10:00:00Z'
          }
        ]
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockHistory
      });

      const result = await fetchUserHistory(1);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockHistory);
      expect(global.fetch).toHaveBeenCalledWith('/api/running-history/1');
    });

    test('ควรส่งคืนข้อผิดพลาดเมื่อ API ล้มเหลว', async () => {
      const mockError = { error: 'User not found' };

      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => mockError
      });

      const result = await fetchUserHistory(999);

      expect(result.success).toBe(false);
      expect(result.error).toBe('User not found');
    });

    test('ควรส่งคืนข้อผิดพลาดเมื่อเกิด network error', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchUserHistory(1);

      expect(result.success).toBe(false);
      expect(result.error).toBe('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    });

    test('ควรส่งคืนข้อผิดพลาดเริ่มต้นเมื่อไม่มี error message', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({})
      });

      const result = await fetchUserHistory(1);

      expect(result.success).toBe(false);
      expect(result.error).toBe('เกิดข้อผิดพลาดในการดึงข้อมูลประวัติการวิ่ง');
    });

    test('ควรจัดการ userId ที่ไม่ถูกต้อง', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ stats: null, results: [] })
      });

      const result = await fetchUserHistory(null);

      expect(global.fetch).toHaveBeenCalledWith('/api/running-history/null');
      expect(result.success).toBe(true);
    });
  });

  describe('localStorage functions', () => {
    let localStorageMock;

    beforeEach(() => {
      localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      };
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true
      });
    });

    const checkCurrentUser = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          return JSON.parse(userData);
        } catch (error) {
          localStorage.removeItem("user");
          return null;
        }
      }
      return null;
    };

    test('ควรส่งคืนข้อมูลผู้ใช้จาก localStorage', () => {
      const mockUser = { id: 1, name: 'John Doe' };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));

      const result = checkCurrentUser();

      expect(result).toEqual(mockUser);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('user');
    });

    test('ควรส่งคืน null เมื่อไม่มีข้อมูลใน localStorage', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = checkCurrentUser();

      expect(result).toBeNull();
    });

    test('ควรลบข้อมูลและส่งคืน null เมื่อ JSON ไม่ถูกต้อง', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');

      const result = checkCurrentUser();

      expect(result).toBeNull();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
    });

    test('ควรจัดการกับ empty string', () => {
      localStorageMock.getItem.mockReturnValue('');

      const result = checkCurrentUser();

      expect(result).toBeNull();
    });
  });
});

