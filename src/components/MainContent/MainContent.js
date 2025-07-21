import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './MainContent.css';
import AILogo from '../../assets/icons/AILogoLarge.png';
import OutreachIcon from '../../assets/icons/Outreach.png';
import PitchDeckIcon from '../../assets/icons/PitchDeck.png';
import MarketAgentIcon from '../../assets/icons/MarketAgent.png';
import ProductResearchIcon from '../../assets/icons/ProductResearch.png';
import FinanceIcon from '../../assets/icons/Finance.png';
import AgentSelectionIcon from '../../assets/icons/Agent Selection.png';
import SidebarToggleIcon from '../../assets/icons/SidebarToggle.png';
import ChatInterface from '../ChatInterface/ChatInterface';

const MainContent = ({ toggleSidebar, isSidebarOpen, onNavigateToLibrary }) => {
  const [showChat, setShowChat] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedOutreachOption, setSelectedOutreachOption] = useState('Outreach');
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [showOutreachDropdown, setShowOutreachDropdown] = useState(false);
  const [focusedAgentIndex, setFocusedAgentIndex] = useState(-1);
  const [focusedOutreachIndex, setFocusedOutreachIndex] = useState(-1);
  
  const agentDropdownRef = useRef(null);
  const outreachDropdownRef = useRef(null);
  const outreachButtonRef = useRef(null);

  const agents = [
    { id: 'market', name: 'Market agent', icon: MarketAgentIcon },
    { id: 'product', name: 'Product research agent', icon: ProductResearchIcon },
    { id: 'financial', name: 'Financial agent', icon: FinanceIcon }
  ];

  const outreachOptions = ['Outreach', 'VC List'];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (agentDropdownRef.current && !agentDropdownRef.current.contains(event.target)) {
        setShowAgentDropdown(false);
        setFocusedAgentIndex(-1);
      }
      if (outreachDropdownRef.current && !outreachDropdownRef.current.contains(event.target) &&
          outreachButtonRef.current && !outreachButtonRef.current.contains(event.target)) {
        setShowOutreachDropdown(false);
        setFocusedOutreachIndex(-1);
      }
    };

    const handleKeyDown = (event) => {
      // Handle agent dropdown keyboard navigation
      if (showAgentDropdown) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          setFocusedAgentIndex(prev => 
            prev < agents.length - 1 ? prev + 1 : 0
          );
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          setFocusedAgentIndex(prev => 
            prev > 0 ? prev - 1 : agents.length - 1
          );
        } else if (event.key === 'Enter' && focusedAgentIndex >= 0) {
          event.preventDefault();
          setSelectedAgent(agents[focusedAgentIndex].name);
          setShowAgentDropdown(false);
          setFocusedAgentIndex(-1);
        } else if (event.key === 'Escape') {
          setShowAgentDropdown(false);
          setFocusedAgentIndex(-1);
        }
      }

      // Handle outreach dropdown keyboard navigation
      if (showOutreachDropdown) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          setFocusedOutreachIndex(prev => 
            prev < outreachOptions.length - 1 ? prev + 1 : 0
          );
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          setFocusedOutreachIndex(prev => 
            prev > 0 ? prev - 1 : outreachOptions.length - 1
          );
        } else if (event.key === 'Enter' && focusedOutreachIndex >= 0) {
          event.preventDefault();
          setSelectedOutreachOption(outreachOptions[focusedOutreachIndex]);
          setShowOutreachDropdown(false);
          setFocusedOutreachIndex(-1);
        } else if (event.key === 'Escape') {
          setShowOutreachDropdown(false);
          setFocusedOutreachIndex(-1);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showAgentDropdown, showOutreachDropdown, focusedAgentIndex, focusedOutreachIndex, agents, outreachOptions]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);
    
    if (value.includes('@')) {
      setShowAgentDropdown(true);
    } else {
      setShowAgentDropdown(false);
    }
  };

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent.name);
    setShowAgentDropdown(false);
    setFocusedAgentIndex(-1);
    // Replace @ mention with agent name
    setInputText(inputText.replace(/@\w*$/, `@${agent.name} `));
  };

  const handleOutreachSelect = (option) => {
    setSelectedOutreachOption(option);
    setShowOutreachDropdown(false);
    setFocusedOutreachIndex(-1);
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setShowChat(true);
      setInputText('');
      setShowAgentDropdown(false);
    }
  };

  const handleNextPhase = () => {
    if (inputText.trim()) {
      setShowChat(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleButtonClick = (buttonType) => {
    console.log(`${buttonType} button clicked`);
    if (buttonType === 'Next Phase' || buttonType === 'Pitch Deck Gen') {
      setShowChat(true);
    }
  };

  return (
    <motion.div 
      className={`main-content ${!isSidebarOpen ? 'sidebar-closed' : ''}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.button 
        className={`sidebar-toggle-btn glass-morphism ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img src={SidebarToggleIcon} alt="Toggle Sidebar" className="toggle-icon" />
      </motion.button>
      
      {showChat ? (
        <ChatInterface onBack={() => setShowChat(false)} isSidebarOpen={isSidebarOpen} />
      ) : (
        <motion.div 
          className="content-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
        <motion.div 
          className="logo-section"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="main-logo">
            <img 
              src={AILogo} 
              alt="AI Logo" 
              className="logo-image"
            />
          </div>
        </motion.div>

        <motion.div 
          className="welcome-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        >
          <h1 className="welcome-text">What's new, USER?</h1>
        </motion.div>

        <motion.div 
          className="input-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
        >
          {showAgentDropdown && (
            <div className="agent-dropdown glass-morphism" ref={agentDropdownRef}>
              <div className="agent-dropdown-header">
                <img src={AgentSelectionIcon} alt="Agent Selection" className="agent-icon" />
                <span>Agent Selection</span>
              </div>
              {agents.map((agent, index) => (
                <div
                  key={agent.id}
                  className={`agent-item ${index === focusedAgentIndex ? 'focused' : ''}`}
                  onClick={() => handleAgentSelect(agent)}
                >
                  <div className={`agent-item-avatar ${agent.color || 'coordinator'}`}>
                    {agent.name.charAt(0)}
                  </div>
                  <span className="agent-item-name">{agent.name}</span>
                </div>
              ))}
            </div>
          )}

          {showOutreachDropdown && (
            <div className="agent-dropdown glass-morphism" ref={outreachDropdownRef}>
              <div className="agent-dropdown-header">
                <img src={OutreachIcon} alt="Outreach" className="agent-icon" />
                <span>Outreach Selection</span>
              </div>
              {outreachOptions.map((option, index) => (
                <div
                  key={option}
                  className={`agent-item ${index === focusedOutreachIndex ? 'focused' : ''}`}
                  onClick={() => handleOutreachSelect(option)}
                >
                  <img src={OutreachIcon} alt="Outreach" className="outreach-item-icon" />
                  <span className="agent-item-name">{option}</span>
                </div>
              ))}
            </div>
          )}

          <motion.div 
            className="input-wrapper-glass glass-morphism"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
          >
            <div className="advanced-input-container">
              <div className="input-main-wrapper glass-morphism">
                <input
                  type="text"
                  className="main-input-advanced"
                  placeholder="Describe your idea in 2-3 sentences or Tag the agents by @..."
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
                <button 
                  className="input-send-btn glass-morphism"
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3L17 10L10 17M17 10H3" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <div className="input-controls">
                <div className="controls-left">
                  <div className="outreach-dropdown">
                    <button 
                      ref={outreachButtonRef}
                      className={`input-btn glass-morphism dropdown-btn ${showOutreachDropdown ? 'open' : ''}`}
                      onClick={() => setShowOutreachDropdown(!showOutreachDropdown)}
                    >
                      <img src={OutreachIcon} alt="Outreach" className="btn-icon" />
                      <span>{selectedOutreachOption}</span>
                      <svg className="chevron-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <button 
                    className="input-btn glass-morphism"
                    onClick={() => handleButtonClick('Pitch Deck Gen')}
                  >
                    <img src={PitchDeckIcon} alt="Pitch Deck" className="btn-icon" />
                    <span>Pitch deck Gen</span>
                  </button>
                </div>

                <button 
                  className="next-phase-btn glass-morphism"
                  onClick={handleNextPhase}
                >
                  <span className="btn-text">Next Phase</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MainContent;
