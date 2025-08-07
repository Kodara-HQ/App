import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Phone, Mail } from 'lucide-react';
import { useDesigners } from '../context/DesignerContext';
import DesignerCard from './DesignerCard';

const DesignerList = () => {
  const {
    searchTerm,
    filterSpecialty,
    getFilteredDesigners,
    dispatch
  } = useDesigners();

  const filteredDesigners = getFilteredDesigners();

  const specialties = [
    'all',
    'Traditional African Wear',
    'Contemporary Fashion',
    'Bridal & Formal Wear',
    "Men's Fashion",
    "Children's Fashion"
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white">
        <h1 className="text-4xl font-bold mb-4">Sunyani Fashion Designers</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          Discover talented fashion designers in Sunyani. Connect with local artisans and find the perfect designer for your style.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search designers by name, specialty, or location..."
              value={searchTerm}
              onChange={(e) => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={filterSpecialty}
              onChange={(e) => dispatch({ type: 'SET_FILTER_SPECIALTY', payload: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty === 'all' ? 'All Specialties' : specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Found {filteredDesigners.length} designer{filteredDesigners.length !== 1 ? 's' : ''}
        </p>
        <Link
          to="/add"
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <span>Add New Designer</span>
        </Link>
      </div>

      {/* Designers Grid */}
      {filteredDesigners.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No designers found</h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <Link
            to="/add"
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Add the first designer
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigners.map((designer) => (
            <DesignerCard key={designer.id} designer={designer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DesignerList; 