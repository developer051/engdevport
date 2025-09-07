"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";
import Link from "next/link";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);

  // ดึงข้อมูลผู้ใช้ปัจจุบัน
  useEffect(() => {
    const checkCurrentUser = () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setCurrentUser(parsedUser);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    };

    checkCurrentUser();
  }, []);

  // ดึงข้อมูลภาพจาก API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/gallery");
        const data = await response.json();

        if (response.ok) {
          setImages(data.images || []);
        } else {
          console.error("Error fetching images:", data.error);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const currentImage = images[selectedImage];

  const nextImage = () => {
    if (images.length > 0) {
      setSelectedImage((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") setIsFullscreen(false);
  };

  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener("keydown", handleKeyPress);
      return () => document.removeEventListener("keydown", handleKeyPress);
    }
  }, [isFullscreen]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && images.length > 1 && !isFullscreen) {
      const interval = setInterval(() => {
        setSelectedImage((prev) => (prev + 1) % images.length);
      }, 3000); // เปลี่ยนภาพทุก 3 วินาที

      setAutoPlayInterval(interval);

      return () => clearInterval(interval);
    } else if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      setAutoPlayInterval(null);
    }
  }, [isAutoPlaying, images.length, isFullscreen]);

  // หยุด auto-play เมื่อผู้ใช้โต้ตอบ
  const handleManualNavigation = (callback) => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 5000); // เริ่ม auto-play อีกครั้งหลัง 5 วินาที
    }
    callback();
  };

  // ตรวจสอบว่าเป็นเจ้าของภาพหรือไม่
  const isImageOwner = (image) => {
    if (!currentUser || !image?.uploadedBy) return false;
    return image.uploadedBy.userId === currentUser.id;
  };

  // เปิด modal แก้ไข
  const handleEditImage = (image) => {
    setEditingImage(image);
    setShowEditModal(true);
  };

  // ลบภาพ
  const handleDeleteImage = async (imageId) => {
    if (!confirm('คุณต้องการลบภาพนี้หรือไม่?')) return;

    try {
      const response = await fetch('/api/gallery', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageId }),
      });

      const result = await response.json();

      if (response.ok) {
        // รีเฟรชรายการภาพ
        const updatedImages = images.filter(img => img.id !== imageId);
        setImages(updatedImages);
        
        // ปรับ selectedImage ถ้าจำเป็น
        if (selectedImage >= updatedImages.length && updatedImages.length > 0) {
          setSelectedImage(updatedImages.length - 1);
        } else if (updatedImages.length === 0) {
          setSelectedImage(0);
        }
        
        alert('ลบภาพสำเร็จ');
      } else {
        alert(result.error || 'เกิดข้อผิดพลาดในการลบภาพ');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('เกิดข้อผิดพลาดในการลบภาพ');
    }
  };

  // รีเฟรชรายการภาพ
  const refreshImages = async () => {
    try {
      const response = await fetch("/api/gallery");
      const data = await response.json();

      if (response.ok) {
        setImages(data.images || []);
      }
    } catch (error) {
      console.error("Error refreshing images:", error);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <NavBar2 />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Photo <span className="text-orange-400">Gallery</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Main Gallery Container */}
      <div className="min-h-screen">
        {/* Gallery Header */}
        <div className="bg-gradient-to-r from-orange-50 to-white py-8 border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  หนึ่งภาพสร้างแรงบันดาลใจ
                </h2>
              </div>

              {/* Gallery Controls */}
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600 font-medium">
                  {selectedImage + 1} / {images.length}
                </div>

                {/* Auto-play Control */}
                {images.length > 1 && (
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`p-2 rounded-lg transition-colors ${
                      isAutoPlaying
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    title={
                      isAutoPlaying
                        ? "หยุดการเลื่อนอัตโนมัติ"
                        : "เริ่มการเลื่อนอัตโนมัติ"
                    }
                  >
                    {isAutoPlaying ? (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                )}

                <div className="flex space-x-2">
                  {/* Upload Button */}
                  <Link
                    href="/gallery/upload"
                    className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                    title="เข้าสู่ระบบเพื่ออัปโหลดภาพ"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    อัปโหลดภาพ
                  </Link>

                  {/* Edit and Delete Buttons - Only show for image owners */}
                  {!loading && images.length > 0 && currentImage && isImageOwner(currentImage) && (
                    <>
                      <button
                        onClick={() => handleEditImage(currentImage)}
                        className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                        title="แก้ไขภาพนี้"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        แก้ไขภาพ
                      </button>
                      <button
                        onClick={() => handleDeleteImage(currentImage.id)}
                        className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
                        title="ลบภาพนี้"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        ลบภาพ
                      </button>
                    </>
                  )}

                  {/* Thumbnails View Button */}
                  <button className="p-2 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors text-orange-700">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors text-orange-700"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Image Display */}
        <div className="relative flex-1">
          <div className="relative h-[70vh] bg-white">
            {/* Loading State */}
            {loading && (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">กำลังโหลดภาพ...</p>
                </div>
              </div>
            )}

            {/* No Images State */}
            {!loading && images.length === 0 && (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-600 mb-4">ยังไม่มีภาพในแกลเลอรี่</p>
                  <p className="text-sm text-gray-500 mb-6">
                    เข้าสู่ระบบเพื่อเริ่มอัปโหลดภาพสวยๆ ของคุณ
                  </p>
                  <Link
                    href="/gallery/upload"
                    className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    อัปโหลดภาพแรก
                  </Link>
                </div>
              </div>
            )}

            {/* Image Info Header */}
            {!loading && images.length > 0 && currentImage && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-orange-50 via-orange-50/90 to-transparent p-6 z-20">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 text-center">
                    {currentImage.title}
                  </h2>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed text-center">
                    {currentImage.description}
                  </p>
                </div>
              </div>
            )}

            {/* Main Image */}
            {!loading && images.length > 0 && currentImage && (
              <div className="relative w-full h-full flex items-center justify-center pt-32">
                <motion.img
                  key={selectedImage}
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Navigation Arrows */}
                <button
                  onClick={() => handleManualNavigation(prevImage)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-orange-500 bg-opacity-80 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-200 z-10 shadow-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => handleManualNavigation(nextImage)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-orange-500 bg-opacity-80 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-200 z-10 shadow-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {!loading && images.length > 0 && (
          <div className="bg-orange-50 py-4 border-t border-orange-100">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <motion.button
                    key={image.id}
                    onClick={() =>
                      handleManualNavigation(() => setSelectedImage(index))
                    }
                    className={`flex-shrink-0 relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === selectedImage
                        ? "border-orange-400 shadow-lg shadow-orange-400/50"
                        : "border-gray-300 hover:border-orange-300"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    {index === selectedImage && (
                      <div className="absolute inset-0 bg-orange-400 bg-opacity-20" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Gallery Info */}
        <div className="bg-white py-8 border-t border-orange-100"></div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Fullscreen Image Info Header */}
            <div className="bg-gradient-to-b from-black/80 via-black/60 to-transparent p-6 z-20">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {currentImage.title}
                </h2>
                <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
                  {currentImage.description}
                </p>
              </div>
            </div>

            {/* Fullscreen Image Container */}
            <div className="flex-1 flex items-center justify-center pt-20">
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Fullscreen Navigation */}
            <button
              onClick={() => handleManualNavigation(prevImage)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-orange-500 bg-opacity-80 hover:bg-opacity-100 text-white p-4 rounded-full shadow-lg"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => handleManualNavigation(nextImage)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-orange-500 bg-opacity-80 hover:bg-opacity-100 text-white p-4 rounded-full shadow-lg"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      {/* Edit Image Modal */}
      <EditImageModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingImage(null);
        }}
        image={editingImage}
        onSuccess={() => {
          setShowEditModal(false);
          setEditingImage(null);
          refreshImages();
        }}
      />
    </main>
  );
};

// Edit Image Modal Component
const EditImageModal = ({ isOpen, onClose, image, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (image) {
      setTitle(image.title || '');
      setDescription(image.description || '');
    }
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/gallery', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageId: image.id,
          title,
          description,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        onSuccess();
      } else {
        setError(result.error || 'เกิดข้อผิดพลาดในการแก้ไข');
      }
    } catch (error) {
      console.error('Error updating image:', error);
      setError('เกิดข้อผิดพลาดในการแก้ไข');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !image) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">แก้ไขภาพ</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image Preview */}
            <div className="mb-6">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            {/* Edit Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อภาพ
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  คำบรรยาย
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                  required
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:bg-gray-400"
                  disabled={isSubmitting}
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
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryPage;
