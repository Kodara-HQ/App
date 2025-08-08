import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Plus, Search, Filter } from 'lucide-react';
import { useDesigners } from '../context/DesignerContext';
import DesignerCard from './DesignerCard';

const DesignerList = () => {
  const { designers, setSearchFilters, loading } = useDesigners();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');

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
  const filteredDesigners = designers.filter(designer => {
    const matchesSearch = designer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         designer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         designer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || designer.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  if (loading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/dashboard.jpg" 
            alt="Fashion Designer Dashboard" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 via-purple-700/30 to-purple-900/40"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-white text-xl">Loading designers...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/dashboard.jpg" 
          alt="Fashion Designer Dashboard" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 via-purple-700/30 to-purple-900/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="pt-8 pb-12 px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl">
            Sunyani Fashion Designers
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 drop-shadow-lg px-4">
            Discover talented fashion designers in Sunyani. Connect with local artisans and find the perfect designer for your style.
          </p>
          <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-base sm:text-lg font-medium inline-flex shadow-lg">
            <Sparkles className="h-5 w-5" />
            <span>{designers.length} Amazing Designers Available</span>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="px-4 sm:px-6 mb-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search designers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
                    />
                  </div>
                </div>

                {/* Filter Dropdown */}
                <div className="lg:w-48">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full pl-10 pr-8 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none shadow-sm"
                    >
                      {specialties.map(specialty => (
                        <option key={specialty} value={specialty}>
                          {specialty}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Add Button */}
                <div className="lg:w-auto">
                  <Link
                    to="/add"
                    className="w-full lg:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 shadow-sm"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add New Designer</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Designers Grid */}
        <div className="px-4 sm:px-6 pb-8">
          <div className="max-w-7xl mx-auto">
            {filteredDesigners.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                  <p className="text-white text-lg">No designers found matching your criteria.</p>
                  <p className="text-white/70 mt-2">Try adjusting your search or filters.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDesigners.map((designer) => (
                  <DesignerCard key={designer.id} designer={designer} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerList; 