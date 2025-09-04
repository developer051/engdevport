"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar2 from '../../components/NavBar2';
import Footer from '../../components/Footer';

export default function EditRunningResultPage() {
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingResult, setEditingResult] = useState(null);
  const [formData, setFormData] = useState({
    hours: '',
    minutes: '',
    seconds: '',
    distance: '',
    distanceUnit: 'km',
    submittedAt: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await fetch('/api/running-result');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'เกิดข้อผิดพลาดในการดึงข้อมูล');
      }

      setResults(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (result) => {
    setEditingResult(result);
    setFormData({
      hours: result.hours.toString(),
      minutes: result.minutes.toString(),
      seconds: result.seconds.toString(),
      distance: result.distance.toString(),
      distanceUnit: result.distanceUnit,
      submittedAt: new Date(result.submittedAt).toISOString().split('T')[0]
    });
    setSubmitError('');
    setSubmitSuccess('');
  };

  const handleCancelEdit = () => {
    setEditingResult(null);
    setFormData({
      hours: '',
      minutes: '',
      seconds: '',
      distance: '',
      distanceUnit: 'km',
      submittedAt: ''
    });
    setSubmitError('');
    setSubmitSuccess('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');

    try {
      // ตรวจสอบข้อมูล
      if (!formData.hours && !formData.minutes && !formData.seconds) {
        throw new Error('กรุณากรอกเวลาที่ใช้วิ่งอย่างน้อย 1 ค่า');
      }

      if (!formData.distance) {
        throw new Error('กรุณากรอกระยะทาง');
      }

      if (!formData.submittedAt) {
        throw new Error('กรุณาเลือกวันที่');
      }

      const response = await fetch(`/api/running-result/${editingResult.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hours: parseInt(formData.hours) || 0,
          minutes: parseInt(formData.minutes) || 0,
          seconds: parseInt(formData.seconds) || 0,
          distance: parseFloat(formData.distance),
          distanceUnit: formData.distanceUnit,
          submittedAt: new Date(formData.submittedAt).toISOString()
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'เกิดข้อผิดพลาดในการแก้ไขผลการวิ่ง');
      }

      setSubmitSuccess('แก้ไขผลการวิ่งสำเร็จ!');
      
      // รีเฟรชข้อมูล
      await fetchResults();
      
      // รีเซ็ตฟอร์ม
      setTimeout(() => {
        handleCancelEdit();
      }, 2000);

    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (resultId) => {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบผลการวิ่งนี้?')) {
      return;
    }

    try {
      const response = await fetch(`/api/running-result/${resultId}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'เกิดข้อผิดพลาดในการลบผลการวิ่ง');
      }

      // รีเฟรชข้อมูล
      await fetchResults();
      alert('ลบผลการวิ่งสำเร็จ!');

    } catch (error) {
      alert(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (hours, minutes, seconds) => {
    const parts = [];
    if (hours > 0) parts.push(`${hours} ชม.`);
    if (minutes > 0) parts.push(`${minutes} นาที`);
    if (seconds > 0) parts.push(`${seconds} วินาที`);
    return parts.join(' ');
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-gray-800">
        <NavBar2 />
        <div className="flex justify-center items-center min-h-screen">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
        </div>
      </main>
    );
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
              แก้ไขผลการ<span className="text-orange-400">วิ่ง</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              จัดการผลการวิ่งของคุณ
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">ยังไม่มีผลการวิ่ง</p>
              <a href="/running-result" className="text-orange-500 hover:text-orange-600 font-medium">
                ส่งผลการวิ่งครั้งแรก
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Results List */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">ผลการวิ่งของคุณ</h2>
                {results.map((result) => (
                  <div key={result.id} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {formatDate(result.submittedAt)}
                        </h3>
                        <p className="text-gray-600">
                          เวลา: {formatTime(result.hours, result.minutes, result.seconds)}
                        </p>
                        <p className="text-gray-600">
                          ระยะทาง: {result.distance} {result.distanceUnit}
                        </p>
                        <p className="text-orange-600 font-semibold">
                          คะแนน: {result.score}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(result)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          แก้ไข
                        </button>
                        <button
                          onClick={() => handleDelete(result.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          ลบ
                        </button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <img
                        src={result.imagePath}
                        alt="Running result"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Form */}
              {editingResult && (
                <div className="bg-white rounded-lg p-8 shadow-xl border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">แก้ไขผลการวิ่ง</h2>
                  
                  {submitError && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
                      {submitError}
                    </div>
                  )}
                  
                  {submitSuccess && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
                      {submitSuccess}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Date Section */}
                    <div>
                      <label htmlFor="submittedAt" className="block text-sm font-medium text-gray-700 mb-2">
                        วันที่ส่งผล
                      </label>
                      <input
                        type="date"
                        id="submittedAt"
                        name="submittedAt"
                        value={formData.submittedAt}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800"
                      />
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

                    {/* Buttons */}
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            กำลังบันทึก...
                          </div>
                        ) : (
                          'บันทึกการแก้ไข'
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
