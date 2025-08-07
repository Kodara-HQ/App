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
          <div className="App">
            <Header />
            <main className="container mx-auto px-4 py-8">
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
        </Router>
      </DesignerProvider>
    </AuthProvider>
  );
}

export default App; 