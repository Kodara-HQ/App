import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, Mail, ArrowRight } from 'lucide-react';

const DesignerCard = ({ designer }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current star-modern" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 text-yellow-400 fill-current star-modern" style={{ clipPath: 'inset(0 50% 0 0)' }} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="modern-card card-hover group overflow-hidden">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={designer.image}
          alt={designer.name}
          className="w-full h-full object-cover image-hover transition-all duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Fashion+Designer';
          }}
        />
        
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span className="text-sm font-bold text-gray-800">{designer.rating}</span>
        </div>

        {/* Experience badge */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {designer.experience}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
            {designer.name}
          </h3>
          <p className="text-purple-600 font-semibold text-sm uppercase tracking-wide">
            {designer.specialty}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-4">
          {renderStars(designer.rating)}
          <span className="text-sm text-gray-600 ml-2">({designer.rating})</span>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2 mb-3 text-gray-600">
          <MapPin className="h-4 w-4 text-purple-500" />
          <span className="text-sm">{designer.location}</span>
        </div>

        {/* Working Hours */}
        {designer.workingHours && (
          <div className="flex items-center space-x-2 mb-4 text-gray-600">
            <Clock className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">{designer.workingHours}</span>
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <Phone className="h-4 w-4 text-blue-500" />
            <span className="text-sm">{designer.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Mail className="h-4 w-4 text-red-500" />
            <span className="text-sm truncate">{designer.email}</span>
          </div>
        </div>

        {/* Services Preview */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Services:</h4>
          <div className="flex flex-wrap gap-2">
            {designer.services.slice(0, 3).map((service, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium"
              >
                {service}
              </span>
            ))}
            {designer.services.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                +{designer.services.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/designer/${designer.id}`}
          className="btn-modern w-full text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 group-hover:shadow-lg transition-all duration-300"
        >
          <span>View Details</span>
          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default DesignerCard; 