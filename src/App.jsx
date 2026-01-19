import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MythicalProvider } from './contexts/MythicalContext';
import HomePage from './pages/HomePage';
import MythicCodex from './pages/MythicCodex';
import WorldTree365 from './pages/WorldTree365';
import WorldTreePage from './pages/WorldTreePage';
import RealmsPage from './pages/RealmsPage';
import LegendsPage from './pages/LegendsPage';
import JournalPage from './pages/JournalPage';
import WriterHub from './pages/WriterHub';
import MythoLog from './pages/MythoLog';
import SoundToggle from './components/UI/SoundToggle';
import { SkipToContent } from './utils/accessibility.jsx';
import './styles/mythical-themes.css';
import './styles/realm-gradients.css';
import './styles/mythic-animations.css';

const Navigation = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Don't show navigation on home page
  if (isHome) return null;

  return (
    <nav className="bg-gradient-to-r from-blue-deep via-blue-mystic to-green-mystic text-text-primary p-4 shadow-glow-blue sticky top-0 z-50 backdrop-blur-md bg-opacity-90 border-b border-blue-ethereal">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-cyan-rune transition-all duration-700 flex items-center gap-2 glow">
          Mythical World
        </Link>
        <div className="flex gap-6">
          <Link 
            to="/writer" 
            className={`text-lg font-semibold hover:text-cyan-rune transition-all duration-700 px-4 py-2 rounded-lg ${
              location.pathname === '/writer' ? 'bg-cyan-rune shadow-glow-cyan' : 'hover:bg-blue-deep hover:bg-opacity-20'
            }`}
          >
            Writer's Realm
          </Link>
          <Link 
            to="/journal" 
            className={`text-lg font-semibold hover:text-green-glow transition-all duration-700 px-4 py-2 rounded-lg ${
              location.pathname === '/journal' ? 'bg-green-mystic shadow-glow-green' : 'hover:bg-green-deep hover:bg-opacity-20'
            }`}
          >
            Journal
          </Link>
          <Link 
            to="/world-tree" 
            className={`text-lg font-semibold hover:text-green-glow transition-all duration-700 px-4 py-2 rounded-lg ${
              location.pathname === '/world-tree' ? 'bg-green-mystic shadow-glow-green' : 'hover:bg-green-deep hover:bg-opacity-20'
            }`}
          >
            World Tree
          </Link>
          <Link 
            to="/realms" 
            className={`text-lg font-semibold hover:text-blue-glow transition-all duration-700 px-4 py-2 rounded-lg ${
              location.pathname === '/realms' ? 'bg-blue-mystic shadow-glow-blue' : 'hover:bg-blue-deep hover:bg-opacity-20'
            }`}
          >
            Realms
          </Link>
          <Link 
            to="/legends" 
            className={`text-lg font-semibold hover:text-violet-omen transition px-4 py-2 rounded-lg ${
              location.pathname === '/legends' ? 'bg-violet-omen bg-opacity-70 shadow-glow-violet' : 'hover:bg-blue-deep hover:bg-opacity-20'
            }`}
          >
            Legends
          </Link>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <MythicalProvider>
      <Router>
        <SkipToContent />
        <div className="min-h-screen" id="main-content">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mythic" element={<MythicCodex />} />
            <Route path="/365" element={<WorldTree365 />} />
            <Route path="/writer" element={<WriterHub />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/mytho-log" element={<MythoLog />} />
            <Route path="/world-tree" element={<WorldTreePage />} />
            <Route path="/realms" element={<RealmsPage />} />
            <Route path="/legends" element={<LegendsPage />} />
          </Routes>
          <SoundToggle />
        </div>
      </Router>
    </MythicalProvider>
  );
};

export default App;