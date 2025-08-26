"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sample images data - ในการใช้งานจริงจะดึงจาก API หรือ CMS
  const images = [
    {
      id: 1,
      src: "/ds.jpg",
      alt: "Coastal Village",
      title: "Beautiful Coastal Village",
      description: "A stunning view of a Mediterranean coastal village with colorful houses and crystal clear waters."
    },
    {
      id: 2,
      src: "/bgb.jpg",
      alt: "Mountain Landscape",
      title: "Mountain Landscape",
      description: "Majestic mountain ranges with dramatic lighting and natural beauty."
    },
    {
      id: 3,
      src: "/engdevopb.png",
      alt: "EngDev Portfolio",
      title: "Portfolio Design",
      description: "Modern web design portfolio showcasing creative digital solutions."
    },
    {
      id: 4,
      src: "/supachai.jpg",
      alt: "Professional Portrait",
      title: "Professional Portrait",
      description: "Professional headshot for business and portfolio use."
    },
    {
      id: 5,
      src: "/ds.jpg",
      alt: "Architecture",
      title: "Modern Architecture",
      description: "Contemporary architectural design with clean lines and innovative structure."
    },
    {
      id: 6,
      src: "/bgb.jpg",
      alt: "Nature Scene",
      title: "Nature Photography",
      description: "Capturing the beauty of natural landscapes and wildlife."
    }
  ];

  const currentImage = images[selectedImage];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
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
    <main className="min-h-screen bg-black text-white">
      <NavBar2 />
      
      {/* Main Gallery Container */}
      <div className="pt-16 min-h-screen">
        {/* Gallery Header */}
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Photo Gallery
                </h1>
                <p className="text-gray-400">Universal Playback</p>
              </div>
              
              {/* Gallery Controls */}
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-400">
                  {selectedImage + 1} / {images.length}
                </div>
                <div className="flex space-x-2">
                  {/* Thumbnails View Button */}
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Fullscreen Button */}
                  <button 
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Image Display */}
        <div className="relative flex-1">
          <div className="relative h-[70vh] bg-gray-900">
            {/* Main Image */}
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
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Image Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6">
              <div className="max-w-4xl">
                <h2 className="text-xl font-bold text-white mb-2">
                  {currentImage.title}
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {currentImage.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="bg-gray-900 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <motion.button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === selectedImage 
                      ? 'border-green-400 shadow-lg shadow-green-400/50' 
                      : 'border-gray-600 hover:border-gray-400'
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
                    <div className="absolute inset-0 bg-green-400 bg-opacity-20" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Info */}
        <div className="bg-black py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400 text-sm mb-4">
              Gallery can be viewed on Windows, Mac, Linux, iPhone, iPad and Android. 
              It works on all modern browsers all the way back to Internet Explorer 6.
            </p>
            <div className="text-xs text-gray-500">
              Powered by <span className="text-green-400">EngDev Gallery</span>
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
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-4 rounded-full"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-4 rounded-full"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
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
