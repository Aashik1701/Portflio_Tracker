// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  LineChart,
  Settings,
  Users,
  Wallet,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import PropTypes from 'prop-types';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const navItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { title: 'Portfolio', icon: <Wallet size={20} />, path: '/portfolio' },
    { title: 'Analytics', icon: <LineChart size={20} />, path: '/analytics' },
    { title: 'Community', icon: <Users size={20} />, path: '/community' },
    { title: 'Settings', icon: <Settings size={20} />, path: '/settings' }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`h-screen bg-white border-r border-gray-200 fixed left-0 top-0 transition-all duration-300 ease-in-out z-50 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-100"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Logo */}
      <div className="flex items-center h-16 px-4">
        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <span className={`ml-2 font-bold text-xl transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
          Portfolio Tracker
        </span>
      </div>

      {/* Navigation Items */}
      <nav className="mt-8">
        {navItems.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className={`flex items-center h-12 px-4 ${isActiveRoute(item.path) ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
 <span className="flex items-center">
              {item.icon}
            </span>
            <span className={`ml-3 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
              {item.title}
            </span>
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <button className={`flex items-center text-gray-600 hover:text-gray-900 ${isCollapsed ? 'justify-center' : ''}`}>
          <LogOut size={20} />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};
Sidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  setIsCollapsed: PropTypes.func.isRequired,
};

export default Sidebar;