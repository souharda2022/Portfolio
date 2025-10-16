// src/components/Hero.js
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import DecryptedText from './ui/SplitText';


const flattenSkills = (skillsObj) => {
  if (!skillsObj || typeof skillsObj !== 'object') return [];
  const flat = [];
  for (const items of Object.values(skillsObj)) {
    if (Array.isArray(items)) flat.push(...items);
  }
  const seen = new Set();
  return flat.filter((label) => {
    const k = String(label || '').trim().toLowerCase();
    if (!k || seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

const Hero = () => {
  const { portfolio, loading } = usePortfolio();
  const personalInfo = portfolio?.personal_info || {};

  const name = personalInfo.name ?? 'Your Name';
  const title = personalInfo.title ?? '';
  const tagline = personalInfo.tagline ?? '';
  const resumeUrl = personalInfo.resumeUrl ?? '';
  const github = personalInfo.github ?? '';
  const linkedin = personalInfo.linkedin ?? '';
  const email = personalInfo.email ?? '';
  const isExternalResume = /^https?:\/\//i.test(resumeUrl || '');
  const resumeHref = isExternalResume
    ? resumeUrl
    : `${process.env.PUBLIC_URL}/${resumeUrl || 'cv.pdf'}`;

  

  const skills = useMemo(() => flattenSkills(portfolio?.skills), [portfolio]);
  const marqueeItems = useMemo(() => [...skills, ...skills], [skills]);

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </section>
    );
  }

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900" />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-400 dark:bg-gray-700 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-300 dark:bg-gray-800 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {/* DecryptedText on view (runs once) */}
              <DecryptedText
                text={name}
                animateOn="view"
                revealDirection="center"
                // carry your h1 styling into the inner text if your component uses it
                className=""
                parentClassName=""
                encryptedClassName=""
              />
            </motion.h1>


            <motion.h2
              className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {title}
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-500 dark:text-gray-500 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {tagline}
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
                onClick={() => scrollToSection('#contact')}
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                <a
                  href={resumeHref}
                  {...(isExternalResume
                    ? { target: '_blank', rel: 'noopener noreferrer' } // open external resume in new tab
                    : { download: true })}                              // download local PDF
                  title={isExternalResume ? 'View resume' : 'Download resume'}
                >
                  <span className="inline-flex items-center">
                    <Download className="mr-2 h-5 w-5" />
                    {isExternalResume ? 'View CV' : 'Download CV'}
                  </span>
                </a>
              </Button>


            </motion.div>

            {/* Socials */}
            <motion.div
              className="flex justify-center gap-6 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {github && (
                <motion.a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  title="GitHub"
                >
                  <Github className="h-6 w-6" />
                </motion.a>
              )}
              {linkedin && (
                <motion.a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  title="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </motion.a>
              )}
              {email && (
                <motion.a
                  href={`mailto:${email}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  title="Email"
                >
                  <Mail className="h-6 w-6" />
                </motion.a>
              )}
            </motion.div>

            {/* Tools & Technologies marquee (full-bleed) */}
            {skills.length > 0 && (
              <div
                className="
                  relative overflow-hidden marquee-fade py-5
                  w-screen -mx-[50vw] left-1/2 right-1/2
                "
                style={{ position: 'absolute' }}
              >
                <div className="marquee-track">
                  {marqueeItems.map((label, i) => (
                    <Badge
                      key={`${label}-${i}`}
                      variant="outline"
                      className="
                        mx-3 my-2 whitespace-nowrap
                        text-base md:text-lg             /* bigger text */
                        px-4 md:px-5 py-2 md:py-2.5      /* bigger pill */
                        rounded-2xl                      /* rounder */
                        border-2                         /* thicker border */
                        border-gray-300 dark:border-gray-600
                        text-gray-800 dark:text-gray-200
                        bg-white/70 dark:bg-black/40 backdrop-blur-sm
                        shadow-sm                         /* subtle pop */
                      "
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      >
        <button
          onClick={() => scrollToSection('#about')}
          className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          aria-label="Scroll to about"
        >
          <ArrowDown className="h-6 w-6" />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
