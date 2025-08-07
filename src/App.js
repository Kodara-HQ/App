import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DesignerProvider } from './context/DesignerContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import DesignerList from './components/DesignerList';
import DesignerDetail from './components/DesignerDetail';
import AddDesigner from './components/AddDesigner';
import EditDesigner from './components/EditDesigner';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import InstallPrompt from './components/InstallPrompt';

function App() {
  return (
    <AuthProvider>
      <DesignerProvider>
        <Router>
          <div className="App relative min-h-screen">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src="/images/dashboard.jpg" 
                alt="Fashion Designer Dashboard" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 via-purple-700/30 to-purple-900/40"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <Header />
              <main>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  
                  {/* Protected Routes */}
                  <Route path="/" element={
                    <ProtectedRoute>
                      <DesignerList />
                    </ProtectedRoute>
                  } />
                  <Route path="/designer/:id" element={
                    <ProtectedRoute>
                      <DesignerDetail />
                    </ProtectedRoute>
                  } />
                  <Route path="/add" element={
                    <ProtectedRoute>
                      <AddDesigner />
                    </ProtectedRoute>
                  } />
                  <Route path="/edit/:id" element={
                    <ProtectedRoute>
                      <EditDesigner />
                    </ProtectedRoute>
                  } />
                  
                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <InstallPrompt />
            </div>
          </div>
        </Router>
      </DesignerProvider>
    </AuthProvider>
  );
}

export default App; 