import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Scissors } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: 'bensidella27@gmail.com',
    password: '********',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    // Basic validation
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/');
      } else {
        setErrors({ general: result.error || 'Login failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: error.message || 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section - Login Form */}
      <div className="flex-1 bg-cream-50 flex items-center justify-center p-4 sm:p-8 order-2 lg:order-1">
        <div className="w-full max-w-md">
          {/* Branding */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-brown-800 rounded-full mb-3 sm:mb-4">
              <Scissors className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">FASHION DESIGNERS</h1>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-lg p-6 sm:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Sign In</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-brown-600 hover:text-brown-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>

              {/* General Error */}
              {errors.general && (
                <p className="text-red-500 text-sm text-center">{errors.general}</p>
              )}
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or continue with</span>
                </div>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <span className="text-lg font-bold text-blue-600">G</span>
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <span className="text-lg font-bold text-blue-600">f</span>
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <span className="text-lg font-bold">🍎</span>
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-brown-600 hover:text-brown-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Promotional Image */}
      <div className="flex-1 relative overflow-hidden h-64 lg:h-auto order-1 lg:order-2">
        {/* Background Image */}
        <img 
          src="/images/login1.jpg" 
          alt="Fashion Designer" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark Overlay for Better Text Visibility */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-300/20 via-orange-400/15 to-purple-800/30"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full p-4 sm:p-8 text-center">
          {/* Text Content */}
          <div className="max-w-md">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl">
              Let's Get You Styled!
            </h2>
            <p className="text-white text-lg sm:text-xl drop-shadow-lg font-medium">
              Sign in or create an account to explore Sunyani's finest fashion designers.
            </p>
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 sm:bottom-8 flex space-x-2">
            <div className="w-2 h-2 bg-white/70 rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white/70 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 