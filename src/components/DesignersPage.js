import React from 'react';
import DesignerList from './DesignerList';

const DesignersPage = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Fashion Designers</h1>
        <p className="text-gray-600">Discover and connect with talented fashion designers in Sunyani</p>
      </div>
      <DesignerList />
    </div>
  );
};

export default DesignersPage; 