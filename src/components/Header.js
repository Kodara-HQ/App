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
      <header className="bg-white px-4 py-2 fixed top-0 left-0 right-0 z-50 safe-top" style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 20px)' }}>
        <div className="flex items-center justify-between">
          {/* Left Side - Logo and Brand */}
          <div className="flex items-center space-x-2">
            {/* Logo Icon */}
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            
            {/* Brand Name */}
            <div className="block">
              <div className="text-lg font-bold text-purple-600">
                Sunyani
              </div>
              <div className="text-gray-500 text-xs">
                Fashion
              </div>
            </div>
          </div>

          {/* Center - Search and Filter */}
          <div className="flex items-center space-x-2 flex-1 max-w-xs sm:max-w-md mx-2">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search designers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="pl-8 pr-6 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none min-w-[100px] sm:min-w-[120px] shadow-sm"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Side - Add Button, User Profile and Menu */}
          <div className="flex items-center space-x-2">
            {/* Add New Designer Button */}
            <Link
              to="/add"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1 hover:shadow-md transition-all duration-200"
            >
              <Plus className="w-3 h-3" />
              <span className="hidden sm:inline">Add</span>
            </Link>

            {/* User Profile */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 bg-white rounded-md px-2 py-1 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <ChevronDown className="w-3 h-3 text-gray-500" />
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

            {/* Hamburger Menu */}
            <button className="bg-white rounded-md px-2 py-1 text-gray-700 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
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