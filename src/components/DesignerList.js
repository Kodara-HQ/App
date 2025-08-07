import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Plus } from 'lucide-react';
import { useDesigners } from '../context/DesignerContext';
import DesignerCard from './DesignerCard';

const DesignerList = () => {
  const { designers, filteredDesigners, loading } = useDesigners();

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

        {/* Results Header */}
        <div className="px-4 sm:px-6 mb-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              {filteredDesigners.length} Designer{filteredDesigners.length !== 1 ? 's' : ''} Found
            </div>
            <Link
              to="/add"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg transition-all duration-300 shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span>Add New Designer</span>
            </Link>
          </div>
        </div>

        {/* Designers Grid */}
        <div className="px-4 sm:px-6 pb-8">
          {filteredDesigners.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-white/20">
                <div className="text-white/90 text-lg mb-2">
                  No designers found matching your criteria
                </div>
                <p className="text-white/70">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
              {filteredDesigners.map(designer => (
                <DesignerCard key={designer.id} designer={designer} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignerList; 