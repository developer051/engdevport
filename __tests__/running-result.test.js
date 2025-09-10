import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RunningResultPage from '../src/app/running-result/page.jsx';

// Mock the components that are imported
jest.mock('../src/app/components/NavBar2', () => {
  return function MockNavBar2() {
    return <div data-testid="navbar">NavBar2</div>;
  };
});

jest.mock('next/link', () => {
  return function MockLink({ children, href }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock Tesseract.js
jest.mock('tesseract.js', () => ({
  recognize: jest.fn()
}));

// Mock fetch API
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock FileReader
global.FileReader = jest.fn(() => ({
  readAsDataURL: jest.fn(),
  onload: null,
  result: 'data:image/jpeg;base64,mock-image-data'
}));

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-object-url');
global.URL.revokeObjectURL = jest.fn();

describe('RunningResultPage', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    mockFetch.mockClear();
  });

  test('ควรแสดงหน้า running result ได้ถูกต้อง', () => {
    render(<RunningResultPage />);
    
    expect(screen.getByText('ส่งผลการวิ่ง')).toBeInTheDocument();
    expect(screen.getByText('บันทึกผลการวิ่งของคุณและอัปเดตคะแนนในระบบ')).toBeInTheDocument();
    expect(screen.getByText('วันที่ทำการวิ่ง')).toBeInTheDocument();
    expect(screen.getByText('เวลาที่ใช้วิ่ง')).toBeInTheDocument();
    expect(screen.getByText('ระยะทาง')).toBeInTheDocument();
    expect(screen.getByText('ภาพหลักฐานการวิ่ง')).toBeInTheDocument();
  });

  test('ควรแสดงฟอร์ม input fields ทั้งหมด', () => {
    render(<RunningResultPage />);
    
    // ตรวจสอบ input fields
    expect(screen.getByLabelText('วันที่วิ่ง (ถ้าไม่เลือกจะใช้วันที่ส่งผล)')).toBeInTheDocument();
    expect(screen.getByLabelText('ชั่วโมง')).toBeInTheDocument();
    expect(screen.getByLabelText('นาที')).toBeInTheDocument();
    expect(screen.getByLabelText('วินาที')).toBeInTheDocument();
    expect(screen.getByLabelText('ระยะทาง (กิโลเมตร)')).toBeInTheDocument();
    expect(screen.getByLabelText('คลิกเพื่อเลือกภาพ')).toBeInTheDocument();
  });

  test('ควรแสดงปุ่มส่งผลการวิ่ง', () => {
    render(<RunningResultPage />);
    
    const submitButton = screen.getByRole('button', { name: /ส่งผลการวิ่ง \/ เดิน/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveClass('bg-orange-500');
  });

  test('ควรแสดงลิงก์ดูอันดับทั้งหมด', () => {
    render(<RunningResultPage />);
    
    const leaderboardLink = screen.getByText('ดูอันดับทั้งหมด');
    expect(leaderboardLink).toBeInTheDocument();
    expect(leaderboardLink.closest('a')).toHaveAttribute('href', '/leaderboard');
  });

  test('ควรแสดงรูปภาพ rabbit', () => {
    render(<RunningResultPage />);
    
    const rabbitImage = screen.getByAltText('Running Illustration');
    expect(rabbitImage).toBeInTheDocument();
    expect(rabbitImage).toHaveAttribute('src', '/sendnobg.png');
  });

  test('ควรกรอกข้อมูลในฟอร์มได้', () => {
    render(<RunningResultPage />);
    
    // กรอกข้อมูลเวลา
    const hoursInput = screen.getByLabelText('ชั่วโมง');
    const minutesInput = screen.getByLabelText('นาที');
    const secondsInput = screen.getByLabelText('วินาที');
    const distanceInput = screen.getByLabelText('ระยะทาง (กิโลเมตร)');
    
    fireEvent.change(hoursInput, { target: { value: '1' } });
    fireEvent.change(minutesInput, { target: { value: '30' } });
    fireEvent.change(secondsInput, { target: { value: '45' } });
    fireEvent.change(distanceInput, { target: { value: '5.5' } });
    
    expect(hoursInput.value).toBe('1');
    expect(minutesInput.value).toBe('30');
    expect(secondsInput.value).toBe('45');
    expect(distanceInput.value).toBe('5.5');
  });

  test('ควรกรอกวันที่ได้', () => {
    render(<RunningResultPage />);
    
    const dateInput = screen.getByLabelText('วันที่วิ่ง (ถ้าไม่เลือกจะใช้วันที่ส่งผล)');
    const today = new Date().toISOString().split('T')[0];
    
    fireEvent.change(dateInput, { target: { value: today } });
    expect(dateInput.value).toBe(today);
  });

  test('ควรอัปโหลดภาพได้', () => {
    render(<RunningResultPage />);
    
    const fileInput = screen.getByLabelText('คลิกเพื่อเลือกภาพ');
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    expect(fileInput.files[0]).toBe(file);
  });

  test('ควรแสดงข้อผิดพลาดเมื่อไม่กรอกเวลาวิ่ง', async () => {
    render(<RunningResultPage />);
    
    const distanceInput = screen.getByLabelText('ระยะทาง (กิโลเมตร)');
    const fileInput = screen.getByLabelText('คลิกเพื่อเลือกภาพ');
    const submitButton = screen.getByRole('button', { name: /ส่งผลการวิ่ง \/ เดิน/i });
    
    // กรอกเฉพาะระยะทาง
    fireEvent.change(distanceInput, { target: { value: '5' } });
    
    // สร้าง mock file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // ส่งฟอร์ม
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('กรุณากรอกเวลาที่ใช้วิ่งอย่างน้อย 1 ค่า')).toBeInTheDocument();
    });
  });

  test('ควรแสดงข้อผิดพลาดเมื่อไม่กรอกระยะทาง', async () => {
    render(<RunningResultPage />);
    
    const hoursInput = screen.getByLabelText('ชั่วโมง');
    const fileInput = screen.getByLabelText('คลิกเพื่อเลือกภาพ');
    const submitButton = screen.getByRole('button', { name: /ส่งผลการวิ่ง \/ เดิน/i });
    
    // กรอกเฉพาะเวลา
    fireEvent.change(hoursInput, { target: { value: '1' } });
    
    // สร้าง mock file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // ส่งฟอร์ม
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('กรุณากรอกระยะทาง')).toBeInTheDocument();
    });
  });

  test('ควรแสดงข้อผิดพลาดเมื่อไม่อัปโหลดภาพ', async () => {
    render(<RunningResultPage />);
    
    const hoursInput = screen.getByLabelText('ชั่วโมง');
    const distanceInput = screen.getByLabelText('ระยะทาง (กิโลเมตร)');
    const submitButton = screen.getByRole('button', { name: /ส่งผลการวิ่ง \/ เดิน/i });
    
    // กรอกเวลาและระยะทาง
    fireEvent.change(hoursInput, { target: { value: '1' } });
    fireEvent.change(distanceInput, { target: { value: '5' } });
    
    // ส่งฟอร์มโดยไม่อัปโหลดภาพ
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('กรุณาแนบภาพหลักฐานการวิ่ง')).toBeInTheDocument();
    });
  });

  test('ควรส่งข้อมูลได้สำเร็จ', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });

    render(<RunningResultPage />);
    
    const hoursInput = screen.getByLabelText('ชั่วโมง');
    const distanceInput = screen.getByLabelText('ระยะทาง (กิโลเมตร)');
    const fileInput = screen.getByLabelText('คลิกเพื่อเลือกภาพ');
    const submitButton = screen.getByRole('button', { name: /ส่งผลการวิ่ง \/ เดิน/i });
    
    // กรอกข้อมูล
    fireEvent.change(hoursInput, { target: { value: '1' } });
    fireEvent.change(distanceInput, { target: { value: '5' } });
    
    // สร้าง mock file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // ส่งฟอร์ม
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('ส่งผลการวิ่งสำเร็จ!')).toBeInTheDocument();
    });
    
    expect(mockFetch).toHaveBeenCalledWith('/api/running-result', {
      method: 'POST',
      body: expect.any(FormData)
    });
  });

  test('ควรแสดงข้อผิดพลาดเมื่อ API ล้มเหลว', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์' })
    });

    render(<RunningResultPage />);
    
    const hoursInput = screen.getByLabelText('ชั่วโมง');
    const distanceInput = screen.getByLabelText('ระยะทาง (กิโลเมตร)');
    const fileInput = screen.getByLabelText('คลิกเพื่อเลือกภาพ');
    const submitButton = screen.getByRole('button', { name: /ส่งผลการวิ่ง \/ เดิน/i });
    
    // กรอกข้อมูล
    fireEvent.change(hoursInput, { target: { value: '1' } });
    fireEvent.change(distanceInput, { target: { value: '5' } });
    
    // สร้าง mock file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // ส่งฟอร์ม
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('เกิดข้อผิดพลาดในเซิร์ฟเวอร์')).toBeInTheDocument();
    });
  });

  test('ควรรีเซ็ตฟอร์มหลังส่งสำเร็จ', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });

    render(<RunningResultPage />);
    
    const hoursInput = screen.getByLabelText('ชั่วโมง');
    const distanceInput = screen.getByLabelText('ระยะทาง (กิโลเมตร)');
    const fileInput = screen.getByLabelText('คลิกเพื่อเลือกภาพ');
    const submitButton = screen.getByRole('button', { name: /ส่งผลการวิ่ง \/ เดิน/i });
    
    // กรอกข้อมูล
    fireEvent.change(hoursInput, { target: { value: '1' } });
    fireEvent.change(distanceInput, { target: { value: '5' } });
    
    // สร้าง mock file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // ส่งฟอร์ม
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('ส่งผลการวิ่งสำเร็จ!')).toBeInTheDocument();
    });
    
    // ตรวจสอบว่าฟอร์มถูกรีเซ็ต
    expect(hoursInput.value).toBe('');
    expect(distanceInput.value).toBe('');
  });

  test('ควรแสดงปุ่ม loading เมื่อกำลังส่งข้อมูล', async () => {
    // Mock fetch ที่ไม่ resolve ทันที
    mockFetch.mockImplementation(() => new Promise(() => {}));

    render(<RunningResultPage />);
    
    const hoursInput = screen.getByLabelText('ชั่วโมง');
    const distanceInput = screen.getByLabelText('ระยะทาง (กิโลเมตร)');
    const fileInput = screen.getByLabelText('คลิกเพื่อเลือกภาพ');
    const submitButton = screen.getByRole('button', { name: /ส่งผลการวิ่ง \/ เดิน/i });
    
    // กรอกข้อมูล
    fireEvent.change(hoursInput, { target: { value: '1' } });
    fireEvent.change(distanceInput, { target: { value: '5' } });
    
    // สร้าง mock file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // ส่งฟอร์ม
    fireEvent.click(submitButton);
    
    // ตรวจสอบว่าปุ่มแสดง loading state
    expect(screen.getByText('กำลังส่งข้อมูล...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('ควรตรวจสอบประเภทไฟล์ที่อัปโหลด', () => {
    render(<RunningResultPage />);
    
    const fileInput = screen.getByLabelText('คลิกเพื่อเลือกภาพ');
    
    // ลองอัปโหลดไฟล์ที่ไม่ใช่รูปภาพ
    const textFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [textFile] } });
    
    // ตรวจสอบว่ามีข้อความแสดงข้อผิดพลาด
    expect(screen.getByText('กรุณาเลือกไฟล์รูปภาพเท่านั้น')).toBeInTheDocument();
  });

  test('ควรตรวจสอบขนาดไฟล์ที่อัปโหลด', () => {
    render(<RunningResultPage />);
    
    const fileInput = screen.getByLabelText('คลิกเพื่อเลือกภาพ');
    
    // สร้างไฟล์ขนาดใหญ่ (6MB)
    const largeFile = new File(['x'.repeat(6 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [largeFile] } });
    
    // ตรวจสอบว่ามีข้อความแสดงข้อผิดพลาด
    expect(screen.getByText('ขนาดไฟล์ต้องไม่เกิน 5MB')).toBeInTheDocument();
  });

  test('ควรแสดง placeholder ที่ถูกต้อง', () => {
    render(<RunningResultPage />);
    
    const distanceInput = screen.getByLabelText('ระยะทาง (กิโลเมตร)');
    expect(distanceInput).toHaveAttribute('placeholder', '0.00');
  });

  test('ควรแสดงข้อความช่วยเหลือในฟอร์ม', () => {
    render(<RunningResultPage />);
    
    expect(screen.getByText('หากไม่เลือกวันที่ จะใช้วันที่ส่งผลการวิ่งเป็นวันที่ทำการวิ่ง')).toBeInTheDocument();
    expect(screen.getByText('ขอภาพที่มองเห็น วันที่ ระยะทาง และ เวลาที่ใช้วิ่ง')).toBeInTheDocument();
    expect(screen.getByText('รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB')).toBeInTheDocument();
  });

  test('ควรมี NavBar2 component', () => {
    render(<RunningResultPage />);
    
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });
});
