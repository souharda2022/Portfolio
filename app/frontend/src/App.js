// src/App.js
import React, { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { PortfolioProvider } from './contexts/PortfolioContext';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';

import './App.css';

function App() {
  useEffect(() => {
    document.title = "Souharda Bhattacharjee | Portfolio";
  }, []);

  return (
    <ThemeProvider>
      <PortfolioProvider>
        <div className="App bg-white dark:bg-black transition-colors duration-300 min-h-screen">
          <Header />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
          <Toaster />
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;
