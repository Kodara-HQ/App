import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Clock, Edit, Trash2, ArrowLeft, Calendar, Award } from 'lucide-react';
import { useDesigners } from '../context/DesignerContext';

const DesignerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { designers, deleteDesigner } = useDesigners();
  
  const designer = designers.find(d => d.id === parseInt(id));

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current star-modern" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-5 w-5 text-yellow-400 fill-current star-modern" style={{ clipPath: 'inset(0 50% 0 0)' }} />
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
      deleteDesigner(parseInt(id));
      navigate('/');
    }
  };

  if (!designer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center modern-card p-12">
          <div className="text-gray-400 mb-6">
            <Award className="h-24 w-24 mx-auto animate-pulse-slow" />
          </div>
          <h2 className="text-3xl font-bold text-gray-700 mb-4">Designer Not Found</h2>
          <p className="text-gray-500 mb-8 text-lg">
            The designer you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="btn-modern text-white px-8 py-3 rounded-xl font-medium inline-block transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5 inline mr-2" />
            Back to Designers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      {/* Back Button */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-300 font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Designers</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Section */}
          <div className="modern-card overflow-hidden">
            <div className="relative h-96">
              <img
                src={designer.image}
                alt={designer.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400/f3f4f6/9ca3af?text=Fashion+Designer';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating badges */}
              <div className="absolute top-6 left-6 flex flex-col space-y-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {designer.experience} Experience
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-bold text-gray-800">{designer.rating}</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">{designer.name}</h1>
                  <p className="text-2xl text-purple-600 font-semibold">{designer.specialty}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link
                    to={`/edit/${designer.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-6">
                {renderStars(designer.rating)}
                <span className="text-lg text-gray-600">({designer.rating} rating)</span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">About</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{designer.description}</p>
              </div>

              {/* Services */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Services Offered</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {designer.services.map((service, index) => (
                    <div
                      key={index}
                      className="bg-purple-50 border border-purple-200 rounded-xl px-4 py-3 flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="modern-card p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                <Phone className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-800">{designer.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-xl">
                <Mail className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-800">{designer.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                <MapPin className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium text-gray-800">{designer.location}</p>
                </div>
              </div>

              {designer.workingHours && (
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                  <Clock className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600">Working Hours</p>
                    <p className="font-medium text-gray-800">{designer.workingHours}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="modern-card p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                <Phone className="h-4 w-4 inline mr-2" />
                Call Now
              </button>
              
              <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                <Mail className="h-4 w-4 inline mr-2" />
                Send Email
              </button>
              
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                <Calendar className="h-4 w-4 inline mr-2" />
                Book Appointment
              </button>
            </div>
          </div>

          {/* Share */}
          <div className="modern-card p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Share Designer</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-300">
                Facebook
              </button>
              <button className="bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-lg font-medium transition-colors duration-300">
                Twitter
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors duration-300">
                WhatsApp
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors duration-300">
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerDetail; 