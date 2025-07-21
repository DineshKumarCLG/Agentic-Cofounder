import React, { useState } from 'react';
import './Sidebar.css';
import AILogo from '../../assets/icons/AILogo.png';
import ChatIcon from '../../assets/icons/Chat.png';
import LibraryIcon from '../../assets/icons/Library.png';
import SettingsIcon from '../../assets/icons/Settings.png';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [expandedSection, setExpandedSection] = useState('chats');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className={`sidebar glass-effect ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon glass-effect">
            <img src={AILogo} alt="AI Logo" className="logo-image" />
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <div 
            className={`nav-header ${expandedSection === 'chats' ? 'active' : ''}`}
            onClick={() => toggleSection('chats')}
          >
            <img src={ChatIcon} alt="Chats" className="nav-icon-img" />
            <span className="nav-title">Chats</span>
            <span className={`nav-arrow ${expandedSection === 'chats' ? 'expanded' : ''}`}>›</span>
          </div>
          <div className={`nav-submenu ${expandedSection === 'chats' ? 'expanded' : ''}`}>
            <div className="nav-subitem">
              <span className="subitem-text">AI-Accounting app for Startups</span>
            </div>
            <div className="nav-subitem active">
              <span className="subitem-text">Personal Finance App powered by AI</span>
              <span className="subitem-menu">⋯</span>
            </div>
          </div>
        </div>

        <div className="nav-section">
          <div 
            className={`nav-header ${expandedSection === 'library' ? 'active' : ''}`}
            onClick={() => toggleSection('library')}
          >
            <img src={LibraryIcon} alt="Library" className="nav-icon-img" />
            <span className="nav-title">Pitch Deck library</span>
          </div>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="nav-header">
          <img src={SettingsIcon} alt="Settings" className="nav-icon-img" />
          <span className="nav-title">Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
