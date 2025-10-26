import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "./ui/button";

const Header = () => {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  // Detect scroll for background blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatically detect which section is visible
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // section considered visible when 50% in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 dark:bg-black/80 backdrop-blur-xl border-b border-gray-800 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex justify-center items-center py-3 px-4 md:px-8">
        {/* Center: Navigation Links */}
        <ul className="flex gap-6 md:gap-10 text-sm md:text-base font-medium text-gray-300">
          {sections.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(`#${item.id}`)}
                className={`relative uppercase tracking-wide transition-all ${
                  active === item.id
                    ? "text-white"
                    : "hover:text-cyan-400 text-gray-400"
                }`}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Right: Theme Toggle */}
        <div className="absolute right-4 md:right-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:scale-105 transition-transform"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </Button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;

