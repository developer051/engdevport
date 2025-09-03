"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatBox = ({ isOpen, onClose, onMinimize }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'สวัสดีครับ! RabbitRunners \n \n พร้อมให้คำแนะนำการวิ่งทุกเรื่องเลยครับ! อยากถามอะไรเกี่ยวกับการวิ่งไหมครับ?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage.trim(),
          conversationHistory: messages.slice(-5).map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Fallback response
        const fallbackMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.fallback || 'ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อ AI แต่ผมยังคงพร้อมให้คำแนะนำการวิ่งพื้นฐานได้ครับ! 💪',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, fallbackMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อ แต่ผมยังคงเป็นโค้ชการวิ่งที่ดีของคุณได้ครับ! 🏃‍♂️',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    { id: 'beginner', text: 'เริ่มต้นการวิ่ง', icon: '🚀' },
    { id: 'injury', text: 'ป้องกันการบาดเจ็บ', icon: '🛡️' },
    { id: 'breathing', text: 'เทคนิคการหายใจ', icon: '🫁' },
    { id: 'shoes', text: 'สถานที่ฝึก และเวลาซ้อม', icon: '👟' },
    { id: 'training', text: 'โปรแกรมฝึกซ้อม', icon: '📊' },
    { id: 'motivation', text: 'สร้างแรงจูงใจ', icon: '💪' }
  ];

  const handleQuickQuestion = async (questionId) => {
    const question = quickQuestions.find(q => q.id === questionId);
    if (!question) return;

    setInputMessage(question.text);
    // Auto-send quick question
    setTimeout(() => {
      setInputMessage(question.text);
      sendMessage();
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-end p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Chat Box */}
          <motion.div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border-4 border-orange-200 overflow-hidden"
            initial={{ y: 100, scale: 0.8 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-50 h-30 bg-white rounded-full flex items-center justify-center">
                    <img src="/coach-rabbit.png" alt="Coach Rabbit" className="w-100 h-150 object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI Running Coach</h3>
                    <p className="text-orange-100 text-sm">พร้อมให้คำแนะนำการวิ่ง</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={onMinimize}
                    className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
                  >
                    <span className="text-white">−</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
                  >
                    <span className="text-white">×</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Questions */}
            <div className="p-4 bg-orange-50 border-b border-orange-200">
              <p className="text-sm text-gray-600 mb-3">คำถามที่พบบ่อย:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleQuickQuestion(q.id)}
                    className="flex items-center space-x-2 p-2 bg-white rounded-lg border border-orange-200 hover:bg-orange-100 transition-all text-xs"
                  >
                    <span>{q.icon}</span>
                    <span className="text-gray-700">{q.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                        : 'bg-white text-gray-800 border border-orange-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-orange-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('th-TH', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-white border border-orange-200 rounded-2xl px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-orange-200">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="พิมพ์คำถามของคุณ..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChatBox;
