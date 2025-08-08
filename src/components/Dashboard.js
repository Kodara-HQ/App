import React from 'react';
import { useDesigners } from '../context/DesignerContext';
import { Users, Star, MapPin, TrendingUp, Award, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { designers } = useDesigners();

  // Calculate statistics
  const totalDesigners = designers.length;
  const topRatedDesigners = designers.filter(d => d.rating >= 4.5).length;
  const averageRating = designers.length > 0 
    ? (designers.reduce((sum, d) => sum + d.rating, 0) / designers.length).toFixed(1)
    : 0;
  const specialties = [...new Set(designers.map(d => d.specialty))];
  const totalSpecialties = specialties.length;

  const stats = [
    {
      title: 'Total Designers',
      value: totalDesigners,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Top Rated',
      value: topRatedDesigners,
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Avg Rating',
      value: averageRating,
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Specialties',
      value: totalSpecialties,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  const recentDesigners = designers.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to Sunyani Fashion</h1>
        <p className="text-purple-100">Discover the finest fashion designers in Sunyani</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-lg p-6 border border-gray-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Designers */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Designers</h2>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          {recentDesigners.map((designer, index) => (
            <div key={designer.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {designer.firstName.charAt(0)}{designer.lastName.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">
                  {designer.firstName} {designer.lastName}
                </h3>
                <p className="text-sm text-gray-500">{designer.specialty}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900">{designer.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specialties Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Specialties Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {specialties.map((specialty, index) => {
            const count = designers.filter(d => d.specialty === specialty).length;
            return (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{specialty}</h3>
                    <p className="text-sm text-gray-500">{count} designers</p>
                  </div>
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 