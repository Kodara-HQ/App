import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import DesignerList from './components/DesignerList';
import DesignerDetail from './components/DesignerDetail';
import AddDesigner from './components/AddDesigner';
import InstallPrompt from './components/InstallPrompt';
import { DesignerProvider } from './context/DesignerContext';

function App() {
  return (
    <DesignerProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<DesignerList />} />
              <Route path="/designer/:id" element={<DesignerDetail />} />
              <Route path="/add" element={<AddDesigner />} />
            </Routes>
          </main>
          <InstallPrompt />
        </div>
      </Router>
    </DesignerProvider>
  );
}

export default App; 