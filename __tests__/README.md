# Unit Tests Documentation

## ภาพรวม
โปรเจคนี้ใช้ Jest และ React Testing Library สำหรับการทำ unit testing

## โครงสร้างไฟล์ Test
```
__tests__/
├── README.md                    # เอกสารการใช้งาน tests
├── utils/
│   └── leaderboardUtils.test.js # ทดสอบ utility functions
├── api/
│   └── leaderboard.test.js      # ทดสอบ API functions  
└── leaderboard.test.js          # ทดสอบ LeaderboardPage component
```

## การรัน Tests

### รัน tests ทั้งหมด
```bash
npm test
```

### รัน tests แบบ watch mode (ติดตามการเปลี่ยนแปลง)
```bash
npm run test:watch
```

### รัน tests พร้อม coverage report
```bash
npm run test:coverage
```

## ประเภทของ Tests

### 1. Utility Functions Tests (`utils/leaderboardUtils.test.js`)
ทดสอบฟังก์ชันที่ใช้ในการคำนวณและจัดการข้อมูล:

- **getRankColor()** - ทดสอบการกำหนดสีตามอันดับ
- **getRankIcon()** - ทดสอบการแสดงไอคอนตามอันดับ  
- **formatTime()** - ทดสอบการแปลงเวลาจากวินาทีเป็น HH:MM:SS
- **calculateStats()** - ทดสอบการคำนวณสถิติจากข้อมูลผู้ใช้
- **canEditUser()** - ทดสอบการตรวจสอบสิทธิ์การแก้ไข

### 2. API Functions Tests (`api/leaderboard.test.js`)
ทดสอบฟังก์ชันที่เรียก API:

- **fetchLeaderboard()** - ทดสอบการดึงข้อมูล leaderboard
- **fetchUserHistory()** - ทดสอบการดึงประวัติการวิ่งของผู้ใช้
- **localStorage functions** - ทดสอบการจัดการข้อมูลใน localStorage

### 3. Component Tests (`leaderboard.test.js`)
ทดสอบ LeaderboardPage component:

- การแสดงสถานะ loading
- การแสดงข้อผิดพลาด
- การแสดงรายการผู้ใช้
- การแสดงโพเดียม (อันดับ 1-3)
- การแสดงสถิติสรุป
- การเรียกใช้ modal ประวัติ
- การตรวจสอบสิทธิ์การแก้ไข

## Mock Objects และ Setup

### Jest Configuration
- **jest.config.js** - การตั้งค่า Jest สำหรับ Next.js
- **jest.setup.js** - การ mock objects และ global setup

### Mock Objects ที่ใช้:
- **fetch API** - สำหรับทดสอบการเรียก API
- **localStorage** - สำหรับทดสอบการจัดเก็บข้อมูล
- **Next.js router และ Link** - สำหรับทดสอบ navigation
- **Components** - NavBar2 และ Footer

## Best Practices ที่ใช้

### 1. Test Organization
- แยก tests ตามประเภทฟังก์ชัน
- ใช้ `describe` blocks เพื่อจัดกลุม related tests
- ตั้งชื่อ test cases ที่อธิบายพฤติกรรมที่คาดหวัง

### 2. Mock Management  
- ใช้ `beforeEach` และ `afterEach` เพื่อ reset mocks
- Mock เฉพาะสิ่งที่จำเป็นสำหรับการทดสอบ
- ใช้ realistic mock data

### 3. Async Testing
- ใช้ `waitFor` สำหรับ async operations
- ตั้ง timeout ที่เหมาะสมสำหรับ slow operations
- Test ทั้ง success และ error cases

### 4. Edge Cases Testing
- ทดสอบกับข้อมูลที่ไม่ถูกต้อง (null, undefined, empty)
- ทดสอบ boundary conditions
- ทดสอบ error handling

## Coverage Goals
- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 85%
- **Lines**: > 80%

## การเพิ่ม Tests ใหม่

### สำหรับ Utility Functions:
```javascript
// __tests__/utils/yourUtils.test.js
import { yourFunction } from '../../src/utils/yourUtils';

describe('yourFunction', () => {
  test('ควรทำงานถูกต้องเมื่อได้รับ input ปกติ', () => {
    expect(yourFunction('input')).toBe('expected output');
  });
});
```

### สำหรับ Components:
```javascript  
// __tests__/yourComponent.test.js
import { render, screen } from '@testing-library/react';
import YourComponent from '../src/components/YourComponent';

test('ควรแสดงเนื้อหาถูกต้อง', () => {
  render(<YourComponent />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

## การ Debug Tests
- ใช้ `screen.debug()` เพื่อดู DOM structure
- ใช้ `console.log` ใน test เพื่อ debug values
- รัน test เดี่ยวด้วย `npm test -- --testNamePattern="test name"`

