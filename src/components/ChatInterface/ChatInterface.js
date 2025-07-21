import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';
import './PitchDeck.css';
import AgentSelectionIcon from '../../assets/icons/Agent Selection.png';
import OutreachIcon from '../../assets/icons/Outreach.png';
import PitchDeckIcon from '../../assets/icons/PitchDeck.png';

const ChatInterface = ({ onBack, isSidebarOpen }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'agent',
      agent: 'Coordinator',
      content: 'Blah blah blah blah Blah blah blah blah blah blah blah blah Blah blah blah blah Blah blah blah blah blah blah blah blah Blah blah blah blah'
    },
    {
      id: 2,
      type: 'user',
      content: 'Blah blah blah blah Blah blah blah blah blah blah blah blah Blah blah blah blah Blah blah blah blah blah blah blah blah'
    },
    {
      id: 3,
      type: 'agent',
      agent: 'Product Research Agent',
      content: 'Blah blah blah blah Blah blah blah blah blah blah blah blah Blah blah blah blah Blah blah blah blah blah blah blah blah'
    },
    {
      id: 4,
      type: 'user',
      content: 'Blah blah blah blah Blah blah blah blah blah blah blah blah Blah blah blah blah Blah blah blah blah blah blah blah blah'
    },
    {
      id: 5,
      type: 'agent',
      agent: 'Finance Agent',
      content: 'Blah blah blah blah Blah blah blah blah blah blah blah blah Blah blah blah blah Blah blah blah blah blah blah blah blah'
    },
    {
      id: 6,
      type: 'user',
      content: 'Blah blah blah blah Blah blah blah blah blah blah blah blah Blah blah blah blah Blah blah blah blah blah blah blah blah'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [showOutreachDropdown, setShowOutreachDropdown] = useState(false);
  const [selectedOutreachOption, setSelectedOutreachOption] = useState('Outreach');
  const [focusedAgentIndex, setFocusedAgentIndex] = useState(-1);
  const [focusedOutreachIndex, setFocusedOutreachIndex] = useState(-1);
  const [showPitchDeckGenerator, setShowPitchDeckGenerator] = useState(false);
  const [pitchDeckStep, setPitchDeckStep] = useState('template'); // template, generating, preview
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showFullScreenViewer, setShowFullScreenViewer] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [editText, setEditText] = useState('');
  
  const agentDropdownRef = useRef(null);
  const outreachDropdownRef = useRef(null);
  const outreachButtonRef = useRef(null);

  const agents = [
    { id: 'market', name: 'Market agent', color: 'coordinator' },
    { id: 'product', name: 'Product research agent', color: 'product' },
    { id: 'financial', name: 'Financial agent', color: 'finance' }
  ];

  const outreachOptions = [
    'Outreach',
    'VC List'
  ];

  const pitchDeckTemplates = [
    {
      id: 'startup',
      name: 'Startup Pitch Deck',
      description: 'Modern startup presentation template',
      slides: 12,
      color: '#00d4aa'
    },
    {
      id: 'corporate',
      name: 'Corporate Pitch Deck',
      description: 'Professional corporate presentation',
      slides: 15,
      color: '#ff6b47'
    },
    {
      id: 'product',
      name: 'Product Pitch Deck',
      description: 'Bold product showcase template', 
      slides: 10,
      color: '#c41e3a'
    },
    {
      id: 'kenesis',
      name: 'Business Pitch Deck',
      description: 'Professional business presentation',
      slides: 18,
      color: '#2980b9'
    },
    {
      id: 'minimal',
      name: 'Visual Brand Audit',
      description: 'Clean visual branding template',
      slides: 14,
      color: '#2c3e50'
    },
    {
      id: 'creative',
      name: 'Creative Pitch Deck',
      description: 'Bold and creative presentation',
      slides: 16,
      color: '#8e44ad'
    },
    {
      id: 'modern',
      name: 'Modern Pitch Deck',
      description: 'Contemporary design template',
      slides: 13,
      color: '#27ae60'
    },
    {
      id: 'playful',
      name: 'Playful Pitch Deck',
      description: 'Fun and engaging presentation',
      slides: 11,
      color: '#e67e22'
    },
    {
      id: 'elegant',
      name: 'Elegant Pitch Deck',
      description: 'Sophisticated presentation template',
      slides: 15,
      color: '#95a5a6'
    }
  ];

  // Sample slide data for full-screen viewer
  const slideData = [
    {
      id: 1,
      title: "WHO WE ARE",
      content: {
        mainText: "Founded in 2016, Braleos Group has pioneered quality in marketing, branding, promotions setup and print design. From leading high-quality branding concepts and campaigns to managing complete execution on all programs. Our missions have led to businesses becoming some of the country's most successful.",
        highlights: [
          "INNOVATING DYNAMIC WORLDS",
          "MISSION: EMPOWERING BUSINESSES TO BUILD COMPETITIVE ADVANTAGE WITH CORE MARKETING SOLUTIONS",
          "VISION: BECOMING A WORLD-RENOWNED MARKETING AGENCY"
        ],
        footer: "PRESENTED BY GAMMA FREELANCE",
        number: "(01)"
      },
      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      title: "OUR SERVICES",
      content: {
        mainText: "We provide comprehensive marketing solutions including brand strategy, digital marketing, content creation, and campaign management.",
        highlights: [
          "BRAND STRATEGY & IDENTITY",
          "DIGITAL MARKETING SOLUTIONS", 
          "CONTENT CREATION & MANAGEMENT"
        ],
        footer: "EXCELLENCE IN EVERY PROJECT",
        number: "(02)"
      },
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 3,
      title: "OUR APPROACH",
      content: {
        mainText: "Data-driven strategies combined with creative excellence to deliver measurable results for our clients.",
        highlights: [
          "RESEARCH & ANALYSIS",
          "CREATIVE DEVELOPMENT",
          "PERFORMANCE OPTIMIZATION"
        ],
        footer: "RESULTS THAT MATTER",
        number: "(03)"
      },
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    }
  ];

  // Navigation functions
  const handlePrevSlide = () => {
    setCurrentSlideIndex(prev => prev > 0 ? prev - 1 : slideData.length - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex(prev => prev < slideData.length - 1 ? prev + 1 : 0);
  };

  const handleFullScreenView = () => {
    setShowFullScreenViewer(true);
    setCurrentSlideIndex(0);
    setEditText('');
  };

  const handleCloseFullScreen = () => {
    setShowFullScreenViewer(false);
  };
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
          handleAgentSelect(agents[focusedAgentIndex]);
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
          handleOutreachSelect(outreachOptions[focusedOutreachIndex]);
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

  const getAgentColor = (agentName) => {
    if (agentName.includes('Coordinator')) return 'coordinator';
    if (agentName.includes('Product')) return 'product';
    if (agentName.includes('Finance')) return 'finance';
    return 'coordinator';
  };

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
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: inputText
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      setShowAgentDropdown(false);
    }
  };

  const handleNextPhase = () => {
    // Navigate to next agent phase
    const nextAgent = 'Finance Agent'; // This could be dynamic based on current phase
    const phaseMessage = {
      id: messages.length + 1,
      type: 'agent',
      agent: nextAgent,
      content: 'Moving to the next phase. Let me analyze the financial aspects of your proposal...'
    };
    setMessages([...messages, phaseMessage]);
  };

  const handlePitchDeckClick = () => {
    setShowPitchDeckGenerator(true);
    setPitchDeckStep('template');
    
    // Add a message to show pitch deck generation started
    const pitchDeckMessage = {
      id: messages.length + 1,
      type: 'agent',
      agent: 'Pitch Deck Generator',
      content: 'Let\'s create your pitch deck! First, choose a template that best fits your presentation style.',
      showPitchDeckTemplates: true
    };
    setMessages([...messages, pitchDeckMessage]);
  };

  const handleTemplateSelect = (template) => {
    setPitchDeckStep('generating');
    
    const generatingMessage = {
      id: messages.length + 1,
      type: 'agent',
      agent: 'Pitch Deck Generator',
      content: `Great choice! I'm now generating your "${template.name}" pitch deck based on our conversation. This will take a few moments...`,
      isGenerating: true
    };
    setMessages([...messages, generatingMessage]);

    // Simulate generation process
    setTimeout(() => {
      const completedMessage = {
        id: messages.length + 2,
        type: 'agent',
        agent: 'Pitch Deck Generator',
        content: `Your pitch deck is ready! I've created a ${template.slides}-slide presentation using the "${template.name}" template. You can preview and edit it below.`,
        showPitchDeckPreview: true,
        selectedTemplate: template
      };
      setMessages(prev => [...prev.slice(0, -1), completedMessage]);
      setPitchDeckStep('preview');
    }, 3000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            {message.type === 'agent' && (
              <div className="agent-info">
                <div className={`agent-avatar ${getAgentColor(message.agent)}`}>
                  <span className="agent-initial">
                    {message.agent.charAt(0)}
                  </span>
                </div>
                <span className="agent-name">{message.agent}</span>
              </div>
            )}
            <div className={`message-bubble glass-morphism ${message.type} ${message.type === 'agent' ? getAgentColor(message.agent) : ''}`}>
              {message.type === 'user' && (
                <div className="user-avatar">
                  <span className="user-initial">U</span>
                </div>
              )}
              <div className="message-content">
                {message.content}
                
                {/* Pitch Deck Templates Selector */}
                {message.showPitchDeckTemplates && (
                  <div className="pitch-deck-templates">
                    <div className="templates-header">
                      <div className="agent-avatar">👤</div>
                      <h3>Select a template</h3>
                    </div>
                    <div className="templates-grid">
                      {pitchDeckTemplates.map((template) => (
                        <div
                          key={template.id}
                          className="template-card"
                          data-template={template.id}
                          onClick={() => handleTemplateSelect(template)}
                          style={{ '--template-color': template.color }}
                        >
                          <div className="template-preview">
                            <div className="template-thumbnail">
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Generating Animation */}
                {message.isGenerating && (
                  <div className="generating-animation">
                    <div className="generating-spinner"></div>
                    <span>Generating your pitch deck...</span>
                  </div>
                )}

                {/* Template Selection */}
                {message.showTemplateSelection && (
                  <div className="pitch-deck-templates">
                    <div className="templates-header">
                      <div className="agent-avatar">👤</div>
                      <h3>Select a template</h3>
                    </div>
                    <div className="templates-grid">
                      {pitchDeckTemplates.slice(0, 9).map((template) => (
                        <div
                          key={template.id}
                          className="template-card"
                          data-template={template.id}
                          style={{ '--template-color': template.color }}
                          onClick={() => handleTemplateSelect(template)}
                        >
                          <div className="template-preview">
                            <div className="template-thumbnail">
                              <div className="template-content">
                                <div className="template-title">{template.name}</div>
                                {template.subtitle && (
                                  <div className="template-subtitle">{template.subtitle}</div>
                                )}
                                {template.icon && (
                                  <div className="template-icon">{template.icon}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pitch Deck Preview */}
                {message.showPitchDeckPreview && (
                  <div className="pitch-deck-result">
                    <div className="result-header">
                      <h3>Here's the pitch deck for it</h3>
                    </div>
                    
                    <div className="generated-deck-card">
                        <div className="deck-info-header">
                          <div className="deck-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                              <rect x="7" y="8" width="4" height="4" fill="currentColor"/>
                              <line x1="13" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="2"/>
                              <line x1="13" y1="11" x2="15" y2="11" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          </div>
                          <div className="deck-details">
                            <h4>{message.selectedTemplate?.name || 'Kenesis Vision Pitch Deck'}</h4>
                            <span className="deck-type">PowerPoint Presentation (.PPTX)</span>
                          </div>
                        </div>
                        
                        <div className="deck-preview-simple">
                          <div className="main-slide-preview" style={{ backgroundColor: message.selectedTemplate?.color || '#E74C3C' }}>
                            <div className="slide-content-main">
                              <div className="pitch-deck-title">
                                <span className="title-text">PITCH</span>
                                <span className="title-text">DECK</span>
                              </div>
                              <div className="slide-building-image">
                                <div className="building-silhouette"></div>
                              </div>
                              <div className="slide-footer">
                                <span className="footer-text">INNOVATIVE</span>
                                <span className="footer-text">ARCHITECTURAL</span>
                                <span className="footer-text">SOLUTIONS</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="download-section-simple">
                          <button className="download-btn" onClick={handleFullScreenView}>
                            👁️ Full Preview
                          </button>
                          <button className="download-btn">
                            📥 Download
                          </button>
                        </div>
                      </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`chat-input-container ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
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
                <div className={`agent-item-avatar ${agent.color}`}>
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
        
        <div className="input-wrapper-glass glass-morphism">
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
                    className="input-btn glass-morphism dropdown-btn"
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
                  onClick={handlePitchDeckClick}
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
        </div>
      </div>

      {/* Full Screen PPT Viewer */}
      {showFullScreenViewer && (
        <div className="fullscreen-ppt-viewer">
          <div className="viewer-background"></div>
          
          <div className="viewer-content">
            <div className="slide-container">
              <div 
                className="slide-display"
                style={{ background: slideData[currentSlideIndex]?.background || 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}
              >
                <div className="slide-content-viewer">
                  <div className="slide-header">
                    <h1 className="slide-title">{slideData[currentSlideIndex]?.title}</h1>
                  </div>
                  
                  {slideData[currentSlideIndex]?.image && (
                    <div className="slide-image">
                      <img src={slideData[currentSlideIndex].image} alt="Slide content" />
                    </div>
                  )}
                  
                  <div className="slide-text-content">
                    <p className="main-text">{slideData[currentSlideIndex]?.content.mainText}</p>
                    
                    <div className="highlights">
                      {slideData[currentSlideIndex]?.content.highlights.map((highlight, index) => (
                        <div key={index} className="highlight-item">
                          <span className="highlight-text">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="slide-footer-viewer">
                    <span className="footer-text">{slideData[currentSlideIndex]?.content.footer}</span>
                    <span className="slide-number">{slideData[currentSlideIndex]?.content.number}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="viewer-controls">
              <button className="nav-btn prev-btn glass-morphism" onClick={handlePrevSlide}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div className="slide-counter glass-morphism">
                <span>{currentSlideIndex + 1} / {slideData.length}</span>
              </div>
              
              <button className="nav-btn next-btn glass-morphism" onClick={handleNextSlide}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Edit Controls */}
            <div className="edit-controls glass-morphism">
              <input
                type="text"
                placeholder="Wanna edit the pitch?"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
              />
              <button className="send-edit-btn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3L17 10L10 17M17 10H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Close Button */}
            <button className="close-viewer-btn glass-morphism" onClick={handleCloseFullScreen}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
