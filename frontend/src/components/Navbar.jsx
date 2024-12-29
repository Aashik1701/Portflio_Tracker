// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActiveRoute = (path) => {
    return location.pathname === path ? 
      'bg-blue-700 text-white' : 
      'text-gray-300 hover:bg-blue-700 hover:text-white';
  };

  return (
    <nav className="bg-blue-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg 
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span className="ml-2 text-white text-lg font-semibold">
                Portfolio Tracker
              </span>
            </Link>
          </div>
          
          <div className="flex">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActiveRoute('/')}`}
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className={`ml-4 px-3 py-2 rounded-md text-sm font-medium ${isActiveRoute('/profile')}`}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;