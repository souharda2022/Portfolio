import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../contexts/PortfolioContext';
import { Card, CardContent } from './ui/card';

const asArr = (x) => (Array.isArray(x) ? x : []);

const About = () => {
  const { portfolio, loading } = usePortfolio();

  if (loading) return null;

  // Safe fallbacks
  const personalInfo = portfolio?.personal_info ?? {};
  const achievements = asArr(portfolio?.achievements);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 text-center"
          >
            About Me
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-black dark:bg-white mx-auto mb-12"
          />

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                Background
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {personalInfo.bio || "I’m a web developer and SQA tester who enjoys turning ideas into clean, working products. I care about readable code, helpful UI details, and shipping things that feel solid."}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Graduated with a BSc in Computer Science from BRAC University, I combine technical expertise with a passion for quality assurance. I focus on web development and QA, especially in building responsive web apps and designing practical test suites that prevent critical bugs from reaching users.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-6">
                    What I Bring
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-black dark:text-white mr-2">▸</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        Full-stack development with MERN and Flask
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-black dark:text-white mr-2">▸</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        Comprehensive QA and testing methodologies
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-black dark:text-white mr-2">▸</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        Data analytics and campaign optimization
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-black dark:text-white mr-2">▸</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        UI/UX design with Figma and responsive implementation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-black dark:text-white mr-2">▸</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        Machine learning and computer vision applications
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.length ? (
              achievements.map((achievement, index) => (
                <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.05 }}>
                  <Card className="text-center bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">
                        {achievement?.value ?? "—"}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {achievement?.label ?? ""}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 md:col-span-4 text-center text-gray-500 dark:text-gray-400">
                No achievements yet
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
