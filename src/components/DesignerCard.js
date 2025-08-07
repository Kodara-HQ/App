import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, Mail, X, ChevronLeft, ChevronRight } from 'lucide-react';

const DesignerCard = ({ designer }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  // Get a unique image for each designer based on their ID
  const getDesignerImage = (designer) => {
    const imageMap = {
      1: "/images/Bridal.webp", // Jaka Designs - Bridal
      2: "/images/contemp.webp", // byijay - Contemporary
      3: "/images/casual lady.jpeg", // Elegant Stitches - Casual
      4: "/images/traditional.webp", // Traditional Threads - Traditional
      5: "/images/men.webp", // Men's Fashion Hub - Men's
      6: "/images/child.webp", // Children's Fashion - Children's
      7: "/images/african print.jpg" // African Prints - African Print
    };
    
    return imageMap[designer.id] || designer.image || "/images/bijay.jpg";
  };

  const openModal = (index = 0) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === designer.portfolio.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? designer.portfolio.length - 1 : prev - 1
    );
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Top Section - Image with Badges */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={getDesignerImage(designer)}
            alt={designer.name}
            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => openModal(0)}
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x300/3B82F6/FFD700?text=${encodeURIComponent(designer.name)}`;
            }}
          />
          
          {/* Experience Badge - Top Left */}
          <div className="absolute top-3 left-3 bg-purple-600 text-white px-2 py-1 rounded-lg text-xs font-medium">
            {designer.experience}
          </div>
          
          {/* Rating Badge - Top Right */}
          <div className="absolute top-3 right-3 bg-gray-200 text-gray-800 px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>{designer.rating}</span>
          </div>

          {/* Portfolio Preview Badge */}
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-lg text-xs font-medium">
            {designer.portfolio.length} Photos
          </div>
        </div>

        {/* Bottom Section - Details */}
        <div className="p-6">
          {/* Designer Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {designer.name}
          </h3>

          {/* Specialty */}
          <p className="text-purple-600 font-semibold text-sm mb-3">
            {designer.specialty}
          </p>

          {/* Star Rating */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex space-x-1">
              {renderStars(designer.rating)}
            </div>
            <span className="text-gray-500 text-sm">({designer.rating})</span>
          </div>

          {/* Contact & Location Details */}
          <div className="space-y-2">
            {/* Location */}
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <MapPin className="w-4 h-4 text-purple-500" />
              <span>{designer.location}</span>
            </div>

            {/* Working Hours */}
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <Clock className="w-4 h-4 text-green-500" />
              <span>{designer.workingHours}</span>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <Phone className="w-4 h-4 text-blue-500" />
              <span>{designer.phone}</span>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <Mail className="w-4 h-4 text-red-500" />
              <span>{designer.email}</span>
            </div>
          </div>

          {/* Portfolio Preview */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Portfolio Preview:</h4>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {designer.portfolio.slice(0, 4).map((item, index) => (
                <img
                  key={index}
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={() => openModal(index)}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/64x64/3B82F6/FFD700?text=${encodeURIComponent(item.title)}`;
                  }}
                />
              ))}
              {designer.portfolio.length > 4 && (
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-xs font-medium cursor-pointer hover:bg-purple-200 transition-colors">
                  +{designer.portfolio.length - 4}
                </div>
              )}
            </div>
          </div>

          {/* View Details Button */}
          <Link
            to={`/designer/${designer.id}`}
            className="mt-4 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>View Details</span>
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div onClick={(e) => e.stopPropagation()}>
              <img
                src={designer.portfolio[currentImageIndex].image}
                alt={designer.portfolio[currentImageIndex].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/800x600/3B82F6/FFD700?text=${encodeURIComponent(designer.portfolio[currentImageIndex].title)}`;
                }}
              />
              
              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-1">
                  {designer.portfolio[currentImageIndex].title}
                </h3>
                <p className="text-sm text-gray-200">
                  {designer.portfolio[currentImageIndex].description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-300">
                    {currentImageIndex + 1} of {designer.portfolio.length}
                  </span>
                  <span className="text-xs text-purple-300">
                    {designer.portfolio[currentImageIndex].category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DesignerCard; 