import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scissors, Plus, Home, Users, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="nav-modern sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3 animate-slide-in-left">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 md:p-3 rounded-xl shadow-lg transform hover:scale-110 transition-all duration-300">
              <Scissors className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold gradient-text">Sunyani Fashion</h1>
              <p className="text-xs md:text-sm text-gray-600 font-medium">Designer Directory</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-base font-bold gradient-text">Sunyani</h1>
              <p className="text-xs text-gray-600 font-medium">Fashion</p>
            </div>
          </Link>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                isActive('/')
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-700 hover:text-purple-600 hover:bg-white/50 backdrop-blur-sm'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            {isAuthenticated && (
              <Link
                to="/add"
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  isActive('/add')
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-700 hover:text-purple-600 hover:bg-white/50 backdrop-blur-sm'
                }`}
              >
                <Plus className="h-4 w-4" />
                <span>Add Designer</span>
              </Link>
            )}
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 md:px-4 py-2 rounded-xl hover:bg-white transition-all duration-300"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="h-3 w-3 md:h-4 md:w-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium hidden sm:block text-sm md:text-base">
                    {user?.firstName || 'User'}
                  </span>
                  <ChevronDown className={`h-3 w-3 md:h-4 md:w-4 text-gray-600 transition-transform duration-300 ${
                    showUserMenu ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 md:space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 text-sm md:text-base"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 md:px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="p-2 rounded-lg text-gray-700 hover:text-purple-600 hover:bg-white/50 backdrop-blur-sm transition-all duration-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header; 