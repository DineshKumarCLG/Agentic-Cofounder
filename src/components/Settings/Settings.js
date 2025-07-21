import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Settings.css';

const Settings = ({ onBack, isSidebarOpen }) => {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    theme: 'dark',
    language: 'english',
    notifications: true,
    autoSave: true,
    
    // AI Settings
    model: 'gpt-4',
    creativity: 'balanced',
    responseLength: 'medium',
    
    // Privacy Settings
    dataCollection: true,
    analytics: false,
    crashReports: true,
    
    // Account Settings
    name: 'USER',
    email: 'user@example.com',
    subscription: 'Pro',
    
    // Advanced Settings
    debugMode: false,
    betaFeatures: false,
    apiLogging: false
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Icon components as SVGs
  const GeneralIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-6.5L17 10m-10 4l-3.5 3.5M20.5 20.5L17 17m-10-4l-3.5-3.5"/>
    </svg>
  );

  const AIIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
      <path d="M8 12h8m-4-4v8"/>
    </svg>
  );

  const PrivacyIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <circle cx="12" cy="16" r="1"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );

  const AccountIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const AdvancedIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  );

  const settingSections = [
    { id: 'general', name: 'General', icon: <GeneralIcon /> },
    { id: 'ai', name: 'AI Model', icon: <AIIcon /> },
    { id: 'privacy', name: 'Privacy', icon: <PrivacyIcon /> },
    { id: 'account', name: 'Account', icon: <AccountIcon /> },
    { id: 'advanced', name: 'Advanced', icon: <AdvancedIcon /> }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="settings-content">
            <h3>General Settings</h3>
            
            <div className="setting-group">
              <label className="setting-label">Theme</label>
              <select 
                value={settings.theme} 
                onChange={(e) => handleSettingChange('theme', e.target.value)}
                className="setting-select glass-morphism"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div className="setting-group">
              <label className="setting-label">Language</label>
              <select 
                value={settings.language} 
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="setting-select glass-morphism"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
              </select>
            </div>

            <div className="setting-group">
              <div className="setting-toggle">
                <label className="setting-label">Enable Notifications</label>
                <button 
                  className={`toggle-btn ${settings.notifications ? 'active' : ''}`}
                  onClick={() => handleSettingChange('notifications', !settings.notifications)}
                >
                  <div className="toggle-slider"></div>
                </button>
              </div>
            </div>

            <div className="setting-group">
              <div className="setting-toggle">
                <label className="setting-label">Auto-save Projects</label>
                <button 
                  className={`toggle-btn ${settings.autoSave ? 'active' : ''}`}
                  onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
                >
                  <div className="toggle-slider"></div>
                </button>
              </div>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="settings-content">
            <h3>AI Model Settings</h3>
            
            <div className="setting-group">
              <label className="setting-label">AI Model</label>
              <select 
                value={settings.model} 
                onChange={(e) => handleSettingChange('model', e.target.value)}
                className="setting-select glass-morphism"
              >
                <option value="gpt-4">GPT-4 (Recommended)</option>
                <option value="gpt-3.5">GPT-3.5 Turbo</option>
                <option value="claude">Claude</option>
              </select>
              <span className="setting-description">Choose the AI model for generating content</span>
            </div>

            <div className="setting-group">
              <label className="setting-label">Creativity Level</label>
              <div className="slider-container">
                <input 
                  type="range" 
                  min="0" 
                  max="2" 
                  step="1"
                  value={settings.creativity === 'conservative' ? 0 : settings.creativity === 'balanced' ? 1 : 2}
                  onChange={(e) => {
                    const values = ['conservative', 'balanced', 'creative'];
                    handleSettingChange('creativity', values[parseInt(e.target.value)]);
                  }}
                  className="setting-slider"
                />
                <div className="slider-labels">
                  <span>Conservative</span>
                  <span>Balanced</span>
                  <span>Creative</span>
                </div>
              </div>
            </div>

            <div className="setting-group">
              <label className="setting-label">Response Length</label>
              <select 
                value={settings.responseLength} 
                onChange={(e) => handleSettingChange('responseLength', e.target.value)}
                className="setting-select glass-morphism"
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="settings-content">
            <h3>Privacy & Data</h3>
            
            <div className="setting-group">
              <div className="setting-toggle">
                <label className="setting-label">Data Collection</label>
                <button 
                  className={`toggle-btn ${settings.dataCollection ? 'active' : ''}`}
                  onClick={() => handleSettingChange('dataCollection', !settings.dataCollection)}
                >
                  <div className="toggle-slider"></div>
                </button>
              </div>
              <span className="setting-description">Allow collection of usage data to improve the service</span>
            </div>

            <div className="setting-group">
              <div className="setting-toggle">
                <label className="setting-label">Analytics</label>
                <button 
                  className={`toggle-btn ${settings.analytics ? 'active' : ''}`}
                  onClick={() => handleSettingChange('analytics', !settings.analytics)}
                >
                  <div className="toggle-slider"></div>
                </button>
              </div>
              <span className="setting-description">Share anonymous analytics data</span>
            </div>

            <div className="setting-group">
              <div className="setting-toggle">
                <label className="setting-label">Crash Reports</label>
                <button 
                  className={`toggle-btn ${settings.crashReports ? 'active' : ''}`}
                  onClick={() => handleSettingChange('crashReports', !settings.crashReports)}
                >
                  <div className="toggle-slider"></div>
                </button>
              </div>
              <span className="setting-description">Automatically send crash reports to help fix issues</span>
            </div>
          </div>
        );

      case 'account':
        return (
          <div className="settings-content">
            <h3>Account Settings</h3>
            
            <div className="setting-group">
              <label className="setting-label">Display Name</label>
              <input 
                type="text" 
                value={settings.name}
                onChange={(e) => handleSettingChange('name', e.target.value)}
                className="setting-input glass-morphism"
                placeholder="Enter your name"
              />
            </div>

            <div className="setting-group">
              <label className="setting-label">Email Address</label>
              <input 
                type="email" 
                value={settings.email}
                onChange={(e) => handleSettingChange('email', e.target.value)}
                className="setting-input glass-morphism"
                placeholder="Enter your email"
              />
            </div>

            <div className="setting-group">
              <label className="setting-label">Subscription Plan</label>
              <div className="subscription-info glass-morphism">
                <div className="plan-details">
                  <span className="plan-name">{settings.subscription} Plan</span>
                  <span className="plan-status">Active</span>
                </div>
                <button className="upgrade-btn glass-morphism">Manage Plan</button>
              </div>
            </div>

            <div className="setting-group">
              <button className="danger-btn glass-morphism">
                Delete Account
              </button>
              <span className="setting-description">Permanently delete your account and all data</span>
            </div>
          </div>
        );

      case 'advanced':
        return (
          <div className="settings-content">
            <h3>Advanced Settings</h3>
            
            <div className="setting-group">
              <div className="setting-toggle">
                <label className="setting-label">Debug Mode</label>
                <button 
                  className={`toggle-btn ${settings.debugMode ? 'active' : ''}`}
                  onClick={() => handleSettingChange('debugMode', !settings.debugMode)}
                >
                  <div className="toggle-slider"></div>
                </button>
              </div>
              <span className="setting-description">Enable debug logging and error details</span>
            </div>

            <div className="setting-group">
              <div className="setting-toggle">
                <label className="setting-label">Beta Features</label>
                <button 
                  className={`toggle-btn ${settings.betaFeatures ? 'active' : ''}`}
                  onClick={() => handleSettingChange('betaFeatures', !settings.betaFeatures)}
                >
                  <div className="toggle-slider"></div>
                </button>
              </div>
              <span className="setting-description">Access experimental features (may be unstable)</span>
            </div>

            <div className="setting-group">
              <div className="setting-toggle">
                <label className="setting-label">API Logging</label>
                <button 
                  className={`toggle-btn ${settings.apiLogging ? 'active' : ''}`}
                  onClick={() => handleSettingChange('apiLogging', !settings.apiLogging)}
                >
                  <div className="toggle-slider"></div>
                </button>
              </div>
              <span className="setting-description">Log API requests for debugging</span>
            </div>

            <div className="setting-group">
              <button className="reset-btn glass-morphism">
                Reset to Defaults
              </button>
              <span className="setting-description">Reset all settings to default values</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div 
      className={`settings-page ${!isSidebarOpen ? 'sidebar-closed' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div 
        className="settings-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <button 
          className="back-btn glass-morphism"
          onClick={onBack}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back</span>
        </button>
        
        <div className="header-title">
          <h1>Settings</h1>
          <p>Customize your workspace and preferences</p>
        </div>
      </motion.div>

      <div className="settings-layout">
        {/* Sidebar Navigation */}
        <motion.div 
          className="settings-sidebar glass-morphism"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {settingSections.map((section) => (
            <button
              key={section.id}
              className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="nav-icon">{section.icon}</span>
              <span className="nav-text">{section.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="settings-main glass-morphism"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          key={activeSection}
        >
          {renderSectionContent()}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;
