import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

const Footer = () => {
  const { portfolio } = usePortfolio();
  const personalInfo = portfolio?.personal_info || {};
  const name = personalInfo.name || 'Rifat Arman Chowdhury';
  const github = personalInfo.github || '';
  const linkedin = personalInfo.linkedin || '';
  const email = personalInfo.email || '';

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-black dark:bg-white text-white dark:text-black py-12 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">RC</h3>
              <p className="text-gray-400 dark:text-gray-600">
                Building quality web experiences with attention to detail.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-600">
                {['about','experience','projects','contact'].map((id) => (
                  <li key={id}>
                    <a href={`#${id}`} className="hover:text-white dark:hover:text-black transition-colors">
                      {id[0].toUpperCase() + id.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-600">
                <li>
                  {github ? (
                    <a href={github} target="_blank" rel="noopener noreferrer"
                       className="hover:text-white dark:hover:text-black transition-colors">
                      GitHub
                    </a>
                  ) : <span>GitHub</span>}
                </li>
                <li>
                  {linkedin ? (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer"
                       className="hover:text-white dark:hover:text-black transition-colors">
                      LinkedIn
                    </a>
                  ) : <span>LinkedIn</span>}
                </li>
                <li>
                  {email ? (
                    <a href={`mailto:${email}`}
                       className="hover:text-white dark:hover:text-black transition-colors">
                      Email
                    </a>
                  ) : <span>Email</span>}
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 dark:border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 dark:text-gray-600 flex items-center gap-2">
              © {new Date().getFullYear()} {name}. Made with
              <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
            </p>
            <p className="text-gray-400 dark:text-gray-600 text-sm">
              Designed & Built by {name}
            </p>
          </div>
        </div>
      </div>

      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg:white dark:bg-black text-black dark:text:white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;
