"use client";

import { useState } from 'react';
import NavBar2 from '../components/NavBar2';
import Link from 'next/link';

export default function RunningResultPage() {
  const [formData, setFormData] = useState({
    hours: '',
    minutes: '',
    seconds: '',
    distance: '',
    distanceUnit: 'km',
    runningDate: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      
      // ตรวจสอบขนาดไฟล์ (ไม่เกิน 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('ขนาดไฟล์ต้องไม่เกิน 5MB');
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
      if (!formData.hours && !formData.minutes && !formData.seconds) {
        throw new Error('กรุณากรอกเวลาที่ใช้วิ่งอย่างน้อย 1 ค่า');
      }

      if (!formData.distance) {
        throw new Error('กรุณากรอกระยะทาง');
      }

      if (!imageFile) {
        throw new Error('กรุณาแนบภาพหลักฐานการวิ่ง');
      }

      // สร้าง FormData สำหรับส่งไฟล์
      const submitData = new FormData();
      submitData.append('hours', formData.hours || '0');
      submitData.append('minutes', formData.minutes || '0');
      submitData.append('seconds', formData.seconds || '0');
      submitData.append('distance', formData.distance);
      submitData.append('distanceUnit', formData.distanceUnit);
      submitData.append('runningDate', formData.runningDate || new Date().toISOString().split('T')[0]);
      submitData.append('image', imageFile);

      const response = await fetch('/api/running-result', {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'เกิดข้อผิดพลาดในการส่งผลการวิ่ง');
      }

      setSuccess('ส่งผลการวิ่งสำเร็จ!');
      
      // รีเซ็ตฟอร์ม
      setFormData({
        hours: '',
        minutes: '',
        seconds: '',
        distance: '',
        distanceUnit: 'km',
        runningDate: ''
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

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <NavBar2 />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4 sm:mb-6">
              ส่งผลการ<span className="text-orange-400">วิ่ง</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              บันทึกผลการวิ่งของคุณและอัปเดตคะแนนในระบบ
            </p>
          </div>
        </div>
      </section>

      {/* Running Result Form */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Form Section */}
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
              {/* Running Date Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">วันที่ทำการวิ่ง</h3>
                <div>
                  <label htmlFor="runningDate" className="block text-sm font-medium text-gray-700 mb-2">
                    วันที่วิ่ง (ถ้าไม่เลือกจะใช้วันที่ส่งผล)
                  </label>
                  <input
                    type="date"
                    id="runningDate"
                    name="runningDate"
                    value={formData.runningDate}
                    onChange={handleChange}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    หากไม่เลือกวันที่ จะใช้วันที่ส่งผลการวิ่งเป็นวันที่ทำการวิ่ง
                  </p>
                </div>
              </div>

              {/* Time Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">เวลาที่ใช้วิ่ง</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-2">
                      ชั่วโมง
                    </label>
                    <input
                      type="number"
                      id="hours"
                      name="hours"
                      min="0"
                      max="99"
                      value={formData.hours}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label htmlFor="minutes" className="block text-sm font-medium text-gray-700 mb-2">
                      นาที
                    </label>
                    <input
                      type="number"
                      id="minutes"
                      name="minutes"
                      min="0"
                      max="59"
                      value={formData.minutes}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label htmlFor="seconds" className="block text-sm font-medium text-gray-700 mb-2">
                      วินาที
                    </label>
                    <input
                      type="number"
                      id="seconds"
                      name="seconds"
                      min="0"
                      max="59"
                      value={formData.seconds}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Distance Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">ระยะทาง</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-2">
                      ระยะทาง
                    </label>
                    <input
                      type="number"
                      id="distance"
                      name="distance"
                      min="0"
                      step="0.01"
                      value={formData.distance}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500"
                      placeholder="5.0"
                    />
                  </div>
                  <div>
                    <label htmlFor="distanceUnit" className="block text-sm font-medium text-gray-700 mb-2">
                      หน่วย
                    </label>
                    <select
                      id="distanceUnit"
                      name="distanceUnit"
                      value={formData.distanceUnit}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800"
                    >
                      <option value="km">กิโลเมตร</option>
                      <option value="m">เมตร</option>
                      <option value="mi">ไมล์</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Image Upload Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">ภาพหลักฐานการวิ่ง</h3>
                
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label htmlFor="image" className="cursor-pointer">
                      <div className="text-gray-600">
                        <svg className="mx-auto h-12 w-12 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-lg font-medium">คลิกเพื่อเลือกภาพ</p>
                        <p className="text-sm">หรือลากไฟล์มาวางที่นี่</p>
                        <p className="text-sm">ขอภาพที่มองเห็น วันที่ ระยะทาง และ เวลาที่ใช้วิ่ง</p>
                        <p className="text-xs text-gray-500 mt-2">รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB</p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg border border-gray-200"
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    กำลังส่งข้อมูล...
                  </div>
                ) : (
                  'ส่งผลการวิ่ง'
                )}
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 space-y-3">
              <div className="text-center">
                <Link href="/leaderboard" className="text-sm text-gray-500 hover:text-orange-500">
                  ดูอันดับทั้งหมด
                </Link>
              </div>
            </div>
            </div>

            {/* Image Section */}
            <div className="flex flex-col justify-center items-center space-y-6">
              <img 
                src="/sendnobg.png" 
                alt="Running Illustration" 
                className="max-w-full h-auto max-h-200 object-contain opacity-50"
              />
              
              {/* Edit Button next to Rabbit */}
              <Link 
                href="/running-result/edit" 
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>แก้ไขผลการวิ่ง</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
