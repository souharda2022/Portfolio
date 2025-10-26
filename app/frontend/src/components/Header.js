import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "./ui/button";

const Header = () => {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const controls = useAnimation();

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  // Scroll-based animation
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      controls.start({
        y: isScrolled ? 0 : -10,
        opacity: isScrolled ? 1 : 0.98,
        scale: isScrolled ? 1 : 1.02,
        backgroundColor: isScrolled
          ? theme === "dark"
            ? "rgba(0,0,0,0.8)"
            : "rgba(255,255,255,0.8)"
          : "rgba(0,0,0,0)",
        backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        boxShadow: isScrolled
          ? "0 4px 20px rgba(0,0,0,0.25)"
          : "0 0 0 rgba(0,0,0,0)",
        transition: { duration: 0.4, ease: "easeInOut" },
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [theme, controls]);

  // Active section detection
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, observerOptions);
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      animate={controls}
      initial={{
        y: -20,
        opacity: 0,
        backgroundColor: "transparent",
        backdropFilter: "blur(0px)",
      }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <nav className="container mx-auto flex justify-center items-center py-5 px-4 md:px-8">
        {/* Center: Navigation Links */}
        <ul className="flex gap-8 md:gap-12 text-base md:text-lg font-semibold text-gray-300 tracking-wide">
          {sections.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(`#${item.id}`)}
                className={`relative uppercase transition-all ${
                  active === item.id
                    ? "text-white"
                    : "hover:text-cyan-400 text-gray-400"
                }`}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-[6px] w-full h-[3px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    transition={{ duration: 0.25 }}
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
              <Sun className="h-6 w-6 text-yellow-400" />
            ) : (
              <Moon className="h-6 w-6 text-gray-700" />
            )}
          </Button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
