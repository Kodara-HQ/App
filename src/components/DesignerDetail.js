import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Phone, Mail, Edit, Trash2, Calendar, Award, Clock } from 'lucide-react';
import { useDesigners } from '../context/DesignerContext';

const DesignerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { designers, deleteDesigner } = useDesigners();
  
  const designer = designers.find(d => d.id === parseInt(id));

  if (!designer) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Designer not found</h2>
        <p className="text-gray-600 mb-6">The designer you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Back to Designers
        </Link>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
      );
    }

    return stars;
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this designer?')) {
      deleteDesigner(designer.id);
      navigate('/');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Designers
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary-100 to-primary-200">
          <img
            src={designer.image}
            alt={designer.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&h=400&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{designer.name}</h1>
            <p className="text-xl opacity-90">{designer.specialty}</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Rating and Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              {renderStars(designer.rating)}
              <span className="text-lg font-semibold text-gray-900">({designer.rating})</span>
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/edit/${designer.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              
              <div className="flex items-center text-gray-700">
                <MapPin className="h-5 w-5 mr-3 text-primary-600" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-gray-600">{designer.location}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-700">
                <Phone className="h-5 w-5 mr-3 text-primary-600" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-gray-600">{designer.phone}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-700">
                <Mail className="h-5 w-5 mr-3 text-primary-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-600">{designer.email}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-700">
                <Calendar className="h-5 w-5 mr-3 text-primary-600" />
                <div>
                  <p className="font-medium">Experience</p>
                  <p className="text-sm text-gray-600">{designer.experience}</p>
                </div>
              </div>

              {designer.hours && (
                <div className="flex items-center text-gray-700">
                  <Clock className="h-5 w-5 mr-3 text-primary-600" />
                  <div>
                    <p className="font-medium">Working Hours</p>
                    <p className="text-sm text-gray-600">{designer.hours}</p>
                    {designer.workingHours && (
                      <p className="text-xs text-gray-500">{designer.workingHours}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h3>
              <div className="space-y-2">
                {designer.services.map((service, index) => (
                  <div key={index} className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-primary-600" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
            <p className="text-gray-700 leading-relaxed">{designer.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`tel:${designer.phone}`}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Call Now</span>
            </a>
            <a
              href={`mailto:${designer.email}`}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <Mail className="h-5 w-5" />
              <span>Send Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerDetail; 