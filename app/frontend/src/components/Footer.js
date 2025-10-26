import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { usePortfolio } from "../contexts/PortfolioContext";

const Footer = () => {
  const { portfolio } = usePortfolio();
  const personalInfo = portfolio?.personal_info || {};
  const name = personalInfo.name || "Souharda Bhattacharjee";
  const github = personalInfo.github || "";
  const linkedin = personalInfo.linkedin || "";
  const email = personalInfo.email || "";

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-gradient-to-b from-black via-gray-900 to-black text-gray-300 pt-16 pb-8 border-t border-gray-800">
      {/* Glow border line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

      {/* Main content */}
      <motion.div
        className="container mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-white">
          Let’s Build Something Great Together
        </h3>
        <p className="max-w-xl mx-auto text-gray-400 mb-6">
          I’m passionate about creating intelligent systems that bridge AI and real-world impact.
          Feel free to reach out through any of the platforms below.
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-10">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="hover:text-emerald-400 transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6" />

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {name}. Crafted with ❤️ and curiosity.
        </p>
      </motion.div>

      {/* Scroll-to-top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg hover:shadow-cyan-500/30 transition-shadow"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;
