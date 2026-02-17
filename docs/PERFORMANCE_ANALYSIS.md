# รายงานวิเคราะห์ Performance และแนวทางปรับปรุง

## สรุปปัญหาหลักที่พบจาก HTML

### 1. ⚠️ **Font Preloading มากเกินไป (10 fonts)**
```
ปัญหาดีมาก - โหลด 10 font files พร้อมกันจะบล็อก Critical Rendering Path
```
- **ผลกระทบ**: ช้า FCP (First Contentful Paint), LCP (Largest Contentful Paint)
- **แนวทาง**: ลดเหลือ 2-3 fonts ที่ใช้จริงบน Above-the-fold เท่านั้น
- **วิธี**: ใช้ `font-display: swap` และโหลด font อื่นแบบ lazy

### 2. ⚠️ **Client-Side Rendering Bailout**
```html
<template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template>
```
- **ผลกระทบ**: แสดง loading spinner แทนเนื้อหาจริง → CLS สูง, LCP ช้า
- **สาเหตุ**: หน้าหลักสูตร (courses) ถูก render บน client แทน server
- **แนวทาง**: เปลี่ยนเป็น **Server Components** หรือใช้ `generateStaticParams` สำหรับ static pages

### 3. ⚠️ **Script Loading ไม่เหมาะสม**
- โหลด 10+ script chunks แบบ `async` พร้อมกัน
- `webpack-f5417d88344c43c1.js` ปรากฏซ้ำ (head และก่อน `</body>`)
- **แนวทาง**: ใช้ `dynamic()` สำหรับ components ที่ไม่จำเป็นต้องโหลดทันที

### 4. ⚠️ **Image ที่ Above-the-fold ใช้ loading="lazy"**
```html
<img alt="ScienceHome" loading="lazy" ... class="h-full w-auto object-contain" 
     src="/_next/image?url=%2Fscihome.png..." />
```
- **ปัญหา**: logo ใน nav ควรโหลดทันที เพราะอยู่เหนือ fold
- **แนวทาง**: เอา `loading="lazy"` ออกจาก above-the-fold images หรือใช้ `loading="eager"` / `priority`

### 5. ⚠️ **Third-Party Scripts**
- Cloudflare Insights beacon
- Cloudflare email-decode
- Cloudflare challenge platform (inline script)
- **แนวทาง**: โหลดหลัง page load ด้วย `requestIdleCallback` หรือ `defer` ที่เหมาะสม

### 6. ⚠️ **Background Image**
```css
background-image: url(/scihome.png)
```
- ใช้ PNG ขนาดใหญ่เป็น background + opacity
- **แนวทาง**: ใช้ WebP, กำหนด size ที่เหมาะสม หรือใช้ CSS `image-rendering`

### 7. ⚠️ **ไม่มี Preconnect สำหรับ External**
- Facebook, Instagram, LINE, Cloudflare
- **แนวทาง**: เพิ่ม `<link rel="preconnect" href="https://...">` สำหรับ domains ที่ใช้

### 8. ⚠️ **CSS ที่ Blocking**
- โหลด 2 CSS files แบบ render-blocking
- **แนวทาง**: Critical CSS inline, ส่วนอื่นโหลด async

---

## แนวทางแก้ไขแบบเรียงตามผลกระทบสูง→ต่ำ

| ลำดับ | ปัญหา | ผลกระทบ | ความยาก |
|-------|--------|----------|----------|
| 1 | ลด Font Preload | สูงมาก | ง่าย |
| 2 | แก้ CSR Bailout → SSR/Static | สูงมาก | ปานกลาง |
| 3 | โหลด Above-fold images ทันที | สูง | ง่าย |
| 4 | ลด Third-party blocking | ปานกลาง | ปานกลาง |
| 5 | เพิ่ม Preconnect | ปานกลาง | ง่าย |
| 6 | ลบ script ซ้ำ | ต่ำ | ง่าย |
| 7 | ปรับ background image | ต่ำ | ง่าย |

---

## ตัวอย่าง Code แก้ไข

### Font (layout.tsx / layout.js)
```javascript
// ❌ ไม่ดี - โหลดหลาย weight
import { Prompt } from 'next/font/google';
const prompt = Prompt({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700'], // มากเกินไป
});

// ✅ ดี - โหลดแค่ที่ใช้จริง
const prompt = Prompt({
  subsets: ['latin', 'thai'],
  weight: ['400', '600'], // body + heading เท่านั้น
  display: 'swap',
});
```

### Image (Nav/Logo)
```jsx
// ❌ ไม่ดี
<Image src="/logo.png" loading="lazy" ... />

// ✅ ดี - above-the-fold
<Image src="/logo.png" priority ... />
```

### Preconnect (layout)
```html
<head>
  <link rel="preconnect" href="https://www.facebook.com" />
  <link rel="preconnect" href="https://www.instagram.com" />
  <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
</head>
```

### Dynamic Import (components ที่ไม่จำเป็นทันที)
```jsx
// โหลด dropdown, modal ฯลฯ เมื่อจำเป็น
const MobileMenu = dynamic(() => import('./MobileMenu'), { ssr: false });
```
