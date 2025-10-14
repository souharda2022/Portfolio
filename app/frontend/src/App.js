// src/App.js
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { PortfolioProvider } from './contexts/PortfolioContext';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
// import SkillsMarquee from './components/SkillsMarquee'; // REMOVE
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <HashRouter>
          <div className="App bg-white dark:bg-black transition-colors duration-300 min-h-screen">
            <Header />
            <main>
              <Hero />
              <About />
              <Experience />
              <Projects />
              {/* Removed SkillsMarquee section; marquee now only lives inside Hero */}
              <Skills />
              <Education />
              <Contact />
            </main>
            <Footer />
            <Toaster />
          </div>
        </HashRouter>
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;
