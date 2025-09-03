# 🚀 การตั้งค่า Gemini API สำหรับ AI Running Coach

## 📋 ขั้นตอนการติดตั้ง

### 1. **ติดตั้ง Dependencies**
```bash
npm install @google/generative-ai
```

### 2. **สร้างไฟล์ .env.local**
สร้างไฟล์ `.env.local` ในโฟลเดอร์หลักของโปรเจค และเพิ่ม:

```env
# Gemini API Configuration
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyDihi7RcDoWTVAY4xiUlN4rhRSOpD4-r-w
```

### 3. **รับ Gemini API Key**
1. ไปที่ [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in ด้วย Google Account
3. คลิก "Create API Key"
4. Copy API Key มาใส่ในไฟล์ .env.local

### 4. **Restart Development Server**
```bash
npm run dev
```

## 🔧 การใช้งาน

### **เปิด AI Chat:**
1. คลิกที่ AI Coach (กระต่าย) ที่มุมขวาล่าง
2. คลิกปุ่ม "💬 เริ่มสนทนา"
3. เริ่มสนทนากับ AI Coach ได้เลย!

### **ฟีเจอร์ที่มี:**
- 💬 **Chat แบบ Real-time** - สนทนากับ AI ได้ทันที
- 🚀 **Quick Questions** - คำถามที่พบบ่อย
- 📱 **Responsive Design** - ใช้งานได้ทุกอุปกรณ์
- 🎨 **Beautiful UI** - ดีไซน์สวยงามตามธีมโปรเจค

## 🎯 ตัวอย่างคำถาม

- "วิธีเริ่มต้นการวิ่งสำหรับผู้เริ่มต้น?"
- "การป้องกันการบาดเจ็บขณะวิ่ง?"
- "เทคนิคการหายใจขณะวิ่ง?"
- "การเลือกรองเท้าวิ่งที่เหมาะสม?"
- "โปรแกรมการฝึกซ้อมสำหรับวิ่ง 5K?"
- "วิธีสร้างแรงจูงใจในการวิ่ง?"

## ⚠️ หมายเหตุ

- **API Key ต้องเป็นของจริง** - ไม่สามารถใช้ demo key ได้
- **ต้องมีอินเทอร์เน็ต** - เพื่อเชื่อมต่อกับ Gemini API
- **Fallback System** - หาก API ไม่ทำงาน จะมีข้อความสำรองแสดง

## 🆘 การแก้ไขปัญหา

### **API Key ไม่ถูกต้อง:**
- ตรวจสอบว่า API Key ใน .env.local ถูกต้อง
- ตรวจสอบว่า API Key มีสิทธิ์ใช้งาน Gemini API

### **API ไม่ตอบสนอง:**
- ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต
- ตรวจสอบว่า Gemini API ทำงานปกติ
- ลอง restart development server

### **ข้อผิดพลาดอื่นๆ:**
- ตรวจสอบ Console ใน Developer Tools
- ตรวจสอบ Network tab ใน Developer Tools

## 🎉 เสร็จแล้ว!

ตอนนี้ AI Running Coach ของคุณพร้อมใช้งานแล้วครับ! 🐰💪
