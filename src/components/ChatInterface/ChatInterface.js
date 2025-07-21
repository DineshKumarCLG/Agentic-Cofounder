import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatInterface.css';
import './PitchDeck.css';
import './SocialMediaStyles.css';
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
  const [selectedOutreachOption, setSelectedOutreachOption] = useState('Outreach Selection');
  const [focusedAgentIndex, setFocusedAgentIndex] = useState(-1);
  const [focusedOutreachIndex, setFocusedOutreachIndex] = useState(-1);
  const [showPitchDeckGenerator, setShowPitchDeckGenerator] = useState(false);
  const [pitchDeckStep, setPitchDeckStep] = useState('template'); // template, generating, preview
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showFullScreenViewer, setShowFullScreenViewer] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [editText, setEditText] = useState('');
  const [showSocialMediaPoster, setShowSocialMediaPoster] = useState(false);
  const [showVCList, setShowVCList] = useState(false);
  const [socialMediaContent, setSocialMediaContent] = useState('');
  const [vcRecommendations, setVcRecommendations] = useState([]);
  
  const agentDropdownRef = useRef(null);
  const outreachDropdownRef = useRef(null);
  const outreachButtonRef = useRef(null);

  const agents = [
    { id: 'market', name: 'Market agent', color: 'coordinator' },
    { id: 'product', name: 'Product research agent', color: 'product' },
    { id: 'financial', name: 'Financial agent', color: 'finance' },
    { id: 'outreach', name: 'Outreach agent', color: 'outreach' }
  ];

  const outreachOptions = [
    { value: 'social-media', label: 'Social Media Posting' },
    { value: 'vc-list', label: 'VC Recommendation' }
  ];

  const socialMediaPlatforms = [
    {
      id: 'reddit',
      name: 'Reddit',
      icon: '🧡',
      color: '#FF4500',
      placeholder: 'Share your startup story on Reddit...',
      characterLimit: 40000
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      color: '#0077B5',
      placeholder: 'Professional post for LinkedIn...',
      characterLimit: 3000
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      icon: '🐦',
      color: '#1DA1F2',
      placeholder: 'Tweet about your startup...',
      characterLimit: 280
    }
  ];

  const vcData = [
    {
      id: 1,
      name: 'Greylock Partners',
      description: 'They have a strong focus on AI and enterprise software.',
      website: 'https://www.greylock.com/',
      linkedin: 'https://www.linkedin.com/company/greylock-partners/',
      twitter: 'https://twitter.com/greylockpartners',
      crunchbase: 'https://www.crunchbase.com/organization/greylock-partners',
      tags: ['AI', 'Enterprise Software', 'Seed to Series C'],
      focus: 'AI, Enterprise Software',
      stage: 'Seed to Series C'
    },
    {
      id: 2,
      name: 'Andreessen Horowitz',
      description: 'They have a dedicated AI fund and invest in enterprise software.',
      website: 'https://a16z.com/',
      linkedin: 'https://www.linkedin.com/company/andreessen-horowitz/',
      twitter: 'https://twitter.com/a16z',
      crunchbase: 'https://www.crunchbase.com/organization/andreessen-horowitz',
      tags: ['AI', 'Enterprise Software', 'Seed to Series C'],
      focus: 'AI, Enterprise Software',
      stage: 'Seed to Series C'
    },
    {
      id: 3,
      name: 'Spark Capital',
      description: 'They have a strong focus on AI and enterprise software, with investments in Instabase.',
      website: 'https://www.sparkcapital.com/',
      linkedin: 'https://www.linkedin.com/company/spark-capital/',
      twitter: 'https://twitter.com/spark_capital',
      crunchbase: 'https://www.crunchbase.com/organization/spark-capital',
      tags: ['AI', 'Enterprise Software', 'Seed to Series C'],
      focus: 'AI, Enterprise Software',
      stage: 'Seed to Series C'
    },
    {
      id: 4,
      name: 'Tribe Capital',
      description: 'They have a strong focus on AI and enterprise software, with investments in Instabase.',
      website: 'https://www.tribecapital.com/',
      linkedin: 'https://www.linkedin.com/company/tribe-capital/',
      twitter: 'https://twitter.com/tribe_capital',
      crunchbase: 'https://www.crunchbase.com/organization/tribe-capital',
      tags: ['AI', 'Enterprise Software', 'Seed to Series C'],
      focus: 'AI, Enterprise Software',
      stage: 'Seed to Series C'
    },
    {
      id: 5,
      name: 'Index Ventures',
      description: 'They have a strong focus on AI and enterprise software, with investments in Instabase.',
      website: 'https://www.indexventures.com/',
      linkedin: 'https://www.linkedin.com/company/index-ventures/',
      twitter: 'https://twitter.com/indexventures',
      crunchbase: 'https://www.crunchbase.com/organization/index-ventures',
      tags: ['AI', 'Enterprise Software', 'Seed to Series C'],
      focus: 'AI, Enterprise Software',
      stage: 'Seed to Series C'
    }
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
    if (agentName.includes('Outreach')) return 'outreach';
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
    setSelectedOutreachOption(option.label || option);
    setShowOutreachDropdown(false);
    setFocusedOutreachIndex(-1);
    
    // Handle different option types by adding chat messages
    if (option.value === 'vc-list') {
      const vcMessage = {
        id: messages.length + 1,
        type: 'agent',
        agent: 'Outreach agent',
        content: 'vc-recommendations',
        timestamp: new Date().toISOString(),
        vcData: vcData
      };
      setMessages(prev => [...prev, vcMessage]);
    } else if (option.value === 'social-media') {
      const socialMediaMessage = {
        id: messages.length + 1,
        type: 'agent',
        agent: 'Outreach agent',
        content: 'social-media-cards',
        timestamp: new Date().toISOString(),
        platforms: socialMediaPlatforms
      };
      setMessages(prev => [...prev, socialMediaMessage]);
    }
  };

  const handlePreview = (platform, content) => {
    if (!content.trim()) {
      alert('Please write some content first!');
      return;
    }

    const previewMessage = {
      id: Date.now(),
      type: 'agent',
      agent: 'Outreach agent',
      content: `preview-${platform}`,
      previewData: {
        platform,
        content: content.trim()
      },
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, previewMessage]);
  };

  const handlePost = (platform, content) => {
    if (!content.trim()) {
      alert('Please write some content first!');
      return;
    }

    // Simulate posting delay
    setTimeout(() => {
      const successMessage = {
        id: Date.now(),
        type: 'agent',
        agent: 'Outreach agent',
        content: 'post-success',
        postData: {
          platform,
          content: content.trim(),
          timestamp: new Date().toLocaleString()
        },
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, successMessage]);
    }, 1500);
  };

  const generateAIPost = (platform) => {
    const templates = {
      'Reddit': [
        "🚀 Just launched our startup and wanted to share our journey with the community! We're building an AI-powered solution that helps businesses automate their workflow. The challenges we faced during development taught us so much about resilience and innovation. What's been your biggest lesson as an entrepreneur? Would love to hear your stories! #startup #entrepreneur #AI #innovation",
        "📈 After 6 months of development, we're finally ready to show our product to the world! Our team has been working tirelessly to create something that solves real problems. The feedback from beta users has been incredible. For fellow founders - what was your 'aha moment' when you knew your idea was worth pursuing? #startuplife #product #feedback",
        "💡 Building a startup while working full-time is no joke! But the passion for solving real problems keeps us going. We're creating tools that make business operations smoother and more efficient. To all the side-project entrepreneurs out there - how do you manage your time and stay motivated? #sideproject #startup #motivation"
      ],
      'LinkedIn': [
        "Excited to announce that our team has been working on an innovative AI solution that's set to transform how businesses handle their operations. After months of research and development, we're proud to share our progress with the LinkedIn community. Looking forward to connecting with fellow innovators and potential partners. #Innovation #AI #BusinessSolution #Startup",
        "Thrilled to share a major milestone in our entrepreneurial journey! Our startup has reached a significant development phase, and we're seeing tremendous potential in our AI-driven platform. The experience of building something from the ground up has been both challenging and rewarding. Grateful for the support of our network. #Entrepreneurship #Startup #AI #Innovation #Growth",
        "Reflecting on the incredible journey of building our startup from concept to reality. The lessons learned, the challenges overcome, and the relationships built along the way have been invaluable. Our AI-powered solution is now ready to make a real impact in the business world. #StartupJourney #AI #Innovation #BusinessGrowth #Entrepreneurship"
      ],
      'X (Twitter)': [
        "🚀 Just dropped our latest AI tool that's going to change the game for businesses everywhere! The future is automated, and we're here for it. #AI #startup #innovation #tech",
        "💡 6 months of coding, countless coffee cups, and one amazing team later... our startup is ready to launch! Who else is building something cool? #startup #entrepreneur #buildinpublic",
        "🔥 AI + Business automation = Magic ✨ Our new platform is live and we couldn't be more excited! DMs open for feedback 📩 #AI #startup #launch #tech"
      ]
    };

    return templates[platform][Math.floor(Math.random() * templates[platform].length)];
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

  // Animation variants
  const messageVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.8 
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
      y: -50,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  const bubbleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="chat-interface"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div className="chat-messages">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div 
              key={message.id} 
              className={`message ${message.type}`}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              custom={index}
            >
              {message.type === 'agent' && (
                <motion.div 
                  className="agent-info"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div 
                    className={`agent-avatar ${getAgentColor(message.agent)}`}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="agent-initial">
                      {message.agent.charAt(0)}
                    </span>
                  </motion.div>
                  <span className="agent-name">{message.agent}</span>
                </motion.div>
              )}
              <motion.div 
                className={`message-bubble glass-morphism ${message.type} ${message.type === 'agent' ? getAgentColor(message.agent) : ''}`}
                variants={bubbleVariants}
                transition={{ duration: 0.2 }}
              >
                {message.type === 'user' && (
                  <motion.div 
                    className="user-avatar"
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="user-initial">U</span>
                  </motion.div>
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

                {/* VC Recommendations */}
                {message.content === 'vc-recommendations' && (
                  <div className="vc-recommendations-bubble">
                    <div className="bubble-header">
                      <h3>Recommended VCs for Your Startup</h3>
                      <p>Here are some top VCs that match your startup profile:</p>
                    </div>
                    
                    <div className="vc-cards-container">
                      {message.vcData?.map((vc, index) => (
                        <div key={vc.id} className="vc-card-glass glass-morphism">
                          <div className="vc-card-header">
                            <div className="vc-number-badge glass-morphism">
                              {index + 1}
                            </div>
                            <div className="vc-firm-info">
                              <h4 className="vc-firm-name">{vc.name}</h4>
                              <p className="vc-description">{vc.description}</p>
                            </div>
                          </div>
                          
                          <div className="vc-tags-section">
                            <div className="tags-container">
                              {vc.tags.map((tag, tagIndex) => (
                                <span key={tagIndex} className="vc-tag glass-morphism">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="vc-links-grid">
                            <div className="vc-link-card glass-morphism">
                              <div className="link-icon">🌐</div>
                              <div className="link-content">
                                <span className="link-label">Website</span>
                                <a href={vc.website} target="_blank" rel="noopener noreferrer" className="link-url">
                                  {vc.website.replace('https://', '').replace('www.', '')}
                                </a>
                              </div>
                            </div>
                            
                            <div className="vc-link-card glass-morphism">
                              <div className="link-icon">💼</div>
                              <div className="link-content">
                                <span className="link-label">LinkedIn</span>
                                <a href={vc.linkedin} target="_blank" rel="noopener noreferrer" className="link-url">
                                  View Profile
                                </a>
                              </div>
                            </div>
                            
                            <div className="vc-link-card glass-morphism">
                              <div className="link-icon">🐦</div>
                              <div className="link-content">
                                <span className="link-label">Twitter</span>
                                <a href={vc.twitter} target="_blank" rel="noopener noreferrer" className="link-url">
                                  Follow
                                </a>
                              </div>
                            </div>
                            
                            <div className="vc-link-card glass-morphism">
                              <div className="link-icon">🏢</div>
                              <div className="link-content">
                                <span className="link-label">Crunchbase</span>
                                <a href={vc.crunchbase} target="_blank" rel="noopener noreferrer" className="link-url">
                                  View Data
                                </a>
                              </div>
                            </div>
                          </div>
                          
                          <div className="vc-actions">
                            <button className="vc-action-btn contact-btn glass-morphism">
                              <span className="btn-icon">✉️</span>
                              Contact
                            </button>
                            <button className="vc-action-btn research-btn glass-morphism">
                              <span className="btn-icon">🔍</span>
                              Research
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Media Cards */}
                {message.content === 'social-media-cards' && (
                  <div className="social-media-bubble">
                    <div className="bubble-header">
                      <h3>Social Media Post Generator</h3>
                      <p>AI-generated posts ready for your review:</p>
                    </div>
                    
                    <div className="social-platforms-grid">
                      {message.platforms?.map((platform) => {
                        const aiGeneratedPost = generateAIPost(platform.name);
                        const textareaId = `textarea-${platform.id}-${message.id}`;
                        
                        return (
                          <div key={platform.id} className="social-platform-card glass-morphism">
                            <div className="platform-header">
                              <div className="platform-info">
                                <span className="platform-icon">{platform.icon}</span>
                                <span className="platform-name">{platform.name}</span>
                              </div>
                              <div className="character-count">
                                {aiGeneratedPost.length}/{platform.characterLimit}
                              </div>
                            </div>
                            
                            <textarea
                              id={textareaId}
                              className="social-textarea"
                              placeholder={platform.placeholder}
                              maxLength={platform.characterLimit}
                              defaultValue={aiGeneratedPost}
                              style={{ borderColor: platform.color }}
                              onChange={(e) => {
                                const charCount = e.target.value.length;
                                e.target.parentElement.querySelector('.character-count').textContent = `${charCount}/${platform.characterLimit}`;
                              }}
                            />
                            
                            <div className="platform-actions">
                              <button 
                                className="preview-btn"
                                style={{ backgroundColor: platform.color }}
                                onClick={() => {
                                  const textarea = document.getElementById(textareaId);
                                  handlePreview(platform.name, textarea.value);
                                }}
                              >
                                Preview
                              </button>
                              <button 
                                className="post-btn"
                                style={{ backgroundColor: platform.color }}
                                onClick={() => {
                                  const textarea = document.getElementById(textareaId);
                                  handlePost(platform.name, textarea.value);
                                }}
                              >
                                Post to {platform.name}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Platform Preview Messages */}
                {(message.content?.startsWith('preview-') || message.content === 'post-success') && (
                  <div className="platform-preview-bubble">
                    {message.content?.startsWith('preview-') && message.previewData && (
                      <div className="preview-container">
                        <div className="preview-header">
                          <h3>📱 {message.previewData.platform} Preview</h3>
                          <p>This is how your post will appear:</p>
                        </div>
                        
                        {message.previewData.platform === 'Reddit' && (
                          <div className="reddit-preview glass-morphism">
                            <div className="reddit-post">
                              <div className="reddit-votes">
                                <div className="vote-arrow">⬆</div>
                                <div className="vote-count">•</div>
                                <div className="vote-arrow">⬇</div>
                              </div>
                              <div className="reddit-content">
                                <div className="reddit-header">
                                  <span className="subreddit">r/startups</span>
                                  <span className="posted-by">• Posted by u/YourUsername • now</span>
                                </div>
                                <div className="reddit-title">Startup Journey Update</div>
                                <div className="reddit-text">{message.previewData.content}</div>
                                <div className="reddit-actions">
                                  <span className="action">💬 Comments</span>
                                  <span className="action">📤 Share</span>
                                  <span className="action">💾 Save</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {message.previewData.platform === 'LinkedIn' && (
                          <div className="linkedin-preview glass-morphism">
                            <div className="linkedin-post">
                              <div className="linkedin-header">
                                <div className="profile-pic">👤</div>
                                <div className="profile-info">
                                  <div className="name">Your Name</div>
                                  <div className="title">Entrepreneur • Startup Founder</div>
                                  <div className="time">Now • 🌐</div>
                                </div>
                              </div>
                              <div className="linkedin-content">{message.previewData.content}</div>
                              <div className="linkedin-actions">
                                <span className="action">👍 Like</span>
                                <span className="action">💬 Comment</span>
                                <span className="action">🔄 Repost</span>
                                <span className="action">📤 Send</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {message.previewData.platform === 'X (Twitter)' && (
                          <div className="twitter-preview glass-morphism">
                            <div className="twitter-post">
                              <div className="twitter-header">
                                <div className="profile-pic">👤</div>
                                <div className="profile-info">
                                  <div className="name-verified">
                                    <span className="name">Your Name</span>
                                    <span className="verified">✓</span>
                                  </div>
                                  <div className="username">@yourusername • now</div>
                                </div>
                              </div>
                              <div className="twitter-content">{message.previewData.content}</div>
                              <div className="twitter-actions">
                                <span className="action">💬 Reply</span>
                                <span className="action">🔄 Repost</span>
                                <span className="action">❤️ Like</span>
                                <span className="action">📤 Share</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {message.content === 'post-success' && message.postData && (
                      <div className="success-container">
                        <div className="success-header">
                          <h3>🎉 Post Published Successfully!</h3>
                          <p>Your content is now live on {message.postData.platform}</p>
                        </div>
                        
                        <div className="success-details glass-morphism">
                          <div className="success-platform">
                            <span className="platform-badge">{message.postData.platform}</span>
                            <span className="success-time">Published at {message.postData.timestamp}</span>
                          </div>
                          <div className="success-preview">
                            <p>"{message.postData.content.substring(0, 100)}..."</p>
                          </div>
                          <div className="success-actions">
                            <button className="view-post-btn">View Post</button>
                            <button className="share-link-btn">Copy Link</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        className={`chat-input-container ${!isSidebarOpen ? 'sidebar-closed' : ''}`}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
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
                key={option.value || option}
                className={`agent-item ${index === focusedOutreachIndex ? 'focused' : ''}`}
                onClick={() => handleOutreachSelect(option)}
              >
                <img src={OutreachIcon} alt="Outreach" className="outreach-item-icon" />
                <span className="agent-item-name">{option.label || option}</span>
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
      </motion.div>

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
    </motion.div>
  );
};

export default ChatInterface;
