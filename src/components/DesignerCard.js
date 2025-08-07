import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Scissors } from 'lucide-react';

const DesignerCard = ({ designer }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />
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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Designer Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200">
        <img
          src={designer.image}
          alt={designer.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=400&fit=crop';
          }}
        />
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-2">
          <Scissors className="h-5 w-5 text-primary-600" />
        </div>
      </div>

      {/* Designer Info */}
      <div className="p-6">
        {/* Name and Rating */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {designer.name}
            </h3>
            <p className="text-primary-600 font-medium">{designer.specialty}</p>
          </div>
          <div className="flex items-center space-x-1">
            {renderStars(designer.rating)}
            <span className="text-sm text-gray-600 ml-1">({designer.rating})</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{designer.location}</span>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <span className="inline-block bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {designer.experience} experience
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {designer.description}
        </p>

        {/* Services */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Services:</h4>
          <div className="flex flex-wrap gap-1">
            {designer.services.slice(0, 3).map((service, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {service}
              </span>
            ))}
            {designer.services.length > 3 && (
              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                +{designer.services.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            <span>{designer.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            <span>{designer.email}</span>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/designer/${designer.id}`}
          className="block w-full bg-primary-500 hover:bg-primary-600 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DesignerCard; 