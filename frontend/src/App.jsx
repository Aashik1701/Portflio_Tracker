// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Portfolio from './pages/Portfolio';
const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <PortfolioProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
          <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} min-h-screen`}>
            <Navbar isCollapsed={isSidebarCollapsed} />
            {/* Main content */}
            <div className="p-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/portfolio" element={<Portfolio />} />
                {/* Add more routes as needed */}
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </PortfolioProvider>
  );
};

export default App;