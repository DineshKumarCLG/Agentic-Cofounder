import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Sidebar.css';
import AILogo from '../../assets/icons/AILogo.png';
import ChatIcon from '../../assets/icons/Chat.png';
import LibraryIcon from '../../assets/icons/Library.png';
import SettingsIcon from '../../assets/icons/Settings.png';

const Sidebar = ({ 
  isOpen, 
  toggleSidebar, 
  onNavigateToLibrary, 
  onNavigateToSettings,
  currentPage 
}) => {
  const [expandedSection, setExpandedSection] = useState('chats');
  const [activeMenu, setActiveMenu] = useState(null);
  const [chatItems, setChatItems] = useState([
    { id: 1, name: "AI-Accounting app for Startups" },
    { id: 2, name: "Personal Finance App powered by AI" }
  ]);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleLibraryClick = () => {
    if (onNavigateToLibrary) {
      onNavigateToLibrary();
    }
  };

  const handleSettingsClick = () => {
    if (onNavigateToSettings) {
      onNavigateToSettings();
    }
  };

  const handleMenuClick = (e, itemId) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === itemId ? null : itemId);
  };

  const handleRename = (itemId) => {
    const newName = prompt("Enter new name:");
    if (newName && newName.trim()) {
      setChatItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, name: newName.trim() } : item
      ));
    }
    setActiveMenu(null);
  };

  const handleDelete = (itemId) => {
    if (window.confirm("Are you sure you want to delete this chat?")) {
      setChatItems(prev => prev.filter(item => item.id !== itemId));
    }
    setActiveMenu(null);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setActiveMenu(null);
    };

    if (activeMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeMenu]);

  const sidebarVariants = {
    open: {
      width: "280px",
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6
      }
    },
    closed: {
      width: "80px",
      x: 0,
      opacity: 0.9,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6
      }
    }
  };

  const contentVariants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.3
      }
    },
    closed: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div 
      className={`sidebar glass-effect ${isOpen ? 'open' : 'closed'}`}
      variants={sidebarVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
    >
      <motion.div className="sidebar-header">
        <motion.div 
          className="logo-container"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="logo-icon glass-effect"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <img src={AILogo} alt="AI Logo" className="logo-image" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.nav className="sidebar-nav">
        <motion.div className="nav-section">
          <motion.div 
            className={`nav-header ${expandedSection === 'chats' ? 'active' : ''}`}
            onClick={() => toggleSection('chats')}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <img src={ChatIcon} alt="Chats" className="nav-icon-img" />
            <motion.span 
              className="nav-title"
              variants={contentVariants}
              animate={isOpen ? "open" : "closed"}
            >
              Chats
            </motion.span>
            <motion.span 
              className={`nav-arrow ${expandedSection === 'chats' ? 'expanded' : ''}`}
              animate={{ rotate: expandedSection === 'chats' ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ›
            </motion.span>
          </motion.div>
          
          <AnimatePresence>
            {expandedSection === 'chats' && (
              <motion.div 
                className="nav-submenu expanded"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {chatItems.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    className="nav-subitem"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                    whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  >
                    <span className="subitem-text">{item.name}</span>
                    <div className="subitem-menu-container">
                      <span 
                        className="subitem-menu"
                        onClick={(e) => handleMenuClick(e, item.id)}
                      >
                        ⋯
                      </span>
                      {activeMenu === item.id && (
                        <motion.div 
                          className="dropdown-menu glass-morphism"
                          initial={{ opacity: 0, scale: 0.9, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <button 
                            className="dropdown-item"
                            onClick={() => handleRename(item.id)}
                          >
                            Rename
                          </button>
                          <button 
                            className="dropdown-item delete"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div className="nav-section">
          <motion.div 
            className={`nav-header ${currentPage === 'library' ? 'active' : ''}`}
            onClick={handleLibraryClick}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <img src={LibraryIcon} alt="Library" className="nav-icon-img" />
            <motion.span 
              className="nav-title"
              variants={contentVariants}
              animate={isOpen ? "open" : "closed"}
            >
              Pitch Deck library
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.nav>

      <motion.div className="sidebar-footer">
        <motion.div 
          className={`nav-header ${currentPage === 'settings' ? 'active' : ''}`}
          onClick={handleSettingsClick}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          whileTap={{ scale: 0.98 }}
        >
          <img src={SettingsIcon} alt="Settings" className="nav-icon-img" />
          <motion.span 
            className="nav-title"
            variants={contentVariants}
            animate={isOpen ? "open" : "closed"}
          >
            Settings
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
