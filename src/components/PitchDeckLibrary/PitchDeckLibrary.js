import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PitchDeckLibrary.css';

const PitchDeckLibrary = ({ onBack, isSidebarOpen }) => {
  // Sample pitch deck data - in a real app, this would come from an API or localStorage
  const [pitchDecks, setPitchDecks] = useState([
    {
      id: 1,
      title: "Startup Vision Pitch Deck",
      template: "Business Pitch Deck",
      color: "#2980b9",
      createdAt: "2025-01-20",
      slides: 18,
      chatId: "chat_001",
      description: "Professional business presentation for innovative architectural solutions",
      thumbnail: "startup-vision",
      status: "completed"
    },
    {
      id: 2,
      title: "Product Launch Deck",
      template: "Product Pitch Deck", 
      color: "#c41e3a",
      createdAt: "2025-01-19",
      slides: 12,
      chatId: "chat_002",
      description: "Bold product showcase for revolutionary tech solution",
      thumbnail: "product-launch",
      status: "completed"
    },
    {
      id: 3,
      title: "Corporate Strategy Presentation",
      template: "Corporate Pitch Deck",
      color: "#ff6b47",
      createdAt: "2025-01-18",
      slides: 15,
      chatId: "chat_003",
      description: "Professional corporate presentation for quarterly review",
      thumbnail: "corporate-strategy",
      status: "completed"
    },
    {
      id: 4,
      title: "Creative Brand Deck",
      template: "Creative Pitch Deck",
      color: "#8e44ad",
      createdAt: "2025-01-17",
      slides: 14,
      chatId: "chat_004",
      description: "Bold and creative presentation for brand identity project",
      thumbnail: "creative-brand",
      status: "completed"
    },
    {
      id: 5,
      title: "Market Analysis Report",
      template: "Startup Pitch Deck",
      color: "#00d4aa",
      createdAt: "2025-01-16",
      slides: 10,
      chatId: "chat_005",
      description: "Comprehensive market research and analysis presentation",
      thumbnail: "market-analysis",
      status: "completed"
    },
    {
      id: 6,
      title: "Investment Proposal",
      template: "Modern Pitch Deck",
      color: "#27ae60",
      createdAt: "2025-01-15",
      slides: 16,
      chatId: "chat_006",
      description: "Modern investment proposal for Series A funding round",
      thumbnail: "investment-proposal",
      status: "generating"
    }
  ]);

  // Sample slide data for full-screen viewer
  const slideData = [
    {
      id: 1,
      title: "WHO WE ARE",
      content: {
        mainText: "Founded in 2016, our company has pioneered quality in innovation and design. From leading high-quality concepts and campaigns to managing complete execution on all programs. Our missions have led to businesses becoming some of the country's most successful.",
        highlights: [
          "INNOVATING DYNAMIC SOLUTIONS",
          "MISSION: EMPOWERING BUSINESSES TO BUILD COMPETITIVE ADVANTAGE",
          "VISION: BECOMING A WORLD-RENOWNED COMPANY"
        ],
        footer: "PRESENTED BY OUR TEAM",
        number: "(01)"
      },
      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
    },
    {
      id: 2,
      title: "OUR SERVICES",
      content: {
        mainText: "We provide comprehensive solutions including strategy development, implementation, content creation, and project management.",
        highlights: [
          "STRATEGY & PLANNING",
          "IMPLEMENTATION SOLUTIONS", 
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
          "PERFORMANCE TRACKING"
        ],
        footer: "RESULTS THAT MATTER",
        number: "(03)"
      },
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 4,
      title: "SUCCESS STORIES",
      content: {
        mainText: "Our portfolio showcases successful partnerships with leading companies across various industries.",
        highlights: [
          "500+ SUCCESSFUL PROJECTS",
          "98% CLIENT SATISFACTION",
          "50+ INDUSTRY AWARDS"
        ],
        footer: "PROVEN TRACK RECORD",
        number: "(04)"
      },
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ];

  const [filterBy, setFilterBy] = useState('all'); // all, recent, template
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, title
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [showFullScreenViewer, setShowFullScreenViewer] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [editText, setEditText] = useState('');

  // Filter and sort pitch decks
  const filteredAndSortedDecks = pitchDecks
    .filter(deck => {
      if (filterBy === 'recent') {
        const recentDate = new Date();
        recentDate.setDate(recentDate.getDate() - 7);
        return new Date(deck.createdAt) >= recentDate;
      }
      if (filterBy === 'completed') {
        return deck.status === 'completed';
      }
      return true;
    })
    .filter(deck => 
      deck.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deck.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deck.template.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const handleDeckClick = (deck) => {
    setSelectedDeck(deck);
    // Here you could navigate to a deck viewer or open in full screen
    console.log('Opening deck:', deck.title);
  };

  const handleFullScreenView = (deck) => {
    setSelectedDeck(deck);
    setShowFullScreenViewer(true);
    setCurrentSlideIndex(0);
    setEditText('');
  };

  const handleCloseFullScreen = () => {
    setShowFullScreenViewer(false);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex(prev => prev > 0 ? prev - 1 : slideData.length - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex(prev => prev < slideData.length - 1 ? prev + 1 : 0);
  };

  const handleDeleteDeck = (deckId, e) => {
    e.stopPropagation();
    setPitchDecks(prev => prev.filter(deck => deck.id !== deckId));
  };

  const handleDuplicateDeck = (deck, e) => {
    e.stopPropagation();
    const newDeck = {
      ...deck,
      id: Date.now(),
      title: `${deck.title} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPitchDecks(prev => [newDeck, ...prev]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className={`pitch-deck-library ${!isSidebarOpen ? 'sidebar-closed' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div 
        className="library-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="header-main">
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
            <h1>Pitch Deck Library</h1>
            <p>{filteredAndSortedDecks.length} presentations available</p>
          </div>
        </div>

        {/* Search and Filters */}
        <motion.div 
          className="library-controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="search-container">
            <input
              type="text"
              placeholder="Search presentations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input glass-morphism"
            />
            <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
              <path d="15 15L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="filter-controls">
            <select 
              value={filterBy} 
              onChange={(e) => setFilterBy(e.target.value)}
              className="filter-select glass-morphism"
            >
              <option value="all">All Presentations</option>
              <option value="recent">Recent (7 days)</option>
              <option value="completed">Completed Only</option>
            </select>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select glass-morphism"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </motion.div>
      </motion.div>

      {/* Deck Grid */}
      <motion.div 
        className="deck-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {filteredAndSortedDecks.map((deck) => (
            <motion.div
              key={deck.id}
              className={`deck-card glass-morphism ${deck.status}`}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDeckClick(deck)}
              layout
            >
              {/* Card Header */}
              <div className="card-header">
                <div className="deck-status">
                  {deck.status === 'generating' ? (
                    <div className="status-generating">
                      <div className="generating-spinner"></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <div className="status-completed">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Completed</span>
                    </div>
                  )}
                </div>

                <div className="card-actions">
                  <button 
                    className="action-btn"
                    onClick={(e) => handleDuplicateDeck(deck, e)}
                    title="Duplicate"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      <rect x="5" y="5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={(e) => handleDeleteDeck(deck.id, e)}
                    title="Delete"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 2L10 2M2 4H14M12 4V13C12 13.5 11.5 14 11 14H5C4.5 14 4 13.5 4 13V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Deck Preview */}
              <div className="deck-preview" style={{ '--deck-color': deck.color }}>
                <div className="preview-slide">
                  <div className="slide-header" style={{ backgroundColor: deck.color }}>
                    <div className="slide-title-block">
                      <div className="title-line main"></div>
                      <div className="title-line sub"></div>
                    </div>
                  </div>
                  <div className="slide-content">
                    <div className="content-blocks">
                      <div className="content-block"></div>
                      <div className="content-block small"></div>
                      <div className="content-block medium"></div>
                    </div>
                  </div>
                  <div className="slide-footer">
                    <div className="footer-elements">
                      <div className="footer-element"></div>
                      <div className="footer-element"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Info */}
              <div className="card-info">
                <h3 className="deck-title">{deck.title}</h3>
                <p className="deck-description">{deck.description}</p>
                
                <div className="deck-meta">
                  <div className="meta-item">
                    <span className="meta-label">Template:</span>
                    <span className="meta-value">{deck.template}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Slides:</span>
                    <span className="meta-value">{deck.slides}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Created:</span>
                    <span className="meta-value">{formatDate(deck.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="card-footer">
                <button 
                  className="view-btn glass-morphism"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFullScreenView(deck);
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8S3 3 8 3S15 8 15 8S13 13 8 13S1 8 1 8Z" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  View Presentation
                </button>
                <button className="download-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1V11M8 11L5 8M8 11L11 8M2 15H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredAndSortedDecks.length === 0 && (
        <motion.div 
          className="empty-state"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect x="8" y="12" width="48" height="36" rx="4" stroke="currentColor" strokeWidth="2"/>
              <rect x="16" y="20" width="12" height="8" fill="currentColor" opacity="0.3"/>
              <line x1="32" y1="22" x2="48" y2="22" stroke="currentColor" strokeWidth="2"/>
              <line x1="32" y1="26" x2="44" y2="26" stroke="currentColor" strokeWidth="2"/>
              <line x1="16" y1="36" x2="48" y2="36" stroke="currentColor" strokeWidth="2"/>
              <line x1="16" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h3>No presentations found</h3>
          <p>
            {searchTerm 
              ? `No presentations match "${searchTerm}"`
              : "Start a chat to generate your first pitch deck"
            }
          </p>
          <button className="create-first-btn glass-morphism" onClick={onBack}>
            Start Creating
          </button>
        </motion.div>
      )}

      {/* Full Screen PPT Viewer */}
      {showFullScreenViewer && selectedDeck && (
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
            
            {/* Deck Info Display */}
            <div className="deck-info-overlay glass-morphism">
              <h3>{selectedDeck.title}</h3>
              <p>{selectedDeck.template} • {selectedDeck.slides} slides</p>
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
    </motion.div>
  );
};

export default PitchDeckLibrary;
