"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    department: "",
    messageToRunners: "",
    runningExperience: [],
    profileImage: null,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  const departments = [
    "Computer Science",
    "Data Science", 
    "Artificial Intelligence",
    "Software Engineering",
    "Information Technology",
    "Cybersecurity",
    "Underwriting & Claims  ",
    "Administration",
    "Agency",
    "Telemarketing",
    "Marketing",
    "Sales",
    "Customer Service",
    "HR",
    "Finance",
    "Legal",
    "Risk Management",
    "Business Development",
    "Project Management",
    "Data Analytics",
    "Data Engineering",
    "Other"
  ];

  const runningExperiences = [
    { id: "100M", label: "100M" },
    { id: "100K", label: "100K" },
    { id: "42K", label: "42K" },
    { id: "21K", label: "21K" },
    { id: "10K", label: "10K" },
    { id: "5K", label: "5K" },
    { id: "beginner", label: "นักวิ่งหน้าใหม่" }
  ];

  useEffect(() => {
    checkAuthAndLoadProfile();
  }, []);

  const checkAuthAndLoadProfile = async () => {
    try {
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      
      if (response.ok && data.isLoggedIn) {
        setIsLoggedIn(true);
        setUserInfo(data.user);
        setFormData({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          department: data.user.department || "",
          messageToRunners: data.user.messageToRunners || "",
          runningExperience: data.user.runningExperience || [],
          profileImage: null,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        });
      } else {
        setIsLoggedIn(false);
        router.push('/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsLoggedIn(false);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (files && files[0]) {
      const file = files[0];
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setError('รองรับเฉพาะไฟล์รูปภาพ (JPG, PNG, GIF) เท่านั้น');
        return;
      }
      
      // Validate file size (5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError('ขนาดไฟล์ต้องไม่เกิน 5MB');
        return;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    
    if (error) setError("");
  };

  const handleCheckboxChange = (experienceId) => {
    setFormData(prev => ({
      ...prev,
      runningExperience: prev.runningExperience.includes(experienceId)
        ? prev.runningExperience.filter(id => id !== experienceId)
        : [...prev.runningExperience, experienceId]
    }));
    
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    // Validate password fields if user wants to change password
    if (showPasswordSection) {
      if (!formData.currentPassword) {
        setError("กรุณากรอกรหัสผ่านปัจจุบัน");
        setIsSubmitting(false);
        return;
      }
      
      if (formData.newPassword && formData.newPassword.length < 6) {
        setError("รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร");
        setIsSubmitting(false);
        return;
      }
      
      if (formData.newPassword !== formData.confirmNewPassword) {
        setError("รหัสผ่านใหม่ไม่ตรงกัน");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('department', formData.department);
      formDataToSend.append('messageToRunners', formData.messageToRunners);
      formDataToSend.append('runningExperience', JSON.stringify(formData.runningExperience));
      
      if (showPasswordSection && formData.currentPassword) {
        formDataToSend.append('currentPassword', formData.currentPassword);
        if (formData.newPassword) {
          formDataToSend.append('newPassword', formData.newPassword);
        }
      }
      
      if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage);
      }

      const response = await fetch('/api/profile/update', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setFormData(prev => ({
          ...prev,
          profileImage: null,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        }));
        setShowPasswordSection(false);
        
        // Reload user data
        checkAuthAndLoadProfile();
      } else {
        setError(data.error || 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
      }
    } catch (error) {
      console.error('Update error:', error);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white text-gray-800">
        <NavBar2 />
        <div className="flex justify-center items-center min-h-screen">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return null; // Will redirect to login
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
              แก้ไข<span className="text-orange-400">โปรไฟล์</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              อัปเดตข้อมูลส่วนตัวและการตั้งค่าของคุณ
            </p>
          </div>
        </div>
      </section>

      {/* Profile Form */}
      <section className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-10 shadow-xl border border-gray-200">
            
            {/* Current Profile Info */}
            {userInfo && (
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">ข้อมูลปัจจุบัน</h3>
                <div className="flex items-center space-x-4">
                  {userInfo.profileImage && (
                    <img
                      src={userInfo.profileImage}
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium">{userInfo.firstName} {userInfo.lastName}</p>
                    <p className="text-sm text-gray-600">{userInfo.department}</p>
                    <p className="text-sm text-gray-600">@{userInfo.loginName}</p>
                  </div>
                </div>
              </div>
            )}
            
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

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-base font-medium text-gray-700 mb-3">
                    ชื่อ *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500 text-base"
                    placeholder="ชื่อ"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-base font-medium text-gray-700 mb-3">
                    นามสกุล *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500 text-base"
                    placeholder="นามสกุล"
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label htmlFor="department" className="block text-base font-medium text-gray-700 mb-3">
                  แผนก *
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 text-base"
                >
                  <option value="">เลือกแผนก</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Running Experience */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-4">
                  ประสบการณ์งานวิ่ง (เลือกได้มากกว่า 1)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {runningExperiences.map((experience) => (
                    <label key={experience.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.runningExperience.includes(experience.id)}
                        onChange={() => handleCheckboxChange(experience.id)}
                        className="w-4 h-4 text-orange-400 bg-gray-100 border-gray-300 rounded focus:ring-orange-400 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700">{experience.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Profile Image Upload */}
              <div>
                <label htmlFor="profileImage" className="block text-base font-medium text-gray-700 mb-3">
                  รูปโปรไฟล์ใหม่
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-400 transition-colors">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="profileImage"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                      >
                        <span>อัปโหลดรูปภาพใหม่</span>
                        <input
                          id="profileImage"
                          name="profileImage"
                          type="file"
                          accept="image/*"
                          onChange={handleChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">หรือลากและวาง</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF ขนาดไม่เกิน 5MB</p>
                    {formData.profileImage && (
                      <div className="mt-2">
                        <p className="text-sm text-green-600">✓ เลือกไฟล์แล้ว: {formData.profileImage.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Message to Runners */}
              <div>
                <label htmlFor="messageToRunners" className="block text-base font-medium text-gray-700 mb-3">
                  อยากจะบอกอะไรกับเพื่อนนักวิ่ง
                </label>
                <textarea
                  id="messageToRunners"
                  name="messageToRunners"
                  value={formData.messageToRunners}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500 resize-none text-base"
                  placeholder="บอกอะไรกับเพื่อนนักวิ่งของคุณ..."
                />
              </div>

              {/* Password Section Toggle */}
              <div className="border-t pt-8">
                <button
                  type="button"
                  onClick={() => setShowPasswordSection(!showPasswordSection)}
                  className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-base font-medium text-gray-700">เปลี่ยนรหัสผ่าน</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${showPasswordSection ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showPasswordSection && (
                  <div className="mt-4 space-y-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-base font-medium text-gray-700 mb-3">
                        รหัสผ่านปัจจุบัน *
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500 text-base"
                        placeholder="กรอกรหัสผ่านปัจจุบัน"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-base font-medium text-gray-700 mb-3">
                        รหัสผ่านใหม่
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        minLength="6"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500 text-base"
                        placeholder="กรอกรหัสผ่านใหม่ (อย่างน้อย 6 ตัวอักษร)"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmNewPassword" className="block text-base font-medium text-gray-700 mb-3">
                        ยืนยันรหัสผ่านใหม่
                      </label>
                      <input
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500 text-base"
                        placeholder="ยืนยันรหัสผ่านใหม่"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition duration-300 transform hover:scale-105 disabled:transform-none"
              >
                {isSubmitting ? "กำลังอัปเดต..." : "อัปเดตข้อมูล"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProfilePage;
