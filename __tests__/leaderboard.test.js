import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LeaderboardPage from '../src/app/leaderboard/page.jsx';

// Mock the components that are imported
jest.mock('../src/app/components/NavBar2', () => {
  return function MockNavBar2() {
    return <div data-testid="navbar">NavBar2</div>;
  };
});

jest.mock('../src/app/components/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  };
});

// Mock fetch API
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('LeaderboardPage', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    mockFetch.mockClear();
    localStorageMock.getItem.mockClear();
  });

  test('ควรแสดงหน้า loading เมื่อเริ่มต้น', () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    render(<LeaderboardPage />);
    
    expect(screen.getByText('กำลังโหลดข้อมูล...')).toBeInTheDocument();
  });

  test('ควรแสดงข้อความเมื่อไม่มีข้อมูลผู้ใช้', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    render(<LeaderboardPage />);
    
    await waitFor(() => {
      expect(screen.getByText('ยังไม่มีข้อมูลผู้ใช้ในระบบ')).toBeInTheDocument();
    });
  });

  test('ควรแสดงข้อผิดพลาดเมื่อ API ล้มเหลว', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<LeaderboardPage />);
    
    await waitFor(() => {
      expect(screen.getByText('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์')).toBeInTheDocument();
    });
  });

  test('ควรแสดงรายการผู้ใช้เมื่อมีข้อมูล', async () => {
    const mockUsers = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        loginName: 'johndoe',
        department: 'IT',
        totalDistance: 100.5,
        totalRuns: 20,
        profileImage: '/profile1.jpg',
        latestRun: {
          distance: 5.5,
          distanceUnit: 'km',
          time: '30:00',
          date: '2024-01-15'
        }
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        loginName: 'janesmith',
        department: 'HR',
        totalDistance: 85.2,
        totalRuns: 15,
        profileImage: '/profile2.jpg',
        latestRun: {
          distance: 3.2,
          distanceUnit: 'km',
          time: '20:00',
          date: '2024-01-14'
        }
      }
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });

    render(<LeaderboardPage />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('100.5 km')).toBeInTheDocument();
      expect(screen.getByText('85.2 km')).toBeInTheDocument();
    });
  });

  test('ควรแสดงโพเดียมเมื่อมีผู้ใช้ 3 คนขึ้นไป', async () => {
    const mockUsers = [
      {
        id: 1,
        firstName: 'First',
        lastName: 'Place',
        totalDistance: 100,
        totalRuns: 20
      },
      {
        id: 2,
        firstName: 'Second',
        lastName: 'Place',
        totalDistance: 90,
        totalRuns: 18
      },
      {
        id: 3,
        firstName: 'Third',
        lastName: 'Place',
        totalDistance: 80,
        totalRuns: 16
      }
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });

    render(<LeaderboardPage />);
    
    await waitFor(() => {
      expect(screen.getByText('🥇')).toBeInTheDocument();
      expect(screen.getByText('🥈')).toBeInTheDocument();
      expect(screen.getByText('🥉')).toBeInTheDocument();
    });
  });

  test('ควรแสดงสถิติสรุปได้ถูกต้อง', async () => {
    const mockUsers = [
      { totalDistance: 50, totalRuns: 10 },
      { totalDistance: 30, totalRuns: 6 },
      { totalDistance: 20, totalRuns: 4 }
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });

    render(<LeaderboardPage />);
    
    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument(); // สมาชิกทั้งหมด
      expect(screen.getByText('20')).toBeInTheDocument(); // การวิ่งทั้งหมด
      expect(screen.getByText('100 km')).toBeInTheDocument(); // ระยะทางรวม
      expect(screen.getByText('33.33 km')).toBeInTheDocument(); // ระยะทางเฉลี่ย
    });
  });

  test('ควรเรียก fetchUserHistory เมื่อคลิกปุ่มประวัติ', async () => {
    const mockUsers = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        totalDistance: 50,
        totalRuns: 10
      }
    ];

    const mockHistoryResponse = {
      stats: {
        totalRuns: 10,
        totalDistance: 50,
        totalTime: '5:00:00',
        averageDistance: 5
      },
      results: []
    };

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockHistoryResponse
      });

    render(<LeaderboardPage />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const historyButton = screen.getByText('ประวัติ');
    fireEvent.click(historyButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/running-history/1');
    });
  });

  test('ควรตรวจสอบผู้ใช้ปัจจุบันจาก localStorage', () => {
    const mockUser = { id: 1, name: 'John Doe' };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    render(<LeaderboardPage />);
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('user');
  });

  test('ควรจัดการ localStorage ที่เสียหายได้', () => {
    localStorageMock.getItem.mockReturnValue('invalid json');
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    render(<LeaderboardPage />);
    
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
  });

  test('ควรแสดงปุ่มแก้ไขเฉพาะผู้ใช้ปัจจุบัน', async () => {
    const currentUser = { id: 1, name: 'John Doe' };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(currentUser));

    const mockUsers = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        totalDistance: 50,
        totalRuns: 10
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        totalDistance: 40,
        totalRuns: 8
      }
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });

    render(<LeaderboardPage />);
    
    await waitFor(() => {
      // ควรมีปุ่มแก้ไขสำหรับ John Doe (ผู้ใช้ปัจจุบัน)
      const editButtons = screen.getAllByText('แก้ไขการส่งผล');
      expect(editButtons).toHaveLength(1);
      
      // ควรมีเครื่องหมาย - สำหรับ Jane Smith ในคอลัมน์แก้ไข
      const dashElements = screen.getAllByText('-');
      expect(dashElements.length).toBeGreaterThan(0);
    });
  });

  test('ควรปิด modal เมื่อคลิกปุ่มปิด', async () => {
    const mockUsers = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        totalDistance: 50,
        totalRuns: 10
      }
    ];

    const mockHistoryResponse = {
      stats: {
        totalRuns: 10,
        totalDistance: 50,
        totalTime: '5:00:00',
        averageDistance: 5
      },
      results: []
    };

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockHistoryResponse
      });

    render(<LeaderboardPage />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // เปิด modal
    const historyButton = screen.getByText('ประวัติ');
    fireEvent.click(historyButton);

    await waitFor(() => {
      expect(screen.getByText('ประวัติการส่งผลของ John Doe')).toBeInTheDocument();
    });

    // ปิด modal - หาปุ่มปิดจาก svg path
    const closeButtons = screen.getAllByRole('button');
    const closeButton = closeButtons.find(button => {
      const svg = button.querySelector('svg');
      if (svg) {
        const path = svg.querySelector('path');
        return path && path.getAttribute('d') === 'M6 18L18 6M6 6l12 12';
      }
      return false;
    });
    
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('ประวัติการส่งผลของ John Doe')).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
