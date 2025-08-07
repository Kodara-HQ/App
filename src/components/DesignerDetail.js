import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Clock, Edit, Trash2, ArrowLeft, Calendar, Award, Share2, Copy, Check, MessageCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDesigners } from '../context/DesignerContext';

const DesignerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { designers, deleteDesigner } = useDesigners();
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const designer = designers.find(d => d.id === parseInt(id));

  // Quick Actions Handlers
  const handleCallNow = () => {
    if (designer.phone) {
      // Remove any non-numeric characters and add country code if needed
      const cleanPhone = designer.phone.replace(/\D/g, '');
      const phoneNumber = cleanPhone.startsWith('233') ? cleanPhone : `233${cleanPhone}`;
      window.open(`tel:+${phoneNumber}`, '_self');
    }
  };

  const handleSendEmail = () => {
    if (designer.email) {
      const subject = encodeURIComponent(`Inquiry about ${designer.name} - Sunyani Fashion Directory`);
      const body = encodeURIComponent(`Hello ${designer.name},\n\nI'm interested in your fashion design services. Could you please provide more information about your services and availability?\n\nThank you!`);
      window.open(`mailto:${designer.email}?subject=${subject}&body=${body}`, '_self');
    }
  };

  const handleBookAppointment = () => {
    if (designer.phone) {
      const message = encodeURIComponent(`Hello ${designer.name}, I would like to book an appointment. Please let me know your available times.`);
      const cleanPhone = designer.phone.replace(/\D/g, '');
      const phoneNumber = cleanPhone.startsWith('233') ? cleanPhone : `233${cleanPhone}`;
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    }
  };

  // Share Handlers
  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${designer.name} - Amazing fashion designer in Sunyani!`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${designer.name} - Amazing fashion designer in Sunyani!`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${designer.name} - Amazing fashion designer in Sunyani! ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // Show success feedback (you could add a toast notification here)
      alert('Link copied to clipboard!');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link copied to clipboard!');
    }
  };

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

  const openModal = (index) => {
    console.log('Opening modal for index:', index);
    console.log('Portfolio:', designer.portfolio);
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

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
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
                      className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio/Works */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Portfolio & Works</h3>
                {designer.portfolio && designer.portfolio.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {designer.portfolio.map((work, index) => (
                      <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-transparent hover:border-purple-300">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={work.image}
                            alt={work.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                            onClick={() => openModal(index)}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Fashion+Work';
                            }}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h4 className="font-bold text-lg mb-1">{work.title}</h4>
                          <p className="text-sm opacity-90">{work.description}</p>
                          {work.category && (
                            <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium mt-2">
                              {work.category}
                            </span>
                          )}
                        </div>
                        {/* Click indicator */}
                        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        {/* Click hint */}
                        <div className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Click to view
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <div className="text-gray-400 mb-4">
                      <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-600 mb-2">No Portfolio Available</h4>
                    <p className="text-gray-500">This designer hasn't uploaded their portfolio yet.</p>
                  </div>
                )}
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
                <div className="flex items-center space-x-3 p-3 bg-teal-50 rounded-xl">
                  <Clock className="h-5 w-5 text-teal-500" />
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
              <button onClick={handleCallNow} className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <Phone className="h-4 w-4 inline mr-2" />
                Call Now
              </button>
              
              <button onClick={handleSendEmail} className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Send Email
              </button>
              
              <button onClick={handleBookAppointment} className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <Calendar className="h-4 w-4 inline mr-2" />
                Book Appointment
              </button>
            </div>
          </div>

          {/* Share */}
          <div className="modern-card p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Share Designer</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button onClick={handleShareFacebook} className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                Facebook
              </button>
              <button onClick={handleShareTwitter} className="bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                Twitter
              </button>
              <button onClick={handleShareWhatsApp} className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                WhatsApp
              </button>
              <button onClick={handleCopyLink} className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2">
                <Copy className="h-4 w-4" />
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && designer.portfolio && designer.portfolio.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div
            className="relative w-full max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={closeModal}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <X className="h-6 w-6" />
            </button>
            <button
              className="absolute top-1/2 left-4 -translate-y-1/2 text-white hover:text-gray-300"
              onClick={prevImage}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <button
              className="absolute top-1/2 right-4 -translate-y-1/2 text-white hover:text-gray-300"
              onClick={nextImage}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <ChevronRight className="h-10 w-10" />
            </button>
            <img
              src={designer.portfolio[currentImageIndex].image}
              alt={designer.portfolio[currentImageIndex].title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignerDetail; 