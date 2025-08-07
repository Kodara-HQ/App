import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="max-w-md w-full space-y-8">
          {/* Success Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold gradient-text mb-2">Check Your Email</h2>
            <p className="text-gray-600 text-lg">
              We've sent password reset instructions to your email address.
            </p>
          </div>

          {/* Success Message */}
          <div className="modern-card p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Reset Link Sent!</h3>
              <p className="text-gray-600 mb-4">
                If an account with <strong>{email}</strong> exists, you will receive password reset instructions shortly.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left">
                <h4 className="font-semibold text-blue-800 mb-2">What to do next:</h4>
                <ul className="text-blue-700 text-sm space-y-1">
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
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 inline-block"
              >
                <ArrowLeft className="h-5 w-5 inline mr-2" />
                Back to Sign In
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="modern-card p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Need Help?</h3>
            <p className="text-gray-600 text-sm mb-4">
              If you're still having trouble, contact our support team.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">
                <strong>Email:</strong> mycodedspace@gmail.com
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> +233 24 882 1389
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Forgot Password?</h2>
          <p className="text-gray-600 text-lg">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        {/* Form */}
        <div className="modern-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                <Mail className="h-5 w-5 inline mr-2 text-purple-500" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={`input-modern w-full px-4 py-4 text-lg rounded-xl focus:outline-none focus-modern ${
                  emailError ? 'border-red-500' : ''
                }`}
                placeholder="Enter your email address"
                disabled={isLoading}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-2">{emailError}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-modern w-full text-white py-4 rounded-xl font-medium text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
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
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Remember your password?</span>
              </div>
            </div>
          </div>

          {/* Back to Login */}
          <Link
            to="/login"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-medium text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Sign In</span>
          </Link>
        </div>

        {/* Help Section */}
        <div className="modern-card p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Need Help?</h3>
          <p className="text-gray-600 text-sm">
            If you're having trouble accessing your account, our support team is here to help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 