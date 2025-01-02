import { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    general: {
      defaultCurrency: 'USD',
      timezone: 'UTC-5',
      language: 'en',
      theme: 'light'
    },
    portfolio: {
      autoRefreshInterval: 5,
      defaultViewMode: 'table',
      showEmptyPositions: false,
      roundNumbers: true,
      calculateGains: 'daily'
    },
    alerts: {
      priceChangeThreshold: 5,
      volumeChangeThreshold: 20,
      enableEmailAlerts: true,
      enablePushNotifications: true,
      dailyDigest: true
    },
    security: {
      enableTwoFactor: false,
      sessionTimeout: 30,
      loginNotifications: true,
      trustedDevices: []
    }
  });

  const [activeSection, setActiveSection] = useState('general');

  const handleUpdateSetting = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Application Settings</h2>
        <p className="text-sm text-gray-600">Configure your portfolio tracking preferences</p>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 border-r border-gray-200">
          {Object.keys(settings).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-full px-6 py-3 text-left ${
                activeSection === section
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Settings */}
            <div className={activeSection === 'general' ? 'block' : 'hidden'}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Default Currency</label>
                  <select
                    value={settings.general.defaultCurrency}
                    onChange={(e) => handleUpdateSetting('general', 'defaultCurrency', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Theme</label>
                  <select
                    value={settings.general.theme}
                    onChange={(e) => handleUpdateSetting('general', 'theme', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System Default</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Portfolio Settings */}
            <div className={activeSection === 'portfolio' ? 'block' : 'hidden'}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Auto-Refresh Interval (minutes)</label>
                  <input
                    type="number"
                    value={settings.portfolio.autoRefreshInterval}
                    onChange={(e) => handleUpdateSetting('portfolio', 'autoRefreshInterval', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Show Empty Positions</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.portfolio.showEmptyPositions}
                      onChange={(e) => handleUpdateSetting('portfolio', 'showEmptyPositions', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Alerts Settings */}
            <div className={activeSection === 'alerts' ? 'block' : 'hidden'}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price Change Threshold (%)</label>
                  <input
                    type="number"
                    value={settings.alerts.priceChangeThreshold}
                    onChange={(e) => handleUpdateSetting('alerts', 'priceChangeThreshold', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Enable Email Alerts</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.alerts.enableEmailAlerts}
                      onChange={(e) => handleUpdateSetting('alerts', 'enableEmailAlerts', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className={activeSection === 'security' ? 'block' : 'hidden'}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Enable Two-Factor Authentication</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.enableTwoFactor}
                      onChange={(e) => handleUpdateSetting('security', 'enableTwoFactor', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleUpdateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;