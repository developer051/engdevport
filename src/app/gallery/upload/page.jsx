"use client";

import { useState, useEffect } from 'react';
import NavBar2 from '../../components/NavBar2';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function GalleryUploadPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // ตรวจสอบสถานะ login
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          method: 'GET',
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setIsLoggedIn(true);
          } else {
            // ถ้าไม่ได้ login ให้ redirect ไปหน้า login
            router.push('/login?redirect=/gallery/upload&message=กรุณาเข้าสู่ระบบเพื่ออัปโหลดภาพ');
          }
        } else {
          // ถ้าไม่ได้ login ให้ redirect ไปหน้า login
          router.push('/login?redirect=/gallery/upload&message=กรุณาเข้าสู่ระบบเพื่ออัปโหลดภาพ');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        // ถ้าเกิดข้อผิดพลาดในการตรวจสอบ ให้ redirect ไปหน้า login
        router.push('/login?redirect=/gallery/upload&message=เกิดข้อผิดพลาดในการตรวจสอบสถานะการเข้าสู่ระบบ');
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ตรวจสอบประเภทไฟล์
      if (!file.type.startsWith('image/')) {
        setError('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
        return;
      }
      
      // ตรวจสอบขนาดไฟล์ (ไม่เกิน 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('ขนาดไฟล์ต้องไม่เกิน 10MB');
        return;
      }

      setImageFile(file);
      setError('');

      // สร้าง preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // ตรวจสอบข้อมูล
      if (!formData.title.trim()) {
        throw new Error('กรุณากรอกชื่อภาพ');
      }

      if (!formData.description.trim()) {
        throw new Error('กรุณากรอกคำบรรยาย');
      }

      if (!imageFile) {
        throw new Error('กรุณาแนบภาพ');
      }

      // สร้าง FormData สำหรับส่งไฟล์
      const submitData = new FormData();
      submitData.append('title', formData.title.trim());
      submitData.append('description', formData.description.trim());
      submitData.append('image', imageFile);

      const response = await fetch('/api/gallery', {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'เกิดข้อผิดพลาดในการอัปโหลดภาพ');
      }

      setSuccess('อัปโหลดภาพสำเร็จ! ภาพของคุณจะปรากฏในแกลเลอรี่');
      
      // รีเซ็ตฟอร์ม
      setFormData({
        title: '',
        description: ''
      });
      setImageFile(null);
      setImagePreview(null);

    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // แสดง loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-white text-gray-800">
        <NavBar2 />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">กำลังตรวจสอบสถานะการเข้าสู่ระบบ...</p>
          </div>
        </div>
      </main>
    );
  }

  // ถ้าไม่ได้ login ไม่ต้องแสดงเนื้อหา
  if (!isLoggedIn) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <NavBar2 />
      
             {/* Hero Section */}
       <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-white"></div>
         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center">
             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
               อัปโหลด<span className="text-orange-400">ภาพ</span>
             </h1>
             <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
               แชร์ภาพสวยๆ ของคุณกับชุมชน
             </p>
             <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               เข้าสู่ระบบแล้ว - พร้อมอัปโหลดภาพ
             </div>
           </div>
         </div>
       </section>

      {/* Upload Form */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-8 shadow-xl border border-gray-200">
            
            {/* Error/Success Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">เลือกภาพ</h3>
                
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label htmlFor="image" className="cursor-pointer">
                      <div className="text-gray-600">
                        <svg className="mx-auto h-16 w-16 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-xl font-medium">คลิกเพื่อเลือกภาพ</p>
                        <p className="text-sm">หรือลากไฟล์มาวางที่นี่</p>
                        <p className="text-xs text-gray-500 mt-2">รองรับไฟล์ JPG, PNG, GIF ขนาดไม่เกิน 10MB</p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-80 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      ไฟล์ที่เลือก: {imageFile?.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Title Section */}
              <div>
                <label htmlFor="title" className="block text-lg font-semibold text-gray-800 mb-4">
                  ชื่อภาพ
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500"
                  placeholder="กรอกชื่อภาพของคุณ"
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.title.length}/100 ตัวอักษร
                </p>
              </div>

              {/* Description Section */}
              <div>
                <label htmlFor="description" className="block text-lg font-semibold text-gray-800 mb-4">
                  คำบรรยาย
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500 resize-none"
                  placeholder="บอกเล่าเรื่องราวของภาพนี้..."
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.description.length}/500 ตัวอักษร
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    กำลังอัปโหลด...
                  </div>
                ) : (
                  'อัปโหลดภาพ'
                )}
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center">
              <Link href="/gallery" className="text-sm text-gray-500 hover:text-orange-500">
                ← กลับไปดูแกลเลอรี่
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
