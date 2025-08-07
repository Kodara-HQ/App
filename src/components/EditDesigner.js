import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Star, MapPin, Phone, Mail, Clock, Award, Edit } from 'lucide-react';
import { useDesigners } from '../context/DesignerContext';

const EditDesigner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { designers, updateDesigner } = useDesigners();
  
  const designer = designers.find(d => d.id === parseInt(id));
  
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    location: '',
    phone: '',
    email: '',
    experience: '',
    description: '',
    services: [''],
    workingHours: '',
    image: ''
  });

  const [errors, setErrors] = useState({});

  const specialties = [
    'Traditional African Wear',
    'Contemporary Fashion',
    'Bridal & Formal Wear',
    "Men's Fashion",
    "Children's Fashion",
    'Design & Fashion'
  ];

  // Load designer data when component mounts
  useEffect(() => {
    if (designer) {
      setFormData({
        name: designer.name || '',
        specialty: designer.specialty || '',
        location: designer.location || '',
        phone: designer.phone || '',
        email: designer.email || '',
        experience: designer.experience || '',
        description: designer.description || '',
        services: designer.services && designer.services.length > 0 ? designer.services : [''],
        workingHours: designer.workingHours || '',
        image: designer.image || ''
      });
    }
  }, [designer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleServiceChange = (index, value) => {
    const newServices = [...formData.services];
    newServices[index] = value;
    setFormData(prev => ({
      ...prev,
      services: newServices
    }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, '']
    }));
  };

  const removeService = (index) => {
    if (formData.services.length > 1) {
      const newServices = formData.services.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        services: newServices
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.specialty) newErrors.specialty = 'Specialty is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.workingHours.trim()) newErrors.workingHours = 'Working hours are required';

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate services
    const validServices = formData.services.filter(service => service.trim());
    if (validServices.length === 0) {
      newErrors.services = 'At least one service is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const updatedDesigner = {
        ...designer,
        ...formData,
        services: formData.services.filter(service => service.trim()),
        image: formData.image || 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Fashion+Designer'
      };
      
      updateDesigner(updatedDesigner);
      navigate(`/designer/${designer.id}`);
    }
  };

  if (!designer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center modern-card p-12">
          <div className="text-gray-400 mb-6">
            <Edit className="h-24 w-24 mx-auto animate-pulse-slow" />
          </div>
          <h2 className="text-3xl font-bold text-gray-700 mb-4">Designer Not Found</h2>
          <p className="text-gray-500 mb-8 text-lg">
            The designer you're trying to edit doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-modern text-white px-8 py-3 rounded-xl font-medium inline-block transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5 inline mr-2" />
            Back to Designers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(`/designer/${designer.id}`)}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-300 font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Designer Details</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="hero-gradient text-center py-12 px-6 rounded-3xl text-white mb-8">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Edit Designer</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Update the information for {designer.name} in our fashion directory.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="modern-card p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  <Star className="h-5 w-5 inline mr-2 text-purple-500" />
                  Designer Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-modern w-full px-4 py-4 text-lg rounded-xl focus:outline-none focus-modern ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter designer's full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  <Award className="h-5 w-5 inline mr-2 text-purple-500" />
                  Specialty *
                </label>
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className={`input-modern w-full px-4 py-4 text-lg rounded-xl focus:outline-none focus-modern cursor-pointer ${
                    errors.specialty ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select specialty</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
                {errors.specialty && <p className="text-red-500 text-sm mt-2">{errors.specialty}</p>}
              </div>
            </div>

            {/* Location and Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  <MapPin className="h-5 w-5 inline mr-2 text-purple-500" />
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`input-modern w-full px-4 py-4 text-lg rounded-xl focus:outline-none focus-modern ${
                    errors.location ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter location/address"
                />
                {errors.location && <p className="text-red-500 text-sm mt-2">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  <Phone className="h-5 w-5 inline mr-2 text-purple-500" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`input-modern w-full px-4 py-4 text-lg rounded-xl focus:outline-none focus-modern ${
                    errors.phone ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
              </div>
            </div>

            {/* Email and Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  <Mail className="h-5 w-5 inline mr-2 text-purple-500" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-modern w-full px-4 py-4 text-lg rounded-xl focus:outline-none focus-modern ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  <Award className="h-5 w-5 inline mr-2 text-purple-500" />
                  Experience *
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={`input-modern w-full px-4 py-4 text-lg rounded-xl focus:outline-none focus-modern ${
                    errors.experience ? 'border-red-500' : ''
                  }`}
                  placeholder="e.g., 5 years"
                />
                {errors.experience && <p className="text-red-500 text-sm mt-2">{errors.experience}</p>}
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                <Clock className="h-5 w-5 inline mr-2 text-purple-500" />
                Working Hours *
              </label>
              <input
                type="text"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleChange}
                className={`input-modern w-full px-4 py-4 text-lg rounded-xl focus:outline-none focus-modern ${
                  errors.workingHours ? 'border-red-500' : ''
                }`}
                placeholder="e.g., 8am-6pm (Mon-Fri)"
              />
              {errors.workingHours && <p className="text-red-500 text-sm mt-2">{errors.workingHours}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={`input-modern w-full px-4 py-4 text-lg rounded-xl focus:outline-none focus-modern resize-none ${
                  errors.description ? 'border-red-500' : ''
                }`}
                placeholder="Describe the designer's style, expertise, and what makes them unique..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
            </div>

            {/* Services */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Services Offered *
              </label>
              <div className="space-y-3">
                {formData.services.map((service, index) => (
                  <div key={index} className="flex space-x-3">
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => handleServiceChange(index, e.target.value)}
                      className="input-modern flex-1 px-4 py-3 text-lg rounded-xl focus:outline-none focus-modern"
                      placeholder={`Service ${index + 1}`}
                    />
                    {formData.services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl transition-colors duration-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addService}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-3 rounded-xl font-medium transition-colors duration-300 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Service</span>
                </button>
              </div>
              {errors.services && <p className="text-red-500 text-sm mt-2">{errors.services}</p>}
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Image URL (Optional)
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="input-modern w-full px-4 py-4 text-lg rounded-xl focus:outline-none focus-modern"
                placeholder="Enter image URL (optional)"
              />
              <p className="text-gray-500 text-sm mt-2">
                Leave empty to use a default placeholder image
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(`/designer/${designer.id}`)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-modern text-white px-8 py-4 rounded-xl font-medium flex items-center space-x-2 transition-all duration-300 transform hover:scale-105"
              >
                <Save className="h-5 w-5" />
                <span>Update Designer</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDesigner; 