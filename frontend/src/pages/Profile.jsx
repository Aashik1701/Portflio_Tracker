import { useState } from 'react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [profile, setProfile] = useState({
    personal: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      currency: 'USD'
    },
    trading: {
      experienceLevel: 'intermediate',
      preferredExchanges: ['NYSE', 'NASDAQ'],
      defaultOrderType: 'market',
      defaultLotSize: 100
    },
    notifications: {
      priceAlerts: true,
      portfolioSummary: true,
      marketNews: true,
      alertThreshold: 5
    },
    analysis: {
      preferredMetrics: ['PE', 'MarketCap', 'Volume'],
      chartTimeframe: '1D',
      showTechnicalIndicators: true
    }
  });

  const handleUpdateField = (section, field, value) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    alert('Profile settings updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Portfolio Settings</h2>
        <p className="text-sm text-gray-600">Customize your portfolio tracking experience</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {['personal', 'trading', 'notifications', 'analysis'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <form onSubmit={handleSubmit} className="p-6">
        {/* Personal Settings */}
        <div className={activeTab === 'personal' ? 'block' : 'hidden'}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={profile.personal.name}
                onChange={(e) => handleUpdateField('personal', 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={profile.personal.email}
                onChange={(e) => handleUpdateField('personal', 'email', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={profile.personal.phone}
                onChange={(e) => handleUpdateField('personal', 'phone', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Trading Preferences */}
        <div className={activeTab === 'trading' ? 'block' : 'hidden'}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Experience Level</label>
              <select
                value={profile.trading.experienceLevel}
                onChange={(e) => handleUpdateField('trading', 'experienceLevel', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Default Order Type</label>
              <select
                value={profile.trading.defaultOrderType}
                onChange={(e) => handleUpdateField('trading', 'defaultOrderType', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="market">Market Order</option>
                <option value="limit">Limit Order</option>
                <option value="stop">Stop Order</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className={activeTab === 'notifications' ? 'block' : 'hidden'}>
          <div className="space-y-4">
            {Object.entries({
              priceAlerts: 'Price Alerts',
              portfolioSummary: 'Portfolio Summary',
              marketNews: 'Market News'
            }).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.notifications[key]}
                    onChange={(e) => handleUpdateField('notifications', key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Preferences */}
        <div className={activeTab === 'analysis' ? 'block' : 'hidden'}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Chart Timeframe</label>
              <select
                value={profile.analysis.chartTimeframe}
                onChange={(e) => handleUpdateField('analysis', 'chartTimeframe', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="1D">1 Day</option>
                <option value="1W">1 Week</option>
                <option value="1M">1 Month</option>
                <option value="3M">3 Months</option>
                <option value="1Y">1 Year</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Show Technical Indicators</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.analysis.showTechnicalIndicators}
                  onChange={(e) => handleUpdateField('analysis', 'showTechnicalIndicators', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;