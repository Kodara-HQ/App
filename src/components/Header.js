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
      <header className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo and Brand */}
          <div className="flex items-center space-x-3">
            {/* Logo Icon with Sparkle */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              {/* Notification Dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"></div>
            </div>
            
            {/* Brand Name and Tagline */}
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                Fashion Designers
              </div>
              <div className="text-gray-300 text-sm">
                Discover Sunyani's Finest
              </div>
            </div>
          </div>

          {/* Center - Search and Filter */}
          <div className="flex items-center space-x-4 flex-1 max-w-2xl mx-8">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search designers by name, specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="pl-10 pr-8 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none min-w-[140px]"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Side - Add Button and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Add New Designer Button */}
            <Link
              to="/add"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Designer</span>
            </Link>

            {/* User Profile */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white hover:bg-white/20 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">{user.firstName || 'User'}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
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
      <div className="h-20"></div>
    </>
  );
};

export default Header; 