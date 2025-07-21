import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import PitchDeckLibrary from './components/PitchDeckLibrary/PitchDeckLibrary';
import Settings from './components/Settings/Settings';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('main'); // 'main', 'library', 'settings'

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigateToLibrary = () => {
    setCurrentPage('library');
  };

  const navigateToMain = () => {
    setCurrentPage('main');
  };

  const navigateToSettings = () => {
    setCurrentPage('settings');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'library':
        return (
          <PitchDeckLibrary 
            onBack={navigateToMain}
            isSidebarOpen={isSidebarOpen} 
          />
        );
      case 'settings':
        return (
          <Settings 
            onBack={navigateToMain}
            isSidebarOpen={isSidebarOpen} 
          />
        );
      case 'main':
      default:
        return (
          <MainContent 
            toggleSidebar={toggleSidebar} 
            isSidebarOpen={isSidebarOpen}
            onNavigateToLibrary={navigateToLibrary}
          />
        );
    }
  };

  return (
    <motion.div 
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Video Background */}
      <motion.video 
        className="video-background"
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
        controls={false}
        style={{ display: 'block' }}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 0.5 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <source src="/Assets/Videos/I_want_you_202507211441.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
        onNavigateToLibrary={navigateToLibrary}
        onNavigateToSettings={navigateToSettings}
        currentPage={currentPage}
      />
      {renderCurrentPage()}
    </motion.div>
  );
}

export default App;
