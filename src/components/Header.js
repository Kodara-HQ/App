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

          {/* Center - Empty space for balance */}
          <div className="flex-1"></div>

          {/* Right Side - User Profile and Menu */}
          <div className="flex items-center space-x-2">
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