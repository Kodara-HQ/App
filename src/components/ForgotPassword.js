import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Scissors } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('');
    }
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if email exists in our users
      const users = JSON.parse(localStorage.getItem('sunyaniUsers') || '[]');
      const userExists = users.find(u => u.email === email);
      
      if (userExists) {
        setIsSubmitted(true);
      } else {
        // For demo purposes, we'll show success even if email doesn't exist
        // In a real app, you wouldn't reveal if an email exists or not
        setIsSubmitted(true);
      }
    } catch (error) {
      setEmailError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/login.jpg" 
            alt="Fashion Designer Login" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-300/20 via-orange-400/15 to-purple-800/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-md w-full space-y-8">
          {/* Success Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-2xl">Check Your Email</h2>
            <p className="text-white/90 text-lg drop-shadow-lg">
              We've sent password reset instructions to your email address.
            </p>
          </div>

          {/* Success Message */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="mb-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Reset Link Sent!</h3>
              <p className="text-white/90 mb-4">
                If an account with <strong className="text-white">{email}</strong> exists, you will receive password reset instructions shortly.
              </p>
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 text-left">
                <h4 className="font-semibold text-white mb-2">What to do next:</h4>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Check your email inbox (and spam folder)</li>
                  <li>• Click the reset link in the email</li>
                  <li>• Create a new password</li>
                  <li>• Sign in with your new password</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
              >
                Try Another Email
              </button>
              <Link
                to="/login"
                className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 inline-block text-center"
              >
                <ArrowLeft className="h-5 w-5 inline mr-2" />
                Back to Sign In
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
            <p className="text-white/90 text-sm mb-4">
              If you're still having trouble, contact our support team.
            </p>
            <div className="space-y-2 text-base">
              <p className="text-white/90">
                <strong>Email:</strong> mycodedspace@gmail.com
              </p>
              <p className="text-white/90">
                <strong>Phone:</strong> +233 24 882 1389
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/login.jpg" 
          alt="Fashion Designer Login" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-300/20 via-orange-400/15 to-purple-800/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brown-800 rounded-full mb-4">
            <Scissors className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 drop-shadow-2xl">FASHION DESIGNERS</h1>
          <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-2xl">Forgot Password?</h2>
          <p className="text-white/90 text-lg drop-shadow-lg">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 ${
                    emailError ? 'border-red-400' : ''
                  }`}
                  placeholder="Enter your email address"
                  disabled={isLoading}
                />
              </div>
              {emailError && (
                <p className="text-red-300 text-sm mt-2">{emailError}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sending Reset Link...</span>
                </div>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/70">Remember your password?</span>
              </div>
            </div>
          </div>

          {/* Back to Login */}
          <Link
            to="/login"
            className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Sign In</span>
          </Link>
        </div>

        {/* Help Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
          <p className="text-white/90 text-sm">
            If you're having trouble accessing your account, our support team is here to help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 