import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ChevronDown, Plus, Sparkles, Search, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDesigners } from '../context/DesignerContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { designers, setSearchFilters } = useDesigners();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsDropdownOpen(false);
  };

  // Update search filters when search term or specialty changes
  useEffect(() => {
    if (setSearchFilters) {
      setSearchFilters({
        searchTerm,
        selectedSpecialty
      });
    }
  }, [searchTerm, selectedSpecialty, setSearchFilters]);

  const specialties = ['All Specialties', ...new Set(designers.map(d => d.specialty))];

  return (
    <>
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-3 fixed top-0 left-0 right-0 z-50 safe-top">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo and Brand */}
          <div className="flex items-center space-x-2">
            {/* Logo Icon */}
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            
            {/* Brand Name */}
            <div className="block">
              <div className="text-lg font-bold text-white">
                Sunyani
              </div>
              <div className="text-gray-200 text-xs">
                Fashion
              </div>
            </div>
          </div>

          {/* Center - Search and Filter (Mobile Optimized) */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-1 max-w-xs sm:max-w-md mx-1 sm:mx-2">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-6 sm:pl-8 pr-2 sm:pr-3 py-1 sm:py-1.5 bg-white/90 border border-gray-200 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <Filter className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="pl-5 sm:pl-7 pr-4 sm:pr-6 py-1 sm:py-1.5 bg-white/90 border border-gray-200 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none min-w-[80px] sm:min-w-[100px] md:min-w-[120px]"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="h-2 w-2 sm:h-3 sm:w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Side - Add Button and User Menu */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Add New Designer Button */}
            <Link
              to="/add"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium flex items-center space-x-1 hover:shadow-md transition-all duration-200"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Add</span>
            </Link>

            {/* User Profile */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-md px-1.5 sm:px-2 py-1 sm:py-1.5 text-white hover:bg-white/20 transition-colors"
                >
                  <User className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">{user.firstName || 'User'}</span>
                  <ChevronDown className="w-2 h-2 sm:w-3 sm:h-3" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Orange Status Bar */}
      <div className="h-1 bg-orange-500 fixed top-0 left-0 right-0 z-50"></div>

      {/* Spacer for fixed header */}
      <div className="h-16 sm:h-16 md:h-20"></div>
    </>
  );
};

export default Header; 