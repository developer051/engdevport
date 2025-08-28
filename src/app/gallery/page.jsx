"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";
import Link from "next/link";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลภาพจาก API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        
        if (response.ok) {
          setImages(data.images || []);
        } else {
          console.error('Error fetching images:', data.error);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
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
                <p className="text-gray-600">จัดการการแสดงผลภาพ</p>
              </div>

              {/* Gallery Controls */}
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600 font-medium">
                  {selectedImage + 1} / {images.length}
                </div>
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
                   
                   {/* Login Button (แสดงเมื่อยังไม่ได้ login) */}
                   <Link
                     href="/login?redirect=/gallery/upload&message=กรุณาเข้าสู่ระบบเพื่ออัปโหลดภาพ"
                     className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors ml-2"
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
                         d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                       />
                     </svg>
                     เข้าสู่ระบบ
                   </Link>

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
                    <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                                         <p className="text-gray-600 mb-4">ยังไม่มีภาพในแกลเลอรี่</p>
                     <p className="text-sm text-gray-500 mb-6">เข้าสู่ระบบเพื่อเริ่มอัปโหลดภาพสวยๆ ของคุณ</p>
                     <div className="flex flex-col sm:flex-row gap-3 justify-center">
                       <Link
                         href="/gallery/upload"
                         className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                       >
                         <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                         </svg>
                         อัปโหลดภาพแรก
                       </Link>
                       <Link
                         href="/login?redirect=/gallery/upload&message=กรุณาเข้าสู่ระบบเพื่ออัปโหลดภาพ"
                         className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
                       >
                         <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                         </svg>
                         เข้าสู่ระบบ
                       </Link>
                     </div>
                  </div>
                </div>
              )}

             {/* Main Image */}
             {!loading && images.length > 0 && currentImage && (
               <div className="relative w-full h-full flex items-center justify-center">
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
                 onClick={prevImage}
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
                 onClick={nextImage}
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

                         {/* Image Info Overlay */}
             {!loading && images.length > 0 && currentImage && (
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-50 via-orange-50/90 to-transparent p-6">
                 <div className="max-w-4xl">
                   <h2 className="text-xl font-bold text-gray-800 mb-2">
                     {currentImage.title}
                   </h2>
                   <p className="text-gray-600 text-sm leading-relaxed">
                     {currentImage.description}
                   </p>
                 </div>
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
                     onClick={() => setSelectedImage(index)}
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
        <div className="bg-white py-8 border-t border-orange-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-600 text-sm mb-4">
              Gallery สามารถดูได้บน Windows, Mac, Linux, iPhone, iPad และ
              Android ทำงานได้บนเบราว์เซอร์สมัยใหม่ทั้งหมด
            </p>
            <div className="text-xs text-gray-500">
              Powered by <span className="text-orange-400">Supachai.O</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
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

            {/* Fullscreen Image */}
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-w-full max-h-full object-contain"
            />

            {/* Fullscreen Navigation */}
            <button
              onClick={prevImage}
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
              onClick={nextImage}
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
    </main>
  );
};

export default GalleryPage;
