import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import PillNav from './ui/PillNav';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import logo from '../assets/logo.jpg';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
  }`}
    >
      <nav className="container mx-auto px-4 py-4">
        {/* Theme toggle (kept) */}
        <div className="absolute left-0 top-3 md:top-4 z-[1100]">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Pill-style navbar */}
        <div className="flex justify-end">
          <PillNav
            // logo={yourLogo} // optional
            items={[
              { label: 'Home', href: '#home' },
              { label: 'About', href: '#about' },
              { label: 'Experience', href: '#experience' },
              { label: 'Projects', href: '#projects' },
              { label: 'Skills', href: '#skills' },
              { label: 'Contact', href: '#contact' }
            ]}
            activeHref="#home"
            ease="power2.easeOut"

          baseColor={theme === 'dark' ? 'rgba(255,255,255,0.10)' : '#111111'}
          pillColor={theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#ffffff'}
          hoveredPillTextColor={theme === 'dark' ? '#0B0F19' : '#ffffff'}
          pillTextColor={theme === 'dark' ? '#E7EAF0' : '#111111'}

        />
      </div>

      </nav>
    </motion.header>
  );
};

export default Header;
