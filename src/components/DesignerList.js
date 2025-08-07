import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Phone, Mail, Plus, LogIn } from 'lucide-react';
import { useDesigners } from '../context/DesignerContext';
import { useAuth } from '../context/AuthContext';
import DesignerCard from './DesignerCard';

const DesignerList = () => {
  const {
    searchTerm,
    filterSpecialty,
    getFilteredDesigners,
    dispatch
  } = useDesigners();

  const { isAuthenticated } = useAuth();
  const filteredDesigners = getFilteredDesigners();

  const specialties = [
    'all',
    'Traditional African Wear',
    'Contemporary Fashion',
    'Bridal & Formal Wear',
    "Men's Fashion",
    "Children's Fashion",
    'Design & Fashion'
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Section */}
      <div className="hero-gradient text-center py-16 px-6 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-pulse-slow">
            Sunyani Fashion Designers
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Discover talented fashion designers in Sunyani. Connect with local artisans and find the perfect designer for your style.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium">
              ✨ {filteredDesigners.length} Amazing Designers Available
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Prompt */}
      {!isAuthenticated && (
        <div className="modern-card p-8 text-center">
          <div className="mb-6">
            <LogIn className="h-16 w-16 text-purple-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In to Access Designers</h2>
            <p className="text-gray-600 text-lg">
              Create an account or sign in to view and interact with our fashion designer directory.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="btn-modern text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
            >
              <LogIn className="h-5 w-5 inline mr-2" />
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="h-5 w-5 inline mr-2" />
              Create Account
            </Link>
          </div>
        </div>
      )}

      {/* Search and Filter Section - Only show when authenticated */}
      {isAuthenticated && (
        <div className="modern-card p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search designers by name, specialty, or location..."
                value={searchTerm}
                onChange={(e) => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
                className="search-modern w-full pl-12 pr-4 py-4 text-lg focus:outline-none focus-modern"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={filterSpecialty}
                onChange={(e) => dispatch({ type: 'SET_FILTER_SPECIALTY', payload: e.target.value })}
                className="search-modern w-full pl-12 pr-4 py-4 text-lg appearance-none focus:outline-none focus-modern cursor-pointer"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty === 'all' ? '✨ All Specialties' : specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results Summary - Only show when authenticated */}
      {isAuthenticated && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium">
              {filteredDesigners.length} Designer{filteredDesigners.length !== 1 ? 's' : ''} Found
            </div>
            {searchTerm && (
              <div className="text-gray-600">
                Results for "{searchTerm}"
              </div>
            )}
          </div>
          <Link
            to="/add"
            className="btn-modern text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="h-5 w-5 inline mr-2" />
            Add New Designer
          </Link>
        </div>
      )}

      {/* Designers Grid - Only show when authenticated */}
      {isAuthenticated ? (
        filteredDesigners.length === 0 ? (
          <div className="text-center py-16 modern-card">
            <div className="text-gray-400 mb-6">
              <Search className="h-24 w-24 mx-auto animate-pulse-slow" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No designers found</h3>
            <p className="text-gray-500 mb-8 text-lg">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Link
              to="/add"
              className="btn-modern text-white px-8 py-3 rounded-xl font-medium inline-block transition-all duration-300 transform hover:scale-105"
            >
              Add the first designer
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDesigners.map((designer, index) => (
              <div 
                key={designer.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <DesignerCard designer={designer} />
              </div>
            ))}
          </div>
        )
      ) : (
        // Preview cards for non-authenticated users
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDesigners.slice(0, 3).map((designer, index) => (
            <div 
              key={designer.id} 
              className="animate-fade-in-up opacity-50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <DesignerCard designer={designer} />
            </div>
          ))}
          <div className="modern-card p-8 text-center flex items-center justify-center">
            <div>
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-gray-600 font-medium">Sign in to see all designers</p>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action - Only show when authenticated */}
      {isAuthenticated && filteredDesigners.length > 0 && (
        <div className="text-center py-12 modern-card">
          <h3 className="text-2xl font-bold gradient-text mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            Add a new designer to help grow the Sunyani fashion community!
          </p>
          <Link
            to="/add"
            className="btn-modern text-white px-8 py-3 rounded-xl font-medium inline-block transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="h-5 w-5 inline mr-2" />
            Add New Designer
          </Link>
        </div>
      )}
    </div>
  );
};

export default DesignerList; 