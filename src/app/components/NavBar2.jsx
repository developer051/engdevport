"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const NavBar2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check for user authentication
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      localStorage.removeItem('user');
      setUser(null);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-100 fixed w-full z-50 transition-all duration-300 hover:bg-white/98">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Menu Links */}
          <div className="flex-1 flex items-center justify-start">
            <div className="hidden md:flex space-x-8">
                             <Link
                 href="/"
                 className="text-gray-600 hover:text-orange-500 px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ease-in-out relative group"
               >
                 <span className="relative z-10">Home</span>
                 <span className="absolute inset-0 bg-orange-100 rounded-md transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
               </Link>

                             <Link
                 href="/gallery"
                 className="text-gray-600 hover:text-orange-500 px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ease-in-out relative group"
               >
                 <span className="relative z-10">Gallery</span>
                 <span className="absolute inset-0 bg-orange-100 rounded-md transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
               </Link>
                             <Link
                 href="/staff"
                 className="text-gray-600 hover:text-orange-500 px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ease-in-out relative group"
               >
                 <span className="relative z-10">Rabbit Runners</span>
                 <span className="absolute inset-0 bg-orange-100 rounded-md transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
               </Link>
                             <Link
                 href="/leaderboard"
                 className="text-gray-600 hover:text-orange-500 px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ease-in-out relative group"
               >
                 <span className="relative z-10">Leaderboard</span>
                 <span className="absolute inset-0 bg-orange-100 rounded-md transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
               </Link>
                             <Link
                 href="/running-result"
                 className="text-gray-600 hover:text-orange-500 px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ease-in-out relative group"
               >
                 <span className="relative z-10">ส่งผลการวิ่ง</span>
                 <span className="absolute inset-0 bg-orange-100 rounded-md transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
               </Link>
            </div>
          </div>

          {/* Right side - Auth & Phone */}
          <div className="hidden md:flex items-center space-x-4">
                         {user ? (
               <div className="flex items-center space-x-4">
                 <div className="flex items-center space-x-2">
                   <img
                     className="h-8 w-8 rounded-full object-cover border-2 border-orange-400 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
                     src={user.profileImage || "/supachai.jpg"}
                     alt={`${user.firstName} ${user.lastName}`}
                   />
                   <span className="text-gray-700 font-medium text-lg">
                     สวัสดี, {user.firstName}
                   </span>
                 </div>
                                    <button
                     onClick={handleLogout}
                     className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-lg font-medium transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-0.5"
                   >
                     ออกจากระบบ
                   </button>
               </div>
             ) : (
              <div className="flex items-center space-x-2">
                                 <Link
                   href="/login"
                   className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-lg font-medium transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-0.5"
                 >
                   เข้าสู่ระบบ
                 </Link>
                                 <Link
                   href="/register"
                   className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-lg font-medium transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-0.5"
                 >
                   สมัครสมาชิก
                 </Link>
              </div>
            )}
            

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
                         <button
               className="outline-none mobile-menu-button p-2 rounded-md hover:bg-orange-100 transition-all duration-300"
               onClick={toggleMenu}
             >
                             <svg
                 className="w-6 h-6 text-gray-500 hover:text-orange-500 transition-colors duration-300"
                 fill="none"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth="2"
                 viewBox="0 0 24 24"
                 stroke="currentColor"
               >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
                           <div className="md:hidden">
           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-orange-100 shadow-lg">
                         <Link
               href="/"
               className="text-gray-600 hover:text-orange-500 hover:bg-orange-50 block px-3 py-2 rounded-md text-xl font-medium transition-all duration-300"
             >
               Home
             </Link>

                         <Link
               href="/gallery"
               className="text-gray-600 hover:text-orange-500 hover:bg-orange-50 block px-3 py-2 rounded-md text-xl font-medium transition-all duration-300"
             >
               Gallery
             </Link>
                         <Link
               href="/staff"
               className="text-gray-600 hover:text-orange-500 hover:bg-orange-50 block px-3 py-2 rounded-md text-xl font-medium transition-all duration-300"
             >
               Rabbit Members
             </Link>
                         <Link
               href="/leaderboard"
               className="text-gray-600 hover:text-orange-500 hover:bg-orange-50 block px-3 py-2 rounded-md text-xl font-medium transition-all duration-300"
             >
               Leaderboard
             </Link>
                         <Link
               href="/running-result"
               className="text-gray-600 hover:text-orange-500 hover:bg-orange-50 block px-3 py-2 rounded-md text-xl font-medium transition-all duration-300"
             >
               ส่งผลการวิ่ง
             </Link>
            
                         {/* Mobile Auth */}
             {user ? (
               <div className="px-3 py-2">
                 <div className="flex items-center space-x-2 mb-2">
                   <img
                     className="h-6 w-6 rounded-full object-cover border border-orange-400 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110"
                     src={user.profileImage || "/supachai.jpg"}
                     alt={`${user.firstName} ${user.lastName}`}
                   />
                   <div className="text-gray-700 text-lg font-medium">
                     สวัสดี, {user.firstName}
                   </div>
                 </div>
                                    <button
                     onClick={handleLogout}
                     className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-lg font-medium w-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                   >
                     ออกจากระบบ
                   </button>
               </div>
             ) : (
              <div className="px-3 py-2 space-y-2">
                                 <Link
                   href="/login"
                   className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-lg font-medium block text-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                 >
                   เข้าสู่ระบบ
                 </Link>
                                 <Link
                   href="/register"
                   className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-lg font-medium block text-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                 >
                   สมัครสมาชิก
                 </Link>
              </div>
            )}
            

          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar2;
