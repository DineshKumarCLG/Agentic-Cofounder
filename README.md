# 🚀 Agentic Cofounder

A modern React application featuring an AI-powered chat interface with specialized agents and an integrated pitch deck generator. Built with glassmorphic design principles and smooth animations.

![Agentic Cofounder](https://img.shields.io/badge/React-18.0+-blue.svg)
![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-orange.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Features

### 🤖 Multi-Agent Chat Interface
- **Specialized AI Agents**: Product Research, Finance, Coordinator, and more
- **Agent Selection Dropdown**: Easy switching between different AI assistants
- **Glassmorphic Chat Bubbles**: Beautiful tinted glass effect with backdrop blur
- **Real-time Messaging**: Smooth chat experience with typing indicators

### 📊 Pitch Deck Generator
- **Template Selection**: Choose from 9+ professionally designed templates
- **Full-Screen Viewer**: Immersive presentation viewing experience
- **Navigation Controls**: Previous/Next slide functionality with glassmorphic controls
- **Download Support**: Export presentations in PowerPoint format
- **Live Preview**: Real-time slide preview with customizable content

### 🎨 Modern UI/UX
- **Glassmorphic Design**: Advanced backdrop-filter effects throughout
- **Smooth Animations**: Ease-in/out transitions for sidebar and components
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Dark Theme**: Elegant dark interface with subtle gradients

### 🔧 Technical Features
- **React 18**: Latest React features with hooks and functional components
- **Modular Architecture**: Clean, scalable component structure
- **CSS Grid & Flexbox**: Modern layout techniques
- **Performance Optimized**: Efficient rendering and state management

## 🛠️ Installation

### Prerequisites
- Node.js 16.0+ 
- npm or yarn package manager
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/DineshKumarCLG/Agentic-Cofounder.git
   cd Agentic-Cofounder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

## 📁 Project Structure

```
src/
├── components/
│   ├── ChatInterface/
│   │   ├── ChatInterface.js         # Main chat component
│   │   ├── ChatInterface.css        # Chat styling
│   │   └── PitchDeck.css           # Pitch deck specific styles
│   ├── Sidebar/
│   │   ├── Sidebar.js              # Navigation sidebar
│   │   └── Sidebar.css             # Sidebar animations
│   ├── MainContent/
│   │   ├── MainContent.js          # Main content area
│   │   └── MainContent.css         # Content layout
│   └── PitchDeckGenerator/
│       ├── PitchDeckGenerator.js   # Pitch deck logic
│       ├── PitchDeckViewer.js      # Full-screen viewer
│       └── TemplateSelector.js     # Template selection
├── assets/
│   └── icons/                      # UI icons and graphics
├── App.js                          # Root component
├── App.css                         # Global styles
└── index.js                        # Application entry point
```

## 🚀 Usage

### Using the Chat Interface

1. **Select an Agent**: Click the agent dropdown to choose your AI assistant
2. **Start Chatting**: Type your message and press Enter
3. **Agent Features**: Each agent specializes in different areas:
   - **Product Research**: Market analysis and product insights
   - **Finance**: Financial planning and analysis
   - **Coordinator**: Project management and coordination

### Creating Pitch Decks

1. **Access Generator**: Use the chat interface to request a pitch deck
2. **Select Template**: Choose from available template designs
3. **Review Content**: Preview generated slides
4. **Full-Screen View**: Click "👁️ Full Preview" for immersive viewing
5. **Download**: Export your presentation as PowerPoint

### Navigation

- **Sidebar Toggle**: Click the hamburger menu to show/hide sidebar
- **Smooth Transitions**: Enjoy fluid animations throughout the app
- **Responsive Design**: Works seamlessly on different screen sizes

## 🎨 Design System

### Glassmorphism Effects
- **Backdrop Blur**: `backdrop-filter: blur(20px)`
- **Transparency**: RGBA colors with alpha channels
- **Border Highlights**: Subtle white borders for depth
- **Gradient Overlays**: Multi-layered visual effects

### Color Palette
- **Primary**: Various agent-specific colors
- **Background**: Dark gradients with transparency
- **Accent**: White with varying opacity levels
- **Text**: High contrast for readability

### Typography
- **Headers**: Clean, modern font weights
- **Body**: Optimized for readability
- **UI Elements**: Consistent sizing and spacing

## 🔧 Customization

### Adding New Agents
1. Update the agents array in `ChatInterface.js`
2. Add corresponding CSS classes for styling
3. Implement agent-specific logic

### Creating New Templates
1. Add template data to `pitchDeckTemplates` array
2. Define template-specific styling
3. Update template rendering logic

### Modifying Styles
- Global styles: `src/App.css`
- Component styles: Individual CSS files
- Glassmorphic effects: `backdrop-filter` properties

## 📦 Dependencies

### Core Dependencies
- **React**: UI library
- **React-DOM**: DOM rendering

### Development Tools
- **Create React App**: Build toolchain
- **CSS3**: Modern styling features
- **ES6+**: Latest JavaScript features

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Maintain consistent coding style
- Add comments for complex logic
- Test your changes thoroughly

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern glassmorphism trends
- React community for excellent documentation
- Contributors and testers

## 📞 Support

If you have any questions or need help:

- 📧 Email: support@agenticcofounder.com
- 🐛 Issues: [GitHub Issues](https://github.com/DineshKumarCLG/Agentic-Cofounder/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/DineshKumarCLG/Agentic-Cofounder/discussions)

---

<div align="center">
  <strong>Built with ❤️ using React and modern web technologies</strong>
</div>
